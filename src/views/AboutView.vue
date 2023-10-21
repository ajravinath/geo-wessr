<script setup lang="ts">
import cities from '@/assets/data/cities.json'
import Answer from '@/components/Answer.vue'
import WonLost from '@/components/WonLost.vue'
import { useLocationStore } from '@/stores/counter'
import type { Answer as AnswerType, City } from '@/types/TempTypes'
import { AnswerResult, QuestionType } from '@/types/enums'
import {
  computed,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  ref,
  watch,
  watchEffect,
  type Ref
} from 'vue'

import earthBump from '@/assets/textures/earth-bump.jpg'
import earthSpec from '@/assets/textures/earth-spec.jpg'
import earth from '@/assets/textures/earth.jpg'
import {
  AmbientLight,
  Camera,
  PointLight,
  Renderer,
  Scene,
  Sphere,
  StandardMaterial,
  Texture
} from 'troisjs'
import { useMediaQuery } from '@/composables/useMediaQuery'

type CityTemp = Pick<AnswerType, 'city' | 'temp'>

// FIXME: extract to utility
const validateAnswer =
  (questionType: QuestionType) =>
  (correctAnswer: string, givenAnswer: string): AnswerResult => {
    switch (questionType) {
      case QuestionType.Temperature:
        return Math.abs(parseInt(correctAnswer) - parseInt(givenAnswer)) < 3
          ? AnswerResult.Correct
          : AnswerResult.Wrong
      default:
        return AnswerResult.Unknown
    }
  }

const validateTemperature = validateAnswer(QuestionType.Temperature)

const temperature = ref('')
const city: Ref<Nullable<City>> = ref(null)
const answers: Ref<Array<AnswerType>> = ref([])
const count = ref(0)
const cityTemperatures: Ref<Array<CityTemp>> = ref([])
const error = ref('')
const renderer: Ref<Nullable<typeof Renderer>> = ref(null)
const sphere: Ref<Nullable<typeof Sphere>> = ref(null)

const isLargeScreen = useMediaQuery('(min-width: 1024px)')

const answerList = computed(() => {
  if (answers.value.length && answers.value.length < 6) {
    return [...answers.value, ...Array.from(Array(6 - answers.value.length))]
  }
  return answers.value
})
const { setLatLng } = useLocationStore()

onRenderTracked((event) => {
  console.log('tracked', event)
})

onRenderTriggered((event) => {
  console.log('trigger', event)
})

watchEffect(() => {
  if (city.value == null && temperature.value == '' && answers.value.length < 6) {
    const selectedCity = cities[Math.floor(Math.random() * cities.length)] as City
    city.value = selectedCity
    setLatLng(parseFloat(selectedCity.lat), parseFloat(selectedCity.lng))
  }
})

onMounted(() => {
  if (isLargeScreen.value) {
    renderer?.value?.onBeforeRender(() => {
      if (sphere?.value) {
        sphere.value.mesh.rotation.y += 0.002
      }
    })
  }
})

const handleReplay = () => {
  answers.value = []
  city.value = null
  temperature.value = ''
  count.value = 0
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  error.value = ''
  if (city.value) {
    const answer: AnswerType = {
      city: city.value,
      temp: temperature.value,
      correct: AnswerResult.Unknown
    }
    const existingCity = cityTemperatures.value.find((temp) => temp.city === city.value)
    if (existingCity) {
      answers.value.push({
        ...answer,
        correct: validateTemperature(existingCity.temp, temperature.value),
        correctAnswer: existingCity.temp
      })
    } else {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.value.lat}&lon=${
          city.value.lng
        }&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          cityTemperatures.value.push({ city: city.value as City, temp: result.main.temp })
          answers.value.push({
            ...answer,
            correct: validateTemperature(result.main.temp, temperature.value),
            correctAnswer: result.main.temp
          })
        })
        .catch((err) => {
          console.warn('error', error)
          error.value = err.message
        })
    }
    city.value = null
    temperature.value = ''
    count.value++
  }
}
</script>

