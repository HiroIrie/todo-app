import express from 'express';
import apiRouter from './api-routes/index.mjs';
import './helpers/db.mjs';
import path from 'path';
const app=express();
const port=process.env.PORT||3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api',apiRouter);

app.get('*',(req,res)=>{
 const innerHtml=path.resolve('public','index.html');
 res.sendFile(innerHtml);
})

app.use(function(err,req,res,next){
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({"msg":"不正なエラーが発生しました"});
})

app.listen(port,(req,res)=>{
    console.log(`${port}でサーバーが起動しましたよ！！`);
});


