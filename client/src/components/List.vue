<template>
  <div class="list-item col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{listData.title}}</h5>

        <form @submit.prevent="createTask">
          <input type="text" v-model="newTask.title" placeholder="Task description">
          <button type="submit" class="btn btn-sm btn-success">Add New Task</button>
        </form>

        <div class="row">
          <task v-for="task in tasks" :key="tasks._id" :taskData="task" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Task from "@/components/Task.vue"
  export default {
    name: 'List',
    data() {
      return {
        newTask: {
          listId: this.listData._id,
          title: "",
          boardId: this.listData.boardId
        }
      }
    },
    mounted() {
      this.$store.dispatch("getTasks", this.listData._id)
    },
    components: {
      Task,
    },

    methods: {
      createTask() {
        this.$store.dispatch("createTask", this.newTask)
      }
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listData._id] || []
      },
      lists() {
        return this.$store.state.lists
      }
    },
    props: ["listData", "listId", "taskData"]
  }
</script>

<style scoped>
</style>