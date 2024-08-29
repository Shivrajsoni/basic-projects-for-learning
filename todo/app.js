const todoform=document.querySelector('form');
const todoInput=document.querySelector('#todo-input');
const todoListUL=document.querySelector('#todo-List');

let allTodos=[];
todoform.addEventListener('submit',function(e){
    e.preventDefault();// 
   
    addTodo();
})

function addTodo(){
    const todoText=todoInput.value.trim();
    if(todoText.length>0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value='';
    }
}

function updateTodoList(){
    todoListUL.innerHTML='';
    allTodos.forEach((todo,todoIndex)=>{
        todoItem=createTodoItem(todo,todoIndex);
        todoListUL.append(todoItem);
    })
}
function createTodoItem(todo,todoIndex){
   
    const todoId="todo-"+todoIndex;
    const todoLI=document.createElement('li');
    const todoText=todo.text;

    todoLI.className="todo";
    todoLI.innerHTML=`
    <input type="checkbox" id='${todoId}'  >
                <label class="custom-checkbox" for="${todoId}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="${todoId}" class="todo-text">
                   ${todoText}
                </label>
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-440v-80h560v80H200Z"/></svg>
                </button>`
                    
                const deleteButton=todoLI.querySelector(".delete-button");
                deleteButton.addEventListener('click',()=>{
                    deleteTodoItem(todoIndex);
                })
                const checkbox=todoLI.querySelector("input");
                checkbox.addEventListener('change',()=>{
                    allTodos[todoIndex].completed=checkbox.checked;
                    saveTodos();
                })
                checkbox.checked=todo.completed;
                return todoLI;
            }
  
            function deleteTodoItem(todoIndex){
                allTodos=allTodos.filter((_,i)=>i!==todoIndex);
                saveTodos();
                updateTodoList();
            }
            function saveTodos(){
                const todosJson=JSON.stringify(allTodos);
                localStorage.setItem('todos',todosJson);
            }
            function getTodos(){
                const todos=localStorage.getItem("todos")||"[]";
                return JSON.parse(todos);

            }