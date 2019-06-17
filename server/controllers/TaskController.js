import express from 'express'
import TaskService from '../services/TaskService.js'
import { create } from 'domain';


let _service = new TaskService()
let _repo = _service.repository


export default class TaskController {
  constructor() {
    this.router = express.Router()
      .get("", this.getAll)
      .get("/:id", this.getById)
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
      let data = await _repo.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("Invalid Board ID")
    } catch (error) {
    }
  }
  async delete(req, res, next) {
    try {
      await _repo.findOneAndRemove({ _id: req.params.id })
      return res.send("Successfully Deleted!")
    } catch (error) {

    }
  }
}