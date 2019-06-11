import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let commentSchema = new Schema({
  description: { type: String, require: true },
  creator: { type: String, required: true },
}, { timestamps: true })

let _schema = new Schema({
  authorId: { type: ObjectId, ref: "User", required: true },
  boardId: { type: ObjectId, ref: "Board", required: true },
  listId: { type: ObjectId, ref: "List", required: true },
  title: { type: String, required: true },
  comments: [commentSchema]
}, { timestamps: true })


export default class TaskService {
  get repository() {
    return mongoose.model("Task", _schema)
  }
}