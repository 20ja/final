import dotenv from 'dotenv'
import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

dotenv.config()

const Schema = mongoose.Schema
mongoose.connect(process.env.DBURL)
mongoose.plugin(beautifyUnique)

const userSchema = new Schema({
  account: {
    type: String,
    minlength: [6, '帳號必須6個字以上'],
    maxlength: [20, '帳號必須二十個字以下'],
    unique: '帳號已使用',
    required: [true, '請輸入帳號']
  },
  password: {
    type: String,
    required: [true, '請輸入密碼']
  },
  email: {
    type: String,
    required: [true, '請輸入email']
  }
}, {
  versionKey: false
})

const users = mongoose.model(process.env.COLLECTION_USER, userSchema)
const connection = mongoose.connection

export default {
  users,
  connection
}
