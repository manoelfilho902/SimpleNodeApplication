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
        main.repositories.user.find({ where: where }).then(lst => {
            res.status(200).send(lst);
        }).catch(err => next(err))

    }

    findLaudosByUser(req: Request, res: Response, next: NextFunction) {
        if (!isValid(req.query.cpf) && !isValid(req.query.nome)) {
            return res.status(400).send('CPF ou Nome devem ser informados!');
        }
        let where = isValid(req.query.cpf) ? { cpf: Like((req.query.cpf as string).replace(/[^0-9]/, '').concat('%')) } : (
            isValid(req.query.nome) ? { nome: ILike((req.query.nome as string).concat('%')) } : undefined
        )
        main.repositories.user.find({ where: where, relations: ['laudos'] }).then(lst => {
            res.status(200).send(lst);
        }).catch(err => next(err))

    }



    saveUser(req: TypedRequestBody<User>, res: Response, next: NextFunction) {
        if (!isValid(req.body)) {
            return res.status(400).send('Usuário inválido!');
        }
        main.repositories.user.findOne({ where: { cpf: req.body.cpf } }).then(u => {
            if (isValid(u)) {
                req.body.id = u.id
            }
            main.repositories.user.save(req.body).then((u) => res.status(200).send(u)
            ).catch(err => next(err));
        }).catch(err => next(err));

    }

    saveLaudo(req: TypedRequestBody<Laudo>, res: Response, next: NextFunction) {
        if (!isValid(req.body)) {
            return res.status(400).send('Laudo inválido!');
        }
        main.repositories.laudo.save(req.body).then(() => res.status(200).send()
        ).catch(err => next(err));
    }
}

export const MainRouter = Router();
const controller = new main();

MainRouter.get('/find_user', controller.findUser);
MainRouter.get('/find_laudo_by_user', controller.findLaudosByUser);
MainRouter.post('/save_user', controller.saveUser);
MainRouter.post('/save_laudo', controller.saveLaudo)


export default MainRouter;