import {StockModel}from '../models/Stock'

export const StockController = {

  async read(req, res) {
    const stockList = await StockModel.find()

    return res.json(stockList)
  },

  async create(req, res){
    const { name, products} = req.body

    if(!name){
      return res.status(400).json({error: "Necessário um nome!"})
    }
    
    const stockCreated =  await StockModel.create({
      name, products
    })

    return res.json(stockCreated)
  },

  async delete(req, res){
    const { id } = req.params;

    const stockDeleted = await StockModel.findOneAndDelete({_id: id})
    
    if(stockDeleted){
      return res.json(stockDeleted)
    }

    return res.status(401).json({error: 'Não foi encontrado o registro'})
  },

  async update(req, res){
    const { id } = req.params;
    const {name} = req.body

    const stockUpdate = await StockModel.findOne({_id: id})

    stockUpdate.name = name
    await stockUpdate.save()
    
    if(stockUpdate){
      return res.json(stockUpdate)
    }

    return res.status(401).json({error: 'Não foi encontrado o registro'})
  }
}
