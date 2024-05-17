// файл ./frontend/script.js

// Функция для загрузки задач с сервера
function loadTasks() {
	// Предполагаем, что сервер запущен на localhost:3000
	// Также предполагаем, что у вас метод получения всех задач называется getTasks и находится на данном пути
  fetch('http://localhost:3000/getTasks')
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.id + ' ' + task.name;
        taskList.appendChild(li);
      });
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

// Функция для удаления задачи с сервера
function deleteTask(taskid) {
  fetch(`http://localhost:3000/deleteTask/${taskid}`, {
    method: 'DELETE', headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      loadTasks(); // После добавления задачи перезагружаем список задач
    })
    .catch(error => console.error('Error deliting task:', error));
}

// Функция для изменения задачи
function editTask(taskId, taskName) {
  fetch('http://localhost:3000/putTask', {
    method: 'PUT', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({ id: taskId, name: taskName })
  })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      loadTasks(); // После изменения задачи перезагружаем список задач
    })
    .catch(error => console.error('Error editing task:', error));
}

// Функция для добавления задачи
function addTask(taskName) {
  fetch('http://localhost:3000/addTask', {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({name: taskName})
  })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      loadTasks(); // После добавления задачи перезагружаем список задач
    })
    .catch(error => console.error('Error adding task:', error));
  }

// Обработчик события удаления формы
document.getElementById('taskdelete').addEventListener('submit', function (event) {
  event.preventDefault(); // Предотвращаем перезагрузку страницы
  const taskInput = document.getElementById('taskInput1');
  const taskid = taskInput.value.trim();
  if (taskid !== '') {
    deleteTask(taskid); // Вызываем функцию удаления задачи
    taskInput.value = ''; // Очищаем поле ввода
  }
});

// Обработчик события изменения формы
document.getElementById('taskedit').addEventListener('submit', function (event) {
  event.preventDefault(); // Предотвращаем перезагрузку страницы
  const taskInput = document.getElementById('taskInput3');
  const taskName = taskInput.value.trim();
  const taskInput1 = document.getElementById('taskInput2');
  const taskid = taskInput1.value.trim();
  if (taskName !== '') {
    editTask(taskid, taskName); // Вызываем функцию изменения задачи
    taskInput.value = ''; // Очищаем поле ввода
    taskInput1.value = '';
  }
});

// Обработчик события отправки формы
document.getElementById('taskForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Предотвращаем перезагрузку страницы
  const taskInput = document.getElementById('taskInput');
  const taskName = taskInput.value.trim();
  if (taskName !== '') {
    addTask(taskName); // Вызываем функцию добавления задачи
    taskInput.value = ''; // Очищаем поле ввода
  }
});


document.addEventListener('DOMContentLoaded', () => {
  // Обработка формы входа
  document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      localStorage.setItem('token', data.token); // Сохранение токена в localStorage
      alert('Вы успешно вошли');
    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('Ошибка при входе');
    }
  });

  // Обработка формы регистрации
  document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername, pass: newPassword })
      });
      alert('Пользователь успешно зарегистрирован');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Ошибка при регистрации');
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (token) {
    // Пользователь аутентифицирован, делаем что-то...
    // Например, получаем данные пользователя или показываем защищенные части приложения
    // Вы можете отправить запрос на /profile маршрут для получения данных о пользователе
    // Или просто показать определенные элементы интерфейса, доступные только аутентифицированным пользователям
  } else {
    // Пользователь не аутентифицирован, показываем форму входа и/или регистрации
    // Например:
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'block';
  }
});


// После загрузки страницы сразу загружаем задачи
loadTasks();
