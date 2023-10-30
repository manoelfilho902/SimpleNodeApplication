import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./User";

@Entity()
@Unique('laudo_user_json_unique', ['idUsuario', 'json', 'data'])
export class Laudo {
    @PrimaryGeneratedColumn()
    id: number;
    @JoinColumn()
    @ManyToOne(() => User, (u) => u.laudos)
    idUsuario: User
    @Column({ type: 'date' })
    data: Date;
    @Column({ type: 'text' })
    json: string;
    @Column({ comment: 'Quixa ou histórico do laudo', default: '' })
    queixa: string
}