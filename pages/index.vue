<template>
  <div class="container">
    <div class="row center-xs">
      <div class="col-xs-12 col-md-8 col-lg-6">
        <div class="box">
          <Tutorial />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Tutorial from '@/components/Tutorial.vue'

export default {
  components: {
    Tutorial,
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
}

.box {
  margin: 2rem 0;
}
</style>

