import express from 'express';
import apiRouter from './api-routes/index.mjs';
const app=express();
const PORT=3000;

app.use(express.static('public'));
app.use('/api',apiRouter);

app.listen(PORT,(req,res)=>{
    console.log(`${PORT}でサーバーが起動しましたよ！！`);
});


