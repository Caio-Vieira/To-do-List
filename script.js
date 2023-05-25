let textInput = document.getElementById('text')
let sendButton = document.getElementById('send')
let container = document.getElementById('container')
let todoList = []

sendButton.addEventListener('click', addTask)

function generateID() {
    return Math.floor(Math.random() * 1000)
}

function taskContent() {
    return { id: generateID(), task: textInput.value }
}

function addTask() {
    if (textInput.value == '') {
        textInput.focus()
        return alert('digite uma nota')
    }

    todoList.push(taskContent())
    textInput.value = ''
    textInput.focus()
    showTasks(todoList)
    localStorage.setItem("lista", JSON.stringify(todoList))

}

function showTasks(task) {
    let element = ''

    task.forEach((item, index) => {
        element = createElementHTML(item, index)
    })

    container.innerHTML += element
}

function removeItem() {
    let checkInput = document.querySelectorAll('input[type=radio]')

    checkInput.forEach((item) => {
        if (item.checked) {
            container.removeChild(item.parentElement)
            let getId = parseInt(item.parentElement.getAttribute('id'))
            let deleteItem = todoList.findIndex((item) => item.id == getId)
            todoList.splice(deleteItem, 1)
            localStorage.setItem("lista", JSON.stringify(todoList))
        }
    })
}

function removeAll() {
    if (container.childElementCount == 0) {
        textInput.focus()
        return alert('Insira uma nota')
    }
    else {
        let confirme = confirm('Tem certeza que gostaria de apagar todas as notas?')
        if (confirme) {
            container.innerHTML = ''
            todoList = []
            textInput.value = ''
            textInput.focus()
            localStorage.clear('lista')
        }
    }
}

function loadTasks() {

    let tasksLoad = JSON.parse(localStorage.getItem('lista'))
    let element = ''

    if (tasksLoad == null) {
        addTask
    }
    else {
        todoList = tasksLoad
        todoList.forEach((item, index) => {
            element = createElementHTML(item, index)
            container.innerHTML += element
        })
    }
}


function createElementHTML(item, index) {
    return `<div id="${item.id}" class="tasks"><input type="radio" name="selected${index}"><p>${item.task}</p></div>`
}