import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: 'db.sqlite',
    synchronize: true,
    logging: true,
    entities: [`${__dirname}/**/model/entity/*.{ts, js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts, js}`],
})
