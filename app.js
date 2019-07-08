const form = document.querySelector('.task-form');
const showButton = document.querySelector('.show-button');
const tasksContainer = document.querySelector('.show-tasks');

// tasks array
const tasks = [];

addEventListener('submit', e => {
   e.preventDefault();
   const task = e.target.elements[0].value;
   tasks.push(task);
});

showButton.addEventListener('click', () => {
   const tasksList = document.createElement('ol');

   tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.innerText = task;
      tasksList.appendChild(taskItem);
   });

   tasksContainer.appendChild(tasksList);
});