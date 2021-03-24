const { User } = require('../models/User')

let auth = (req, res, next) => {
  //인증처리
  // step 1. 클라이언트 쿠키에서 토큰을 가져온다
  let token = req.cookies.x_auth
  // step 2. 토큰을 복호화하고 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err
    if (!user) return res.json({ isAuth: false, error: true })

    req.token = token
    req.user = user
    next()
  })
  // step 3. 유저가 있으면 인증 o

  // step 3-1 . 없으면 인증 x
}

module.exports = { auth }
