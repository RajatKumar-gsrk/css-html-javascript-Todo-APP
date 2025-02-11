const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todoArray = loadTodoList();
updateListOnPage();

todoForm.addEventListener('submit', function(event){
    event.preventDefault();
    addToArray();
})

function addToArray(){
    const inputText = todoInput.value.trim();
    const inputTextObject = {
        text: inputText,
        completed: false
    };
    if(inputText.length > 0){
        todoArray.push(inputTextObject);
        updateListOnPage(inputTextObject);
        saveTodoList();
        todoInput.value = "";
    }
}

function updateListOnPage(){
    todoList.innerHTML = "";
    todoArray.forEach((inputTextObject, todoIndex)=>{
        todoItem = createListItem(inputTextObject, todoIndex);
        todoList.append(todoItem);
    });
}

function createListItem(inputTextObject, todoIndex){
    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    const todoItemId = "todo-"+todoIndex;
    const inputText = inputTextObject.text;
    listItem.innerHTML = `
        <input type="checkbox" id="${todoItemId}">
                <label for="${todoItemId}" class="custom-checkbox">
                    <svg fill="var(--disabled-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="none" width="24px" >
                        <path d="m381-240 424-424-57-56-368 367-169-170-57 57 227 226Zm0 113L42-466l169-170 170 170 366-367 172 168-538 538Z"/>
                    </svg>
                </label>
                <label for="${todoItemId}" class="todo-text">${inputText}</label>
                <button class="delete-item">
                    <svg fill="var(--accent-color)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                </button>
    `;
    const checkBox = listItem.querySelector("input");
    checkBox.addEventListener("change", ()=>{
        todoArray[todoIndex].completed = checkBox.checked;
        saveTodoList();
    });
    checkBox.checked = todoArray[todoIndex].completed;

    const deleteItem = listItem.querySelector(".delete-item");
    deleteItem.addEventListener("click", (event)=>{
        deleteTodoItem(todoIndex);
    })

    return listItem;
}

function deleteTodoItem(todoIndex){
    todoArray = todoArray.filter((_, i)=> i !== todoIndex);
    saveTodoList();
    updateListOnPage();
}

function saveTodoList(){
    const jsonString = JSON.stringify(todoArray);
    localStorage.setItem("todoArray", jsonString);/*only stores string*/
}

function loadTodoList(){
    const previousTodoList = localStorage.getItem("todoArray") || "[]"; /* may return NULL */
    return JSON.parse(previousTodoList);
}