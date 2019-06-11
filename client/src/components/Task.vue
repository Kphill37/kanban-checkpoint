<template>
  <div class="">

  </div>
</template>

<script>
  export default {
    name: 'Task',
    data() {
      return {}
    },

    computed: {
      tasks() {
        return this.$store.state.tasks;
      },
    },
    props: ["listData"]
  }
</script>

<style scoped>
</style>