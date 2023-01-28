import express from 'express';
import{getAllTodos,registTodo,deleteTodo}from '../controllers/todos.mjs';
import {body} from 'express-validator';
import { requestErrorHandler } from '../helpers/helper.mjs';
const router = express.Router();


//todo一覧を返す処理
router.get('/',getAllTodos);

//todoを追加する処理
router.post('/',
body('todo').notEmpty()
, requestErrorHandler(registTodo) );

//todo削除
router.delete('/:id',requestErrorHandler(deleteTodo)  );

export default router;