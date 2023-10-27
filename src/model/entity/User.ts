import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export enum sexo{
    M='MALE',F='FEMALE'
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nome: string;
    @Column()
    cpf: string;
    @Column({nullable: true})
    idade: number;
    @Column()
    endereco: string;
    @Column({nullable: true})
    endereco_numero: string
    @Column()
    telefone: string;
    @Column({enum: sexo})
    sexo: sexo;
}
