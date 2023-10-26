import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nome: string;
    @Column()
    cpf: string;
    @Column()
    idade: number;
    @Column()
    endereco: string;
    @Column()
    numero: string
    @Column()
    telefone: string;


    

}
