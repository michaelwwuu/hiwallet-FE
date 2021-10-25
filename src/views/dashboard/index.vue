<template>
  <div class="dashboard-editor-container">
    <img class="home-logo" :src="homeImg" alt="">
  </div>
</template>

<script>

export default {
  name: 'DashboardAdmin',
  data() {
    return {
      homeImg: require('./../../assets/home_images/home-logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  position: relative;
  top: 50px;
  display: flex;
  justify-content: center;
  .home-logo{
    height: 100%;
  }
}

</style>
