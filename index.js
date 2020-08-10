document.querySelector('.EditTaskBtn').style.display = 'none';
document.querySelector('.CancelTaskBtn').style.display = 'none';

document.querySelectorAll('.task-check').forEach((checked) => {
  checked.addEventListener('click', (e) => {
    const parent = e.target.parentElement.parentElement;
    parent.classList.toggle('completed');
  });
});

let taskIDs = localStorage.getItem('taskIDs')
let onFocus
let tasks = localStorage.getItem('tasks')

if (!taskIDs) {
  taskIDs = []
  localStorage.setItem('taskIDs', JSON.stringify(taskIDs))
} else {
  taskIDs = JSON.parse(taskIDs)
}

const loadTasks = tasks => {
  $('.task-list').html('')
  for (let i=0; i<tasks.length; i++) {
    console.log(taskIDs[i])
    const node = `<div class="task" id="${taskIDs[i]}">
      <div class="task__details">
        <input type="checkbox" class="task-check" />
        <label>${tasks[i]}</label>
      </div>

      <div class="task__op">
        <ion-icon class="task__op_edit" id="edit-${taskIDs[i]}" name="create-outline"></ion-icon>
        <ion-icon class="task__op_delete" id="delete-${taskIDs[i]}" name="trash-outline"></ion-icon>
      </div>
    </div>`
    $('.task-list').prepend(node)
  }

  // document.querySelectorAll('.task-check').forEach((checked) => {
  //   checked.addEventListener('click', (e) => {
  //     const parent = e.target.parentElement.parentElement;
  //     parent.classList.toggle('completed');
  //   });
  // });
  $('body').on('click', '.task-check', e=> {
    $(e.target.parentElement.parentElement).toggleClass('completed')
  })
}

if (tasks) {
  tasks = JSON.parse(tasks)
  loadTasks(tasks)
} else {
  tasks = [ ]
  localStorage.setItem('tasks', JSON.stringify(tasks))
  loadTasks(tasks)
}

$('.AddTaskBtn').click(e => {
  const task = $('#newTaskID').val()
  if (taskIDs.length == 0) {
    taskID = 0
  } else {
    taskID = taskIDs[taskIDs.length - 1] + 1
  }
  taskIDs.push(taskID)
  localStorage.setItem('taskIDs', JSON.stringify(taskIDs))
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
console.log(taskID)
})

$('body').on('click', ' .task__op_edit', e => {
  let id = parseInt(e.target.id.split('-')[1])
  const task = tasks[id]
  onFocus = id
  console.log(id, task)
  $('#newTaskID').val(task)

  $('.AddTaskBtn').hide()
  $('.EditTaskBtn').show()
  $('.CancelTaskBtn').show()
})

$('.EditTaskBtn').click(e => {
  const task = $('#newTaskID').val()
  tasks[onFocus] = task
  localStorage.setItem('tasks', JSON.stringify(tasks))
  $('#newTaskID').val('')
  $('.AddTaskBtn').show()
  $('.EditTaskBtn').hide()
  $('.CancelTaskBtn').hide()
  loadTasks(tasks)
})

$('.CancelTaskBtn').click(e => {
  $('#newTaskID').val('')
  $('.AddTaskBtn').show()
  $('.EditTaskBtn').hide()
  $('.CancelTaskBtn').hide()
})

$('body').on('click', '.task__op_delete', e=> {
  let id = parseInt(e.target.id.split('-')[1])
  tasks.splice(id, 1)
  taskIDs.splice(id, 1)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  localStorage.setItem('taskIds', JSON.stringify(taskIDs))
  loadTasks(tasks)
})

$('#clear').click(e => {
  localStorage.clear()
  location.reload()
})