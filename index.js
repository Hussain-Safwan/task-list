document.querySelector('.EditTaskBtn').style.display = 'none';
document.querySelector('.CancelTaskBtn').style.display = 'none';

document.querySelectorAll('.task-check').forEach((checked) => {
  checked.addEventListener('click', (e) => {
    const parent = e.target.parentElement.parentElement;
    parent.classList.toggle('completed');
  });
});

let taskID = localStorage.getItem('taskID')
let onFocus
let tasks = localStorage.getItem('tasks')

if (tasks) {
  tasks = JSON.parse(tasks)
  for (let i=0; i<tasks.length; i++) {
    const node = `<div class="task" id="${ (i+1)}">
      <div class="task__details">
        <input type="checkbox" class="task-check" />
        <label>${tasks[i]}</label>
      </div>

      <div class="task__op">
        <ion-icon class="task__op_edit" id="edit-${( i+1)}" name="create-outline"></ion-icon>
        <ion-icon class="task__op_delete" id="delete-${(i+1)}" name="trash-outline"></ion-icon>
      </div>
    </div>`
    $('.task-list').prepend(node)
  }
} else {
  tasks = [ ]
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

if (!taskID) {
  taskID = 0
  localStorage.setItem('taskID', JSON.stringify(taskID))
}

$('.AddTaskBtn').click(e => {
  const task = $('#newTaskID').val()
  taskID++
  localStorage.setItem('taskID', taskID)
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))

  const node = `<div class="task" id="${taskID}">
  <div class="task__details">
    <input type="checkbox" class="task-check" />
    <label>${task}</label>
  </div>

  <div class="task__op">
    <ion-icon class="task__op_edit" id="edit-${taskID}" name="create-outline"></ion-icon>
    <ion-icon class="task__op_delete" id="delete-${taskID}" name="trash-outline"></ion-icon>
  </div>
</div>`

$('.task-list').prepend(node)
$('#newTaskID').val('')
})

$('body').on('click', ' .task__op_edit', e => {
  let id = parseInt(e.target.id.split('-')[1])-1
  const task = tasks[id]
  onFocus = id
  console.log(task)
  $('#newTaskID').val(task)

  $('.AddTaskBtn').hide()
  $('.EditTaskBtn').show()
  $('.CancelTaskBtn').show()
})

$('.EditTaskBtn').click(e => {
  const task = $('#newTaskID').val()
  tasks[onFocus] = task
  localStorage.setItem('tasks', JSON.stringify(tasks))
  location.reload()
})

$('.CancelTaskBtn').click(e => {
  $('#newTaskID').val('')
  $('.AddTaskBtn').show()
  $('.EditTaskBtn').hide()
  $('.CancelTaskBtn').hide()
})

$('body').on('click', '.task__op_delete', e=> {
  let id = parseInt(e.target.id.split('-')[1])-1
  tasks.splice(id, 1)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  location.reload()
})

$('#clear').click(e => {
  localStorage.clear()
  location.reload()
})