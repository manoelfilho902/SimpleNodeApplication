import { AppDataSource } from "./data-source"
import { User } from "./model/entity/User"
import express = require('express');
import cors = require('cors');
import MainRouter from "./controller.ts/main";
import path = require("path");
import el = require("ejs-electron");
import e = require("express");
const port = 10000;

const { app, BrowserWindow } = require('electron')





const ejse = require('ejs-electron')
ejse.options('debug', true)

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow()
    mainWindow.loadURL('http://localhost:10000')
    mainWindow.maximize()
    mainWindow.on('close', (event) => {
        mainWindow = null;
    })
    // mainWindow.toggleDevTools();

    AppDataSource.initialize().then(async () => {
        const appEx = express()
        appEx.use(express.json());
        appEx.use(express.urlencoded({ extended: true, }));
        appEx.use(cors());
        appEx.set('view engine', 'ejs');
        appEx.use(express.static(__dirname + '/public'));
        appEx.set('views', path.join(__dirname, "views"));


        appEx.get('/', (req: express.Request, res: express.Response) => {
            return res.render('index');
        })
        appEx.use('/data', MainRouter);

        return appEx.listen(port, () => console.log(`Server is listem on: ${port}`));

    }).catch(error => console.log(error))



})

