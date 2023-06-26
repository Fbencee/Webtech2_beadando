
import express  from "express";
import jwt from "jsonwebtoken";
import {checkUser} from './protect-routes';

import { FoodController } from './controller/food.controller';
import { UserController } from "./controller/user.controller";

export function getRouter() {
    const router = express.Router();

    const userController = new UserController();
    const foodController = new FoodController();

    router.get('/users', userController.getAll);
    router.get('/users/', checkUser, userController.update);
    router.post('/users', userController.create);
    router.delete('/users/:id', checkUser, userController.delete);
    router.get('/users/:id', userController.getOne);
    router.post('/users/login', userController.login);  

    router.get('/foods', foodController.getAll);
    router.get('/foods/:id', foodController.getOne);
    router.post('/foods/', checkUser, foodController.create);
    router.put('/foods/', checkUser, foodController.update);
    router.delete('/foods/:id', checkUser, foodController.delete);

    return router;
}