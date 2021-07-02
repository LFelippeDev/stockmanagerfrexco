import {ProductController} from './app/controllers/ProductController';
import {StockController} from './app/controllers/StockController';
import {LoginController} from './app/controllers/LoginController';

import express from 'express';
import {authMiddleware} from './app/middlewares/auth'
export const routes = express.Router()

//Manage Stock
routes.post('/Stocks', authMiddleware, StockController.create)
routes.get('/Stocks', authMiddleware, StockController.read)
routes.delete('/Stocks/:id', authMiddleware, StockController.delete)
routes.put('/Stocks/:id', authMiddleware, StockController.update)

//Manage Product 
routes.put('/Stocks/:id/Products', authMiddleware, ProductController.create)
routes.get('/Stocks/:id/Products', authMiddleware, ProductController.read)
routes.delete('/Stocks/:id/Products/:idP', authMiddleware, ProductController.delete)
routes.put('/Stocks/:id/Products/:idP', authMiddleware, ProductController.update)

//Login
routes.post("/Register",LoginController.create)
routes.post("/Login",LoginController.auth)
