import mongoose from 'mongoose'

const StockData = new mongoose.Schema({ 
  name: String,
  product: [{ name: String, inStock: Number}]
})

export const StockModel = mongoose.model('Stocks', StockData)