export default {
  jwt: {
    expiresIn: '2h',
    secret: process.env.JWT_SECRET,
  },
}
