<template>
  <div class="row boards">
    <div class="col">
      <h2 class="appTitle mb-5 text-center">!Procrasti-Nation</h2>


      <form @submit.prevent="addBoard">
        <div class="form-group text-center">

          <input type="text" class="mb-2" placeholder="title" v-model="newBoard.title" required>
          <br>
          <input type="text" placeholder="description" v-model="newBoard.description">
          <br>
          <button class="btn-sm btn-secondary shadow m-2 border-danger" type="submit">Create Board</button>
        </div>
      </form>

      <div v-for="board in boards" :key="board._id" class="d-flex justify-content-center">

        <ul class="list-group mt-2">
          <li class="list-group-item">
            <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
            <i @click="deleteBoard(board._id)" class="fas fa-trash-alt ml-2"> Delete</i>
          </li>
        </ul>


      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      }
    }
  };
</script>

<style scoped>
  .appTitle {
    color: white;
  }
</style>