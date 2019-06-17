import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'


Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000' : '/'

let auth = Axios.create({
  baseURL: base + "/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "/api/",
  timeout: 3000,
  withCredentials: true
})



export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, data) {
      state.lists = data
    },
    addTask(state, task) {
      if (!state.tasks[task.listId]) {
        state.tasks[task.listId] = []
      }
      Vue.set(state.tasks, task.listId, [...state.tasks[task.listId], task])
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.results)
    },
  },
  actions: {
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          //router.push({ name: 'boards' })
        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({ commit }) {
      auth.delete("logout")
        .then(res => {
          commit("setUser", {})
          router.push({ name: 'login' })
        })
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    //#endregion

    //#region -- TASKS --

    createTask({ commit, dispatch }, payload) {  //double check this later
      api.post('tasks', payload)
        .then(res => {
          console.log({ res })
          commit("addTask", res.data)
        })
    },
    async getTasks({ commit, dispatch }, listId) {
      try {
        let res = await api.get("lists/" + listId + "/tasks") //double check this path later as well
        console.log(res.data)
        commit("setTasks", { listId: listId, results: res.data })
      } catch (error) {
        console.error(error)
      }
    },
    updateTask({ commit, dispatch }, task) {
      api.put('tasks/' + task._id, task)
        .then(res => {
          dispatch("getTasks", task.listId)
          if (task.oldListId) {
            dispatch('getTasks', task.oldListId)
          }
        })
    },
    async deleteTask({ commit, dispatch }, taskData) {
      try {
        let res = await api.delete("tasks/" + taskData._id)
        debugger
        dispatch("getTasks", taskData.listId)
      } catch (error) {
        console.error(error)
      }
    },




    //#endregion


    //#region -- LISTS --
    createList({ commit, dispatch }, payload) {
      api.post("lists", payload)
        .then(res => {
          console.log({ res })
          dispatch('getLists', payload.boardId)
        })
    },
    async getLists({ commit, dispatch }, boardId) {
      try {
        let res = await api.get('boards/' + boardId + '/lists')
        commit('setLists', res.data)
      } catch (error) {

      }
    },
    async  deleteList({ commit, dispatch }, listData) {
      try {
        let res = await api.delete("lists/" + listData._id)
        dispatch('getLists', listData.boardId)
      } catch (error) {
        console.error(error)
      }
    }

    //#endregion
  }
})
