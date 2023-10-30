import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: 'db.sqlite',
    synchronize: true,
    logging: true,
    entities: [`${__dirname}/**/model/entity/*.*`],
    migrations: [`${__dirname}/**/migrations/*.*`],
})
