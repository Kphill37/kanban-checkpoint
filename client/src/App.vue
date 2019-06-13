<template>
  <div id="app container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-end">
        <button v-if="user._id" @click="logout" class="btn btn-sm btn-danger m-3" id="logout-btn">Logout</button>
      </div>
    </div>
    <router-view />

  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      //Authenticate on startup
      this.$store.dispatch('authenticate')
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout")
      }
    }
  }
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }



  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .card {
    margin-top: 2vh;
  }
</style>