import { AppDataSource } from "../data-source";
import { Food } from "../entity/Food";
import { Controller } from "./base.controller";

export class FoodController extends Controller{
    repository = AppDataSource.getRepository(Food)
}