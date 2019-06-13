<template>
  <div class="col taskTemplate">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{taskData.title}}</h4>
        <!-- <p class="card-text">{{taskData.title}}</p> -->
        <button @click="deleteTask(taskData)" class="card-link btn btn-warning btn-sm">Delete Task</button>
        <hr>
        <p class="card-text" v-for="comment in taskData.comments" :key="comment._id">
          "{{comment.description}}" - {{comment.creator}}
          <br>
          <button
            type="button"
            class="btn btn-warning btn-sm"
            @click="deleteComment(comment._id)"
          >Delete</button>
          <br>
          <br>
        </p>

        <a v-if="!addComment" @click="addComment = true" class="card-link">
          <span>
            <i class="fas fa-comment-medical hover"></i> Add Comment
          </span>
        </a>
        <form @submit.prevent="submitComment" v-else>
          <input type="text" v-model="newComment.creator" placeholder="Enter Name">
          <input type="text" v-model="newComment.description" placeholder="Enter Description">
          <button class="btn btn-success btn-sm" type="submit">submit</button>
          <button type="button" class="btn btn-warning btn-sm" @click="addComment = false">Nevermind</button>
        </form>
        <hr>
        <select v-model="selected" @change="moveTask()">
          <option disabled value>Select New List</option>
          <option v-for="list in lists" :key="list._id" :value="list._id">{{list.title}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["taskData", "listId", "listData"],
  data() {
    return {
      addComment: false,
      newComment: {
        description: "",
        creator: ""
      },
      selected: ""
    };
  },
  methods: {
    submitComment() {
      let comment = { ...this.newComment, taskId: this.taskData._id };
      this.taskData.comments.push(comment);
      this.$store.dispatch("updateTask", this.taskData);
    },
    deleteComment(id) {
      let index = this.taskData.comments.findIndex(c => c._id == id);
      this.taskData.comments.splice(index, 1);
      this.$store.dispatch("updateTask", this.taskData);
    },
    deleteTask(taskData) {
      debugger;
      // let index = this.taskData.findI
      this.$store.dispatch("deleteTask", taskData);
    },
    moveTask() {
      debugger;
      let targetTask = this.taskData;
      targetTask.oldListId = this.taskData.listId;
      targetTask.listId = this.selected;
      this.$store.dispatch("updateTask", targetTask);
    }
  },

  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    lists() {
      return this.$store.state.lists;
    }
  }
};
</script>

<style scoped>
span:hover {
  color: green;
}
</style>