const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const { User } = require('./models/User')

//application/ -www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// mongoDB 연결
const mongoose = require('mongoose')
mongoose
  .connect(
    'mongodb+srv://Yim:Kxkd13579!@boiler-plate.ry8vr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB connected ...'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!zz')
})

app.post('/register', (req, res) => {
  // 회원 가입 할 떄 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true,
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
