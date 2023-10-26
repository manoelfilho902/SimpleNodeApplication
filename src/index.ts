import { AppDataSource } from "./data-source"
import { User } from "./model/entity/User"
import express = require('express');
import cors = require('cors');
const port = 10000;

AppDataSource.initialize().then(async () => {
    const app = express()
    app.use(express.json());
    app.use(express.urlencoded({ extended: true, }));
    app.use(cors());
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/../public'));


    console.log(await AppDataSource.getRepository(User).find());
    
    return app.listen(port, () => console.log(`Server is listem on: ${port}`));
    
}).catch(error => console.log(error))
