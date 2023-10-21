<script setup lang="ts">
import type { Answer } from '@/types/TempTypes'
import { AnswerResult } from '@/types/enums'
import type { PropType } from 'vue'
defineProps({
  answer: { type: Object as PropType<Answer>, required: true, default: [] }
})
</script>

<template>
  <div class="card-container">
    <div
      v-if="answer.temp"
      class="card"
      :class="{
        'card-error': answer.correct === AnswerResult.Wrong,
        'card-warning': answer.correct === AnswerResult.Unknown
      }"
    >
      <span class="answer">{{ answer.temp }}&deg;C</span>
      <div class="actual">
        <div
          v-if="answer.correct === AnswerResult.Correct || answer.correct === AnswerResult.Wrong"
        >
          <p>
            was <b>{{ answer.correctAnswer }}&deg;C</b>
          </p>
        </div>
        <div v-else>Unknown</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  padding: 1rem 0.3rem;
  border-image: var(--grid-gradiant-top);
  @media (max-width: 1024px) {
    padding: 0.8rem;
  }
  &.answer-grid-lines {
    &:nth-child(-n + 3) {
      border-image: var(--grid-gradiant-bottom);
    }
    &:nth-child(1),
    &:nth-child(3),
    &:nth-child(-n + 3) {
      border-bottom: 1px solid transparent;
    }
    &:nth-child(2),
    &:nth-child(5) {
      border-left: 1px solid transparent;
    }
    &:nth-child(1) {
      border-image: var(--grid-gradiant-right);
    }
    &:nth-child(2) {
      border-image: var(--grid-gradiant-bottom);
    }
    &:nth-child(3) {
      border-image: var(--grid-gradiant-left);
    }
    &:nth-child(3n + 2) {
      border-right: 1px solid transparent;
    }
  }
}
.card {
  max-width: 120px;
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #d9d6d6e3;
  border: 1px solid #66de93;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 2px rgb(195, 188, 188);
  &:hover {
    box-shadow: 0px 0px 2px #66de93;
  }
  .answer {
    line-height: normal;
    color: green;
    font-family: monospace;
    font-size: 2rem;
    @media (max-width: 1024px) {
      font-size: 1.3rem;
    }
  }
  .actual {
    font-size: 0.7rem;
    color: gray;
    b {
      font-weight: bold;
    }
    @media (max-width: 1024px) {
      font-size: 0.6rem;
    }
  }
  &.card-error {
    border-color: #ff616d;
    &:hover {
      box-shadow: 0px 0px 2px #ff616d;
    }
    .answer {
      color: red;
    }
  }
  &.card-warning {
    border-color: #ffd966;
    &:hover {
      box-shadow: 5px 5px 0px #ffd966;
    }
    .answer {
      color: orange;
    }
  }
}
</style>
