import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"
import { FoodDTO } from "../../../models";

@Entity()
export class Food implements FoodDTO{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    desc: string;

    @Column()
    preptime: number;

    @Column()
    price: number;
}