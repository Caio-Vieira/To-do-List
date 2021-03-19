let inputTxt = document.getElementById('text') 
let container = document.querySelector('#container')

function add(){ 

    if(inputTxt.value == ""){  
        alert('digite uma nota') 
        inputTxt.focus()
    }
    else{ 
        let inputCheck = '<input type="checkbox" class = "item">' 
        let list = document.createElement('p')  
        list.innerHTML += inputCheck + '  ' + inputTxt.value 
        container.appendChild(list) 
        inputTxt.value = "" 
        inputTxt.focus() 
    }
}
   
function removeItems() {  

    let item = document.querySelectorAll('.item') 
    
    for ( i of item){ 
        
        if(i.checked == true){ 
            container.removeChild(i.parentNode) 
        }
    }
}

function removeAll() { 
    let confirme = confirm ('Tem certeza que gostaria de apagar todas as notas?') 

    if(confirme == true){ 
        let container = document.querySelector('#container') 
        container.innerHTML = ""
    }
}