<template>
  <div class="form-container">
    <form @submit="handleSubmit">
      <TransitionGroup class="result">
        <h1 v-if="city && answers.length < 6">{{ city.name }}</h1>
        <WonLost
          v-else
          :is-won="answers.every((answer) => answer.correct === AnswerResult.Correct)"
        />
      </TransitionGroup>
      <label for="temp">Enter guess</label>
      <input
        id="temp"
        name="temperature"
        :disabled="answers.length >= 6"
        type="number"
        v-model="temperature"
        placeholder="Enter temperature"
      />
      <input v-if="answers.length < 6" type="submit" value="Submit" />
      <input v-else @click="handleReplay" type="button" value="Play Again" />
      <label v-show="error">{{ error }}</label>
      <TransitionGroup class="answers" name="answers" tag="div">
        <Answer
          v-for="(answer, index) in answerList"
          :answer="answer"
          :class="{
            'answer-grid-lines': answerList.some((item) => item)
          }"
          :key="index"
        />
      </TransitionGroup>
    </form>
  </div>
  <Renderer
    v-if="isLargeScreen"
    ref="renderer"
    resize
    antialias
    class="canvas"
    :alpha="false"
    :orbit-ctrl="{ autoRotate: false, enableDamping: true, dampingFactor: 0.05 }"
  >
    <Camera :position="{ y: 0, x: 0, z: -10 }" />
    <Scene background="#00FFFFFF">
      <AmbientLight :intensity="0.9" />
      <PointLight :position="{ y: 50, z: 0 }" :intensity="0.75" />
      <PointLight color="#ff6000" :intensity="0.75" />
      <Sphere
        :position="{ y: -1, x: -2 }"
        ref="sphere"
        :radius="4.6"
        :width-segments="200"
        :height-segments="200"
      >
        <StandardMaterial :props="{ displacementScale: 0.2 }">
          <Texture :src="earth" name="map" />
          <Texture :src="earthBump" name="bumpMap" />
          <Texture :src="earthSpec" name="specMap" />
        </StandardMaterial>
      </Sphere>
    </Scene>
  </Renderer>
</template>

<style global lang="scss">
.canvas {
  right: 0;
  bottom: 0;
  width: 600px;
  overflow: hidden;
  z-index: -10;
  position: absolute;
}
</style>

<style scoped lang="scss">
@media (min-width: 1024px) {
  .main-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.form-container {
  width: 70%;
  margin: 2rem;
  z-index: 2;
  @media (max-width: 1024px) {
    width: 100%;
    margin: 1rem;
  }
}

form {
  width: 100%;
  z-index: 2;
  border-radius: 0.5rem;
  background-color: rgba(225, 225, 225, 0.679);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1,
  span,
  input {
    font-family: monospace;
  }

  @media (max-width: 1024px) {
    padding: 1rem;
    h1,
    label {
      text-align: center;
    }
  }

  input:not([type='submit']) {
    padding: 8px;
    border: 1px solid rgba(128, 128, 128, 0.9);
    box-shadow: 5px 5px 0px rgb(195, 188, 188);
    &:hover:not(:disabled) {
      box-shadow: 5px 5px 0px hsla(160, 100%, 37%, 1);
    }
    border-radius: 5px;
  }

  input[type='submit'] {
    padding: 5px;
    border: 1px solid rgba(128, 128, 128, 0.9);
    box-shadow: 5px 5px 0px rgb(195, 188, 188);
    &:hover {
      box-shadow: 5px 5px 0px hsla(160, 100%, 37%, 1);
    }
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 5px;
  }

  .answers {
    margin-top: 2rem;
    display: grid;
    grid-template-rows: repeat(2, 100px);
    grid-template-columns: repeat(3, 1fr);

    .answers-enter-active,
    .answers-leave-active {
      transition: opacity 0.5s ease;
    }

    .answers-enter-from,
    .answers-leave-to {
      opacity: 0;
    }
  }

  .result {
    .result-enter-active,
    .result-leave-active {
      transition: opacity 0.5s ease;
    }

    .result-enter-from,
    .result-leave-to {
      opacity: 0;
    }
  }
}
</style>
