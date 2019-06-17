<template>
  <div class="board">
    <div class="row">
      <div class="col ml-4 text-warning">
        <router-link :to="{name: 'boards'}">
          <h4>Home</h4>
        </router-link>
      </div>
      <div class="col-12">
        <h1 class="boardTitle text-center">{{board.title}}</h1>
        <form @submit.prevent="createList">
          <input type="text" v-model="newList.title" placeholder="List title">
          <button type="submit" class="btn btn-sm btn-success m-1">Add New List</button>
        </form>
      </div>
    </div>
    <div class="row justify-content-around">

      <list v-for="list in lists" :key='lists._id' :listData="list" />

    </div>
  </div>
</template>

<script>
  import List from "@/components/List.vue";

  export default {

    name: "board",
    data() {
      return {
        newList: {
          title: "",
          boardId: this.boardId,
        },
      }
    },
    methods: {
      createList() {
        this.$store.dispatch("createList", this.newList)
      }
    },
    mounted() {
      this.$store.dispatch("getLists", this.boardId)
      if (!this.$store.state.boards.length) {
        this.$store.dispatch("getBoards")
      }
    },
    beforeDestroy() { },
    components: {
      List,
    },
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
      },
      lists() {
        return this.$store.state.lists
      }

    },
    props: ["boardId"]
  };
</script>

<style scoped>
  .boardTitle {
    color: white;
  }

  a {
    color: rgb(255, 193, 7);
  }
</style>