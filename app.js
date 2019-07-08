const form = document.querySelector('.task-form');
const showButton = document.querySelector('.show-button');
const tasksContainer = document.querySelector('.show-tasks');

document.addEventListener('DOMContentLoaded', () => {
   const tasks = localStorage.getItem('tasks');
   if (!tasks) {
      localStorage.setItem('tasks', "[]");
   }
})

addEventListener('submit', e => {
   e.preventDefault();
   const task = e.target.elements[0].value;
   const tasks = JSON.parse(localStorage.getItem('tasks'));
   tasks.push(task);
   localStorage.setItem('tasks', JSON.stringify(tasks));
});

showButton.addEventListener('click', () => {
   const tasksList = document.createElement('ol');
   const tasks = JSON.parse(localStorage.getItem('tasks'));

   tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.innerText = task;
      tasksList.appendChild(taskItem);
   });

   tasksContainer.appendChild(tasksList);
});