const express = require('express');
const path = require('path');
const bp = require('body-parser')
const app = express();
const router = require('./router')
app.use(bp.json());
router.router(app);

app.use(express.static(path.join(__dirname, "../public/dist/public")))
app.all('*', (req, res)=>res.sendFile(path.join(__dirname, '../public/dist/public/index.html')))

app.listen(8000, ()=>console.log('listening'))