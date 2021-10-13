<template>
  <ol class="game-data" v-if="gameData && gameData.length > 0">
    <li v-for="game in gameData" :key="game.id">
      <p>
        <strong>Winner: </strong>
        <span v-if="game.winner == 'cross'" class="game-data__winner__X"
          >X</span
        >
        <span v-else-if="game.winner == 'circle'" class="game-data__winner__O"
          >O</span
        >
        <span v-else class="game-data__winner">Draw</span>
      </p>
    </li>
  </ol>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GameData',
  computed: mapGetters(['gameData']),
}
</script>

<style scoped>
.game-data {
  margin-top: 1.5rem;
  text-align: left;
}

.game-data__winner {
  font-weight: 600;
}

.game-data__winner__X {
  font-size: larger;
  font-weight: 600;
  color: blue;
}

.game-data__winner__O {
  font-size: larger;
  font-weight: 600;
  color: red;
}
</style>