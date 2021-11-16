const express = require('express');
const application = express();

application.get("/api", (req, res) =>{
    res.status(200)
    res.send('Hey')
});

const port = process.env.PORT || 3001
application.listen(port, ()=> console.log(`Ecoute du port : ${port} en cours ...`))