<template>
  <div class="col taskTemplate">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Task</h5>
        <p class="card-text">{{taskData.title}}</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {};
  },

  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  props: ["taskData"]
};
</script>

<style scoped>
</style>