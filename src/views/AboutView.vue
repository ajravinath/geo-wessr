<script setup lang="ts">
import { validateAnswer } from '@/common/util';
import Answer from '@/components/Answer.vue';
import Earth3D from '@/components/Earth3D.vue';
import WonLost from '@/components/WonLost.vue';
import { useMediaQuery } from '@/composables/useMediaQuery';
import { useRandomCityGeoDb, type GeoCity } from '@/composables/useRandomCityGeoDb';
import { useLocationStore } from '@/stores/counter';
import type { Answer as AnswerType } from '@/types/TempTypes';
import { AnswerResult, QuestionType } from '@/types/enums';
import type { Renderer as RendererType, Sphere as SphereType } from 'troisjs';
import { computed, onRenderTracked, onRenderTriggered, ref, watchEffect, type Ref } from 'vue';

type CityTemp = Pick<AnswerType, 'city' | 'temp'>;

const validateTemperature = validateAnswer(QuestionType.Temperature);

const temperature = ref('');
const answers: Ref<Array<AnswerType>> = ref([]);
const count = ref(0);
const cityTemperatures: Ref<Array<CityTemp>> = ref([]);
const error = ref('');
const renderer: Ref<Nullable<typeof RendererType>> = ref(null);
const sphere: Ref<Nullable<typeof SphereType>> = ref(null);

const isLargeScreen = useMediaQuery('(min-width: 1024px)');

const answerList = computed(() => {
  if (answers.value.length && answers.value.length < 6) {
    return [...answers.value, ...Array.from(Array(6 - answers.value.length))];
  }
  return answers.value;
});

const { city, error: geoPlaceError, loading: geoPlaceLoading } = useRandomCityGeoDb();

const { setLatLng } = useLocationStore();

onRenderTracked((event) => {
  console.log('tracked', event);
});

onRenderTriggered((event) => {
  console.log('trigger', event);
});

watchEffect(() => {
  if (city.value && answers.value.length < 6 && temperature.value == '') {
    setLatLng(city.value.latitude, city.value.longitude);
  }
});

watchEffect(() => {
  const threeRenderer = renderer.value;
  const threeSphere = sphere.value;
  if (isLargeScreen.value) {
    threeRenderer?.onBeforeRender(() => {
      if (threeSphere) {
        threeSphere.mesh.rotation.y += 0.002;
      }
    });
  }
});

const handleReplay = () => {
  answers.value = [];
  city.value = null;
  temperature.value = '';
  count.value = 0;
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  error.value = '';
  if (city.value) {
    const answer: AnswerType = {
      city: city.value,
      temp: temperature.value,
      correct: AnswerResult.Unknown
    };
    const existingCity = cityTemperatures.value.find((temp) => temp.city === city.value);
    if (existingCity) {
      answers.value.push({
        ...answer,
        correct: validateTemperature(existingCity.temp, temperature.value),
        correctAnswer: existingCity.temp
      });
    } else {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.value.latitude}&lon=${
          city.value.longitude
        }&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          cityTemperatures.value.push({ city: city.value as GeoCity, temp: result.main.temp });
          answers.value.push({
            ...answer,
            correct: validateTemperature(result.main.temp, temperature.value),
            correctAnswer: result.main.temp
          });
        })
        .catch((err) => {
          console.warn('error', error);
          error.value = err.message;
        });
    }
    city.value = null;
    temperature.value = '';
    count.value++;
  }
};
</script>

<template>
  <div class="form-container">
    <form @submit="handleSubmit">
      <TransitionGroup class="result">
        <h1 v-if="answers.length < 6">{{ city?.name ? city.name + ', ' + city.country : '🤔' }}</h1>
        <WonLost
          v-else
          :is-won="answers.every((answer) => answer.correct === AnswerResult.Correct)"
        />
      </TransitionGroup>
      <div>
        <label for="temp">Enter guess</label>
        <div class="info">
          Wdym? What do I have to do? 🤷🏻‍♀️
          <div>
            Enter your guess for what the temperature (&deg;C) would be in the indicated city. The
            🗺️ could be of help, idk maybe 😉
          </div>
        </div>
      </div>
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
  <Earth3D />
</template>

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

  .info {
    width: fit-content;
    text-decoration: underline;
    &:hover {
      div {
        display: block;
      }
    }
    position: relative;
    font-size: 0.55rem;
    div {
      display: none;
      color: rgb(243, 226, 194);
      top: 130%;
      font-size: 0.65rem;
      padding: 0.5rem;
      border-radius: 0.3rem;
      background-color: rgba(47, 79, 79, 0.93);
      position: absolute;
      min-width: 150%;
      max-width: 200%;
    }
  }

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
