import express from 'express';
const router=express.Router();
import Todo from '../models/todo.mjs';

//todo一覧を返す処理
router.get('/',(req,res)=>{
    res.send('ゲットメッソドですよ')
});

//todoを追加する処理
router.post('/',(req,res)=>{
    res.send(req.body)
});

//todo削除
router.delete('/:id',(req,res)=>{
    res.send(`${params.id}を削除します`)
});

export default router;