import {StockModel} from '../models/Stock';

export const ProductController = {
  
  async read(req, res){
    const { id } = req.params;
    const Stock = await StockModel.findOne({_id: id});
    const Products = Stock.product
    return res.json(Products)
  },

  async create(req, res){
    const { name, inStock } = req.body
    const { id } = req.params;
    const createProduct = await StockModel.findOne({_id: id})
    createProduct.product.push({name, inStock});
    await createProduct.save()

    if(createProduct){
      const product = createProduct.product
      return res.json(product[product.length - 1])
    }

    return res.status(401).json({error: 'Não foi encontrado o registro'})
  },

  async delete(req, res){
  const { id, idP } = req.params;
  const Stock = await StockModel.findOne({_id: id})
  const index = Stock.product.findIndex(e => e._id == idP)
  Stock.product.splice(index,1)

  await Stock.save()

  if(Stock){
    return res.json(Stock)
  }

  return res.status(401).json({error: 'Não foi encontrado o registro'})
  },

  async update(req, res){
    const { name, inStock } = req.body
    const { id, idP } = req.params;
    const Stock = await StockModel.findOne({_id: id})
    const index = Stock.product.findIndex(e => e._id == idP)
    Stock.product[index].name = name;
    Stock.product[index].inStock = inStock;

    await Stock.save()
  
    if(Stock){
      return res.json(Stock.product[index])
    }
  
    return res.status(401).json({error: 'Não foi encontrado o registro'})
    }

}