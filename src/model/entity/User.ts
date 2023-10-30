import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Laudo } from "./laudo";

export enum sexo {
    M = 'MALE', F = 'FEMALE'
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nome: string;
    @Column()
    cpf: string;
    @Column({ nullable: true })
    idade: number;
    @Column()
    endereco: string;
    @Column({ nullable: true })
    endereco_numero: string
    @Column()
    telefone: string;
    @Column({ enum: sexo })
    sexo: sexo;
    @OneToMany(() => Laudo, (l) => l.idUsuario)
    laudos: Laudo[]
}
