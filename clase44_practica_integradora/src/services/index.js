import { Pizza, User} from '../DAO/factory.js'

import UserRepository from './user.repository.js'
import PizzaRepository from './pizza.repository.js'

export const UserService = new UserRepository(new User())
export const PizzaService = new PizzaRepository(new Pizza())