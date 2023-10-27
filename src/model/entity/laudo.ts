import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Laudo{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'date'})
    data: Date;
    @Column({type: 'text'})
    json: string;
}