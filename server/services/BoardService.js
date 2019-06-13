import mongoose from "mongoose"
import ListService from './ListService'
import TaskService from "./TaskService";
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _listRepo = new ListService().repository
let _taskRepo = new TaskService().repository

let _schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

//CASCADE ON DELETE
_schema.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    _taskRepo.deleteMany({ boardId: this._conditions._id }),
    _listRepo.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default class BoardService {
  get repository() {
    return mongoose.model('Board', _schema)
  }
}