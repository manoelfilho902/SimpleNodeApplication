import { NextFunction, Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../model/entity/User";
import { Laudo } from "../model/entity/laudo";
import { ILike, Like } from "typeorm";

export interface TypedRequestBody<T> extends Express.Request, Request {
    body: T
}

export function isValid(value: any): boolean {
    return value && value != null && value !== undefined;
}

export class main {
    private static repositories = {
        user: AppDataSource.getRepository(User),
        laudo: AppDataSource.getRepository(Laudo)
    }
    findUser(req: Request, res: Response, next: NextFunction) {
        if (!isValid(req.query.cpf) && !isValid(req.query.nome)) {
            return res.status(400).send('CPF ou Nome devem ser informados!');
        }
        let where = isValid(req.query.cpf) ? { cpf: Like((req.query.cpf as string).replace(/[^0-9]/, '').concat('%')) } : (
            isValid(req.query.nome) ? { nome: ILike((req.query.nome as string).concat('%')) } : undefined
        )
        main.repositories.user.find({ where: where}).then(lst => {
            res.status(200).send(lst);
        }).catch(err => next(err))

    }

    saveUser(req: TypedRequestBody<User>, res: Response, next: NextFunction) {
        if (!isValid(req.body)) {
            return res.status(400).send('Usuário inválido!');
        }
        main.repositories.user.save(req.body).catch(err => next(err));
    }


}

export const MainRouter = Router();
const controller = new main();

MainRouter.get('/find_user', controller.findUser);
MainRouter.post('/save_user', controller.findUser);


export default MainRouter;