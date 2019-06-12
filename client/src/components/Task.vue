<template>
  <div class="col taskTemplate">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Task</h5>
        <p class="card-text">{{taskData.title}}</p>
        <p
          class="card-text"
          v-for="comment in taskData.comments"
          :key="comment._id"
        >{{comment.description}} - {{comment.creator}}</p>
        <a v-if="!addComment" @click="addComment = true" class="card-link">+ Comment</a>
        <form @submit.prevent="submitComment" v-else>
          <input type="text" v-model="newComment.creator" placeholder="Enter Name">
          <input type="text" v-model="newComment.description" placeholder="Enter Description">
          <button class="btn btn-success btn-sm" type="submit">submit</button>
          <button type="button" class="btn btn-danger btn-sm" @click="addComment = false">Nevermind</button>
        </form>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {
      addComment: false,
      newComment: {
        description: "",
        creator: ""
      }
    };
  },
  methods: {
    submitComment() {
      let comment = { ...this.newComment, taskId: this.taskData._id };
      this.taskData.comments.push(comment);
      this.$store.dispatch("addComment", this.taskData);
    }
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