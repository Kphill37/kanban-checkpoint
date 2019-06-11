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
      return {
        newTask: {
          listId: this.listId,
          title: "",
          //Server side; pass the boardId
        }
      }
    },

    computed: {
      tasks() {
        return this.$store.state.tasks;
      },
      lists() {
        return this.$store.state.lists
      }
    },
    props: ["listData", "listId"]
  }
</script>

<style scoped>
</style>