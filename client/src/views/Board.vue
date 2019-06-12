<template>
  <div class="board">
    {{board.title}}
    <form @submit.prevent="createList">
      <input type="text" v-model="newList.title">
      <button type="submit" class="btn btn-sm btn-success">Add New List</button>
    </form>

    <div class="container">
      <div class="row">

        <list v-for="list in lists" :key='lists._id' :listData="list" />
      </div>
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

    },
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