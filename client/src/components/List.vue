<template>
  <div class="list-item col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{listData.title}}</h5>
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
      tasks() {
        return this.$store.state.tasks;
      },
      lists() {
        return this.$store.state.lists
      }
    },
    props: ["listData"]
  }
</script>

<style scoped>
</style>