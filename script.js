let inputText = document.getElementById('text')
let btn = document.getElementById('send')
let container = document.getElementById('container')
let listTask = []

btn.addEventListener('click', addTask)

function randomId() {
    return Math.floor(Math.random() * 1000)
}

function textTask() {
    return { task: inputText.value, id: randomId() }
}

function addTask() {
    if (inputText.value == '') {
        alert('digite uma nota')
        inputText.focus()
    }
    else {
        listTask.push(textTask())
        inputText.value = ''
        inputText.focus()
        showTask(listTask)
        localStorage.setItem("lista", JSON.stringify(listTask))
    }
}

function showTask(task) {

    task.forEach(item => {

        text = "<div id=" + item.id + " class=tasks" + ">" + "<input type='radio' name='selected'>" + "<p>" + item.task + "</p>" + "</div>"
    })

    container.innerHTML += text
}

function removeItem() {
    let inputChecked = document.querySelectorAll('input[type=radio]')

    inputChecked.forEach((item) => {
        if (item.checked) {
            container.removeChild(item.parentElement)
            let takeId = parseInt(item.parentElement.getAttribute('id'))
            let deleteItem = listTask.map((item) => item.id).indexOf(takeId)
            listTask.splice(deleteItem, 1)
            localStorage.setItem("lista", JSON.stringify(listTask))
        }
    })
}

function removeAll() {
    if (container.childElementCount == 0) {
        alert('Insira uma nota')
        inputText.focus()
    }
    else {
        let confirme = confirm('Tem certeza que gostaria de apagar todas as notas?')
        if (confirme == true) {
            container.innerHTML = ''
            listTask = []
            inputText.value = ''
            inputText.focus()
            localStorage.clear('lista')
        }
    }
}

function loadTasks() {

    let tasksLoad = JSON.parse(localStorage.getItem('lista'))

    if (tasksLoad == null) {
        addTask
    }
    else {
        listTask = tasksLoad
        listTask.forEach(item => {
            text = "<div id=" + item.id + " class=tasks" + ">" + "<input type='radio' name='selected'>" + "<p>" + item.task + "</p>" + "</div>"
            container.innerHTML += text
        })
    }
}