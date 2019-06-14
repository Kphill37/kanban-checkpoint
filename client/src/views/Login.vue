<template>
  <div class="login">
    <div class="row ">
      <div class="col-12 login text-center">
        <form v-if="loginForm" @submit.prevent="loginUser">
          <div class="login">
            <input type="email" v-model="creds.email" placeholder="email">
            <br>
            <input type="password" v-model="creds.password" placeholder="password">
            <br>
            <button type="submit" class="btn-sm btn-success">Login</button>
          </div>
        </form>
        <form v-else @submit.prevent="register">
          <input type="text" v-model="newUser.name" placeholder="name">
          <input type="email" v-model="newUser.email" placeholder="email">
          <input type="password" v-model="newUser.password" placeholder="password">
          <button type="submit">Create Account</button>
        </form>
        <div class="action d-flex justify-content-center" @click="loginForm = !loginForm">
          <p v-if="loginForm">Click here to Register</p>
          <p v-else>Click here to Login</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router.js'
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>

<style>
  .action {
    cursor: pointer;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login {
    margin-top: 10vh;
  }

  input {
    border-radius: 5px;
  }
</style>