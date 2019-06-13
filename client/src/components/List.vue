<template>
  <div class="list-item">


    <div class="card m-4">
      <div class="card-body">
        <i @click="deleteList(listData)" class="fas fa-trash-alt"> Delete</i>
        <h5 class="card-title">{{listData.title}}</h5>


        <form @submit.prevent="createTask">
          <input type="text" v-model="newTask.title" placeholder="Task description">
          <button type="submit" class="btn btn-sm btn-success m-1">Add New Task</button>
        </form>
      </div>

      <div class="row">
        <div class="col-12">

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
      },
      deleteList(listData) {
        console.log(listData)
        this.$store.dispatch("deleteList", listData)
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

<style>
  body {
    color: black;
  }
</style>