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
  @import url('https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap');

  #app {
    font-family: 'Permanent Marker', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #ffffff;
  }

  body {
    color: white;
    /* background-color: rgb(48, 48, 77); */
    background-image: url(https://images.unsplash.com/photo-1558216629-a2f7fe856792?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80);
    background-repeat: no-repeat;
    background-position: cover;
    background-size: cover;
    font-family: 'Permanent Marker', cursive;
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

  .fas {
    color: black
  }

  .list-group-item {
    background-color: rgba(255, 255, 255, 0.651);
  }

  .card {
    background-color: rgba(255, 255, 255, 0.651);
  }
</style>