const form = document.querySelector('.form-container');
const tasksContainer = document.querySelector('.tasks-container');
const tasksList = document.querySelector('.tasks-list');

// call functions once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
   checkLocalStorage();
   showTasks();
   addTask();
   deleteTask();
});

// clear local storage if tasks key cannot be parsed. Create empty array if tasks doesnt is null
const checkLocalStorage = () => {
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
}

// display all tasks
const showTasks = () => {
   const tasks = JSON.parse(localStorage.getItem('tasks'));

   tasks.forEach(task => {
      tasksList.appendChild(createTaskElement(task));
   });

   tasksContainer.appendChild(tasksList);
};

// add task to local storage and display it
const addTask = () => {
   form.addEventListener('submit', e => {
      e.preventDefault();
      const task = e.target.elements[0].value;
      const tasks = JSON.parse(localStorage.getItem('tasks'));

      // if input isn't unique then alert user
      if (tasks.find(t => t.toLowerCase() === task.toLowerCase())) {
         const alert = document.createElement('div');
         alert.textContent = 'task already exists';
         alert.className = "alert alert-warning w-50 m-auto";
         tasksList.appendChild(alert);
      } else {
         tasks.push(task);
         localStorage.setItem('tasks', JSON.stringify(tasks));
         tasksList.appendChild(createTaskElement(task));
         e.target.elements[0].value = '';
      }
   });
}

// create a list element for a task.
const createTaskElement = (task) => {
   const taskItem = document.createElement('li');
   taskItem.textContent = task;
   taskItem.classList.add("list-group-item", "w-50", "ml-auto", "mr-auto", "mb-1");

   const deleteIcon = document.createElement('i');
   deleteIcon.className = 'fas fa-trash-alt delete';
   taskItem.appendChild(deleteIcon);

   return taskItem;
};

// delete task from local storage and DOM.
const deleteTask = () => {
   tasksList.addEventListener('click', e => {
      if (e.target.className.includes('delete')) {
         const task = e.target.parentElement.textContent;

         // remove from local storage
         const tasks = JSON.parse(localStorage.getItem('tasks'));
         tasks.splice(tasks.indexOf(task), 1);
         localStorage.setItem('tasks', JSON.stringify(tasks));

         // remove from DOM
         tasksList.removeChild(e.target.parentElement);
      }
   });
}








