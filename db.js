import dotenv from 'dotenv'
import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

dotenv.config()

mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)

const Schema = mongoose.Schema
mongoose.connect(process.env.DBURL)
mongoose.plugin(beautifyUnique)

// 會員模板
const userSchema = new Schema({
  name: {
    type: String,
    minlength: [2, '姓名最少2個字以上'],
    required: [true, '請輸入姓名']
  },
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

// 商品模板
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, '需要商品圖片']
  },
  title: {
    type: String,
    required: [true, '需要商品名稱']
  },
  price: {
    type: Number,
    required: [true, '需要商品價格']
  },
  originalprice: {
    type: String,
    required: [true, '需要商品定價']
  },
  ISBN: {
    type: String,
    required: [true, '需要商品編碼']
  },
  preview: {
    type: Array,
    required: [true, '需要商品預覽圖']
  },
  description: {
    type: String,
    required: [true, '需要商品介紹']
  },
  category: {
    type: String,
    required: [true, '需要商品分類']
  }
}, {
  versionKey: false
})

// 購物車模板
const cartSchema = new Schema({
  id: {
    type: String,
    required: [true, '需要使用者ID']
  },
  product: {
    type: Object,
    required: [true, '需要商品明細']
  }
}, {
  versionKey: false
})

// 訂單模板
const orderSchema = new Schema({
  id: {
    type: String,
    required: [true, '需要使用者ID']
  },
  cart: {
    type: Array,
    required: [true, '需要訂單內容']
  },
  totalprice: {
    type: Number,
    required: [true, '需要總金額']
  }
}, {
  versionKey: false
})

const users = mongoose.model(process.env.COLLECTION_USER, userSchema)
const products = mongoose.model(process.env.COLLECTION_PRODUCT, productSchema)
const carts = mongoose.model(process.env.COLLECTION_CART, cartSchema)
const orders = mongoose.model(process.env.COLLECTION_ORDER, orderSchema)
const connection = mongoose.connection

export default {
  users,
  products,
  carts,
  orders,
  connection
}
