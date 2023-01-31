

window.addEventListener('DOMContentLoaded', async function () {
    const $addTodo = document.querySelector('#addTodo');
    const $inputText = document.querySelector('#inputText');



    //全てのtodoデータをデータベースから取得

    const getAllTodos = async () => {
        const $todoList = document.querySelector('#todoList');
        try {
            let allTodos = await axios.get('/api/todos');
            let { data } = allTodos;
            allTodos = data.map(todoItems => {
                const { todo, completed, _id } = todoItems;
                return `<li><div><input class="checkbox" id=${_id} type="checkbox" value=${completed}>${todo}</div><button class="delete" id=${_id}>削除</button></li>`
            }).join("");
            $todoList.innerHTML = allTodos;
        } catch (err) {
            window.alert('データを取得できませんでした。')
        }
    }


    //todoを行なったかどうかをデータベースと繋げる処置*getAllTodosの後に実行する必要あり！！
    const getCheckBoxes = () => {
        let $checkBoxs = document.querySelectorAll('.checkbox');
        for (let i = 0; i < $checkBoxs.length; i++) {
            let { value } = $checkBoxs[i];
            if (value === "true") {
                $checkBoxs[i].checked = true;
                $checkBoxs[i].parentNode.style.textDecoration = "line-through";
                $checkBoxs[i].parentNode.style.color = "red";
            } else {
                $checkBoxs[i].checked = false;
            }
        }
    }

    //チェックボタンを押した時の動作
    const changeCheckBox = () => {
        document.addEventListener('click', async e => {
            let target = e.target;
            if (target.type === "checkbox") {
                if (target.value === "true") {
                    target.checked = false;
                    target.value = "false";
                    target.parentNode.style.textDecoration = "none";
                    target.parentNode.style.color = "black";
                } else if (target.value === "false") {
                    target.value.checked = true;
                    target.parentNode.style.textDecoration = "line-through";
                    target.parentNode.style.color = "red";
                    target.value = "true";
                }
                try{
                    axios.request({
                        method: 'patch',
                        url: `api/todos/${target.id}`,
                        data: {
                            completed: target.value
                        }
                    });
                }catch(err){
                      alert('データの保存に失敗しました')
                }
            }
        })
    }

    //todo投稿時の操作
    const postTodo = () => {
        let text = "";
        $inputText.addEventListener('change', e => {
            text = e.target.value;
        });
        $addTodo.addEventListener('click', async () => {
            if (text !== "") {
                try {
                        axios.request({
                        method: "post",
                        url: "api/todos",
                        data: {
                            todo: text
                        }
                    });
                    this.window.location.reload();
                } catch (err) {
                    this.alert('データの保存に失敗しました');
                }
            }
        })
    }

    //todo削除時の処理
    const deleteTodo=()=>{
        document.addEventListener('click',async e=>{
            let target=e.target;
            if(target.className==="delete"){
                try{
                    axios.delete(`api/todos/${target.id}`);
                    this.window.location.reload();
                }catch(err){
                  this.alert('削除失敗')
                }
            }
        }) 
    }

    await getAllTodos();
    getCheckBoxes();
    changeCheckBox();
    postTodo();
    deleteTodo();



})





