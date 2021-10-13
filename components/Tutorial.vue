<template>
  <div class="wrapper">
    <header class="wrapper__header">
      <transition name="slide-fade">
        <button
          class="btn btn-primary wrapper__btn"
          type="button"
          @click="saveAndGoNext"
          v-if="currentGame.done"
        >
          Play Again
        </button>

        <p v-else-if="currentGame.turn">
          Turn:
          <span v-if="currentGame.turn == 'cross'" class="game-data__turn__X"
            >X</span
          >
          <span
            v-else-if="currentGame.turn == 'circle'"
            class="game-data__turn__O"
            >O</span
          >
        </p>
      </transition>
    </header>

    <div class="d-flex justify-content-center">
      <Table />
    </div>

    <!-- <GameData /> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import GameData from './GameData'
import Table from '@/components/Table.vue'

export default {
  name: 'Tutorial',
  components: {
    // GameData,
    Table,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['currentGameState']),
    currentGame() {
      return this.currentGameState()
    },
  },
  methods: {
    ...mapActions(['saveAndGoNext']),
  },
}
</script>

<style scoped>
.wrapper {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.wrapper__header {
  margin-bottom: 1.5rem;
  height: 2.4rem;
  display: flex;
  justify-content: center;
}

.slide-fade-enter-active {
  transition: all 0s ease;
}
.slide-fade-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.game-data__turn__X {
  font-weight: 600;
  color: blue;
}

.game-data__turn__O {
  font-weight: 600;
  color: red;
}
</style>