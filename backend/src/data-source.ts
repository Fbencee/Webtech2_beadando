import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Food } from "./entity/Food"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "meals",
    synchronize: true,
    logging: true,
    entities: [User, Food],
    migrations: [],
    subscribers: [],
})
