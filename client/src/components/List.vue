<template>
  <div class="listItem">
    <div class="card" v-for="list in lists" :key='lists._id'>
      <div class="card-body">
        <h5 class="card-title">{{list.title}}</h5>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>



  </div>
</template>

<script>
  export default {
    name: 'List',
    data() {
      return {}
    },

    computed: {
      lists() {
        return this.$store.state.lists;
      }
    },
  }
</script>

<style scoped>
</style>