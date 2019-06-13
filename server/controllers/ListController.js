import express from 'express'
import ListService from '../services/ListService.js'
import TaskService from '../services/TaskService.js';


let _service = new ListService()
let _repo = _service.repository
let _repoTask = new TaskService().repository


export default class ListController {
  constructor() {
    this.router = express.Router()
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/tasks", this.getTasksByListId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
      .use(this.defaultRoute)
  }
  defaultRoute(req, res, next) {
    next({ status: 404, messsage: "No such Route" })
  }
  async getAll(req, res, next) {
    try {
      let data = await _repo.find({})
      return res.send(data)
    } catch (error) {
      console.error(error)
    }
  }
  async getById(req, res, next) {
    try {
      let data = await _repo.findOne({ _id: req.params.id }) //authorId: req.session.uid
      return res.send(data)
    } catch (error) {

    }
  }
  async getTasksByListId(req, res, next) { //CREATE THE REST OF THIS METHOD
    try {
      let data = await _repoTask.find({ listId: req.params.id })
      console.log(data)
      return res.send(data)
    } catch (error) {

    }
  }
  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _repo.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      console.error(error)
    }
  }
  async edit(req, res, next) {
    try {
      let data = await _repo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("Invalid Board ID")
    } catch (error) {
    }
  }
  async delete(req, res, next) {
    try {
      await _repo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully Deleted!")
    } catch (error) {

    }
  }
}