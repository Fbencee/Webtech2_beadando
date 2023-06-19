// import * as express from 'express';
import express  from "express";

import { FoodController } from './controller/food.controller';
import { UserController } from "./controller/user.controller";

export function getRouter() {
    const router = express.Router();

    const userController = new UserController();
    const foodController = new FoodController();

    router.get('/users', userController.getAll);
    router.get('/users/', userController.update);
    router.post('/users', userController.create);
    router.delete('/users/:id', userController.delete);
    router.get('/users/:id', userController.getOne);

    router.get('/foods', foodController.getAll);
    router.get('/foods/:id', foodController.getOne);
    router.post('/foods/', foodController.create);
    router.put('/foods/', foodController.update);
    router.delete('/foods/:id', foodController.delete);

    return router;
}