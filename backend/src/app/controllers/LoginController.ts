import {UserData} from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {key} from '../../config/auth';

export const LoginController = {

  async create(req, res){
  
    try {
      const user = await UserData.create(req.body);
  
      user.password = undefined;
  
      return res.send({user});
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' });
    }
  },
  
  async auth(req, res){
    const {name, password} = req.body
    const user = await UserData.findOne({name}).select('+password');
    

    if(!user)
      return res.status(400).send({erro: 'Used not found'})
  

    if(!await bcrypt.compare(password, user.password))
      return res.status(400).send({erro: 'Invalid Password'})

      user.password = undefined

      const token = jwt.sign({id: user.id}, key.secret, {
        expiresIn: '30d'
      })
      const date = new Date()

      res.send({user, token, date})
  }
}
