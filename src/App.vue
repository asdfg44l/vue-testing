<template>
  <div id="app" :class="`vh-100 theme-${$theme}`">
    <nav class="navbar">
      <h1 class="navbar-brand" to="">來個小測驗</h1>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Todo-List</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/pairSearch">Pair-Search</router-link>
        </li>
      </ul>
      <div class="navbar-append ml-auto mr-1">
        <!-- Rounded switch -->
        <label class="switch">
          <input type="checkbox" v-model="themeColor" value="orange">
          <span class="slider round"></span>
        </label>
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
