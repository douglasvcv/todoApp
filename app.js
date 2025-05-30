const todoForm = document.querySelector("form")
const todoInput = document.getElementById("todo-input")
const todoList = document.getElementById("todo-list")

let allTodos= getTodos()
updateTodoList()

todoForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    addTodo()
    saveTodo()
})

function addTodo(){
    const todoText = todoInput.value.trim()
    
    if(todoText.length >0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject)
        updateTodoList()
        todoInput.value = ""
    }
    
}
function updateTodoList(){
    todoList.innerHTML = ""
    allTodos.forEach((todo, todoIndex)=>{
       let todoItem = createTodoitem(todo, todoIndex)
        todoList.append(todoItem)
    })
}

function createTodoitem(todo, todoIndex){
    const todoId = "todo-"+todoIndex
    const todoText = todo.text
    const todoLI = document.createElement("li")
    todoLI.className = "todo"
    todoLI.innerHTML = `
     <input type="checkbox"  id="${todoId}">
                <label for="${todoId}" id="custom-checkbox">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="${todoId}" id="todo-text">
                 ${todoText}
                </label>
                <button id="delete-todo">
                    <svg fill="var(--secondary-color)"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
    `
    let deleteButton = todoLI.querySelector('#delete-todo')
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex)
    })
    let checkbox = todoLI.querySelector("input")
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked
        saveTodo()
    })
    checkbox.checked = todo.completed

    return todoLI
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i!== todoIndex)
    saveTodo()
    updateTodoList()
}

function saveTodo(){
    let jsonTodo = JSON.stringify(allTodos)
    localStorage.setItem("todos", jsonTodo)
}
function getTodos(){
    let todoLocal= localStorage.getItem("todos") || []
    return JSON.parse(todoLocal)
}