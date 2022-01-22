<template>
  <div id="app" :class="`vh-100 theme-${$theme}`">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <h1 class="navbar-brand m-0">來個小測驗</h1>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="text-white fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse ms-2" id="navbarSupportedContent">
          <div class="navbar-nav flex-fill">
            <router-link class="nav-link" to="/">Todo-List</router-link>
            <router-link class="nav-link" to="/pairSearch">Pair-Search</router-link>
          </div>
          <div class="navbar-append ml-auto mr-1">
            <!-- Rounded switch -->
            <label class="switch">
              <input type="checkbox" v-model="themeColor" value="orange">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      themeColor: false
    }
  },
  watch: {
    themeColor() {
      this.$theme = this.themeColor ? 'orange' : 'default'
    }
  }
}
</script>
