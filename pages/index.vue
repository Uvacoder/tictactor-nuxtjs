
<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-8">
        <div class="box">
          <Tutorial />
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div class="result">
          <GameData />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tutorial from '@/components/Tutorial.vue'
import GameData from '@/components/GameData.vue'

export default {
  components: {
    Tutorial,
    GameData,
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  min-width: 320px;
  text-align: center;
}

.box {
  margin: 2rem 0;
}

.result {
  margin-top: 6em;
}
</style>

