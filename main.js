// Pomodoro en JS
// Juan Antonaccio
// Repositorio GitHub

const tareas = [] // se van almacenar las tareas

let time = 0 // esta variable va a llevar la cuenta regresiva
let timer = null // lo vamos a asociar a un set interval para que se ejecute durante un 
                 // periodo de tiempo
let timerBreak = null // Para el Break los 5 min. de descanso
let actual = null // me dice la tarea actual que se esta ejecutando

const bAdd = document.querySelector("#bAdd")
const itTask= document.querySelector("#itTask")
const form = document.querySelector("#form")
const taskName = document.querySelector('#time #taskName')

form.addEventListener('submit', (e) => {
    e.preventDefault() // anulamos su funcionamiento nativo
    if(itTask !== ''){
        createTask(itTask.value)
        itTask.value=''
        renderTask()
    }

})

function createTask(value){
      const newTask = {
          id:(Math.random()*100).toString(36).slice(3),
          title:value,
          completed:false,

      }
      tareas.unshift(newTask)
}

function renderTask(){
    const html = tareas.map(task => {
        return `
               <div class="task">
                  <div class="completed">${ task.completed ? `<span class="done">Hecho</span>` :`<button class="start-button" data-id="${task.id}">Comenzar</buttom>`}</div>
                  <div class="title">${task.title}</div>
               </div>
        
        `
    })
    const taskContainer = document.querySelector("#tasks")
    taskContainer.innerHTML = html.join('')

    const startButtons = document.querySelectorAll('.task .start-button') // devuelve una coleccion
    startButtons.forEach(button => {
        button.addEventListener('click', e => {
            if(!timer){
                const id = button.getAttribute('data-id')
                startButtonHandler(id)
                button.textContent = 'En Progreso ....'
            }
        })
    })
}

function startButtonHandler(id){
    time = 25 * 60
    actual = id
    const taskIndex = tareas.findIndex(task => task.id = id)
    
    taskName.textContent = tareas[taskIndex].title
    timer = setInterval(() =>{
        timeHandler(id)
    },1000)// 1000 ms = 1 seg

}

function timeHandler(id){
    time--
    renderTime()
    if (time==0){
        clearInterval(timer)
        actual=null // porque ya terminamos la tarea
        taskName.textContent=''
        renderTime()
    }
}

function renderTime(){
    const timeDiv = document.querySelector("#time #value")
    const minutes = parseInt(time / 60)
    const seconds = parseInt(time % 60)
    timeDiv.textContent = `${minutes <10 ? '0' :''}${minutes}:${seconds<s10 ? '0':''}${seconds}`
}
