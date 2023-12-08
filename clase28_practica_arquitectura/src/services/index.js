
import { User, Order, Store } from '../DAO/factory.js'

import UserRepository from "./users.repository.js";
import StoreRepository from "./stores.repository.js";
import OrderRepository from "./orders.repository.js";

export const UserService = new UserRepository(new User())
export const StoreService = new StoreRepository(new Store())
export const OrderService = new OrderRepository(new Order())