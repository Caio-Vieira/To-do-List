let inputText = document.getElementById('text')
let button = document.getElementById('send')
let container = document.getElementById('container')
let list = []
let text

button.addEventListener('click', add)

function randomId() {
    return Math.floor(Math.random() * 1000)
}

function textTask() {
    return { task: inputText.value, id: randomId() }
}

function add() {
    if (inputText.value == "") {
        alert('Insira uma nota')
        inputText.focus()
    }
    else {
        list.push(textTask())
        addDisplay()
        inputText.value = ''
        inputText.focus()
    }
    
}

function addDisplay() {

    list.forEach(item => {

        text = "<div id=" + item.id + " class=tasks"  + ">" + "<input type='radio' name='selected'>" + "<p>" + item.task + "</p>" + "</div>"
    })

    container.innerHTML += text
    localStorage.setItem("lista", JSON.stringify(list))
    
}

function removeItem() {
    let inputChecked = document.querySelectorAll('input[type=radio]')

    inputChecked.forEach((item) => {
        if (item.checked) {
            container.removeChild(item.parentElement)
            let takeId = parseInt(item.parentElement.getAttribute('id'))
            let deleteItem = list.map((item) => item.id).indexOf(takeId)
            list.splice(deleteItem, 1)
            localStorage.setItem("lista", JSON.stringify(list))
        }
    })

}

function removeAll() {
    if (container.childElementCount == 0) {
        alert('Insira uma nota')
        inputText.focus()
    }
    else{
        let confirme = confirm('Tem certeza que gostaria de apagar todas as notas?')
        if (confirme == true) {
            container.innerHTML = ''
            list = []
            inputText.value = ''
            inputText.focus()
            localStorage.clear('lista')
        }
    }
}

function showTask() {

    let tasksload = JSON.parse(localStorage.getItem('lista'))
    

    list = tasksload

    list.forEach(item => {
      
        text = "<div id=" + item.id + " class=tasks"  + ">" + "<input type='radio' name='selected'>" + "<p>" + item.task + "</p>" + "</div>"
        container.innerHTML += text
        
    })   
}






