const express = require('express')
const RouteClass = require('../Route')

module.exports = class Route extends RouteClass {
    constructor(app) {
        super('/');
        
        this.app = app;
        
        this.router = express.Router();

        this.loadChemins()
    }

    loadChemins() {
        this.router.get('/', (_req, res) => {
            return res.send("Hello World!")
        })
    }
}