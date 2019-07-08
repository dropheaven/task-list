const form = document.querySelector('.task-form');
const showButton = document.querySelector('.show-button');
const tasksContainer = document.querySelector('.show-tasks');


document.addEventListener('DOMContentLoaded', () => {
   const tasks = localStorage.getItem('tasks');

   try {
      JSON.parse(tasks);
   } catch {
      localStorage.clear();
   }

   // if a tasks key doesn't exist in local storage add an empty array to it
   if (!tasks) {
      localStorage.setItem('tasks', "[]");
   }
})

addEventListener('submit', e => {
   e.preventDefault();
   const task = e.target.elements[0].value;
   const tasks = JSON.parse(localStorage.getItem('tasks'));

   // checking if input isn't empty & input is unique
   if (tasks.find(t => t.toLowerCase() === task.toLowerCase())) {
      const alert = document.createElement('h3');
      alert.textContent = 'task already exists';
      tasksContainer.appendChild(alert);
   } else {
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      e.target.elements[0].value = '';
   }
});

showButton.addEventListener('click', () => {
   const tasksList = document.createElement('ol');
   const tasks = JSON.parse(localStorage.getItem('tasks'));

   tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.textContent = task;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'delete';
      taskItem.appendChild(deleteButton);

      tasksList.appendChild(taskItem);
   });

   tasksContainer.appendChild(tasksList);
});