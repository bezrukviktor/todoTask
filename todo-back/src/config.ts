import dotenv from 'dotenv'
dotenv.config()

export const config = {
  DB_URL: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a31qk.mongodb.net/`
}
