import mongoose from "mongoose"

const dbConfig="mongodb+srv://dbUser:a3nzSm4YdezfQWhz@cluster0.ohopy.mongodb.net/stocks?retryWrites=true&w=majority"

export const connection = mongoose.connect(dbConfig,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
