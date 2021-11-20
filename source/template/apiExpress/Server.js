const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

module.exports = class Server {
    constructor() {
        this.app = express();

        this.app.use(bodyParser.json())
        
        this.pathRoutes = path.join(__dirname, './routes')

        this.chargementRoutes()

    }

    async chargementRoutes() {
        const files = await fs.readdir(this.pathRoutes);
        for(let i = 0; i < files.length; i++) {
            const file = new (require(path.join(this.pathRoutes, files[i])))(this)
            this.app.use(file.chemin, file.router)
        }
    }

    start() {
        this.app.listen(9900, () => {
            console.log('[SERVEUR EN LIGNE] :: PORT 9900 ::')
        } )
    }
}