// файл ./app.js
const express = require('express');
const mysql = require('mysql');
const config = require('./config');

const app = express();
const port = config.port;

app.use(express.json());

// Конфигурация подключения к базе данных
const dbConnection = mysql.createConnection(config.db.mysql);

// Подключение к базе данных
dbConnection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ' + err.stack);
    return;
  }
  console.log('Подключение к базе данных успешно установлено');
});


//получение
// Пример маршрута Express
app.get('/getTasks', (req, res) => {
  // Пример запроса к базе данных
  dbConnection.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.stack);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log('Результаты запроса:', results);
    res.json(results);
  });
});


//добавление
// Пример маршрута Express для добавления записи в таблицу tasks с указанным именем
app.post('/addTask', (req, res) => {
  // Получение имени задачи из тела запроса
  console.log('req.body: ', req.body);
  const taskName = req.body.name;

  // Проверка наличия имени задачи в теле запроса
  if (!taskName) {
    res.status(400).send('Не указано имя задачи');
    return;
  }

  // SQL-запрос для добавления записи с указанным именем в таблицу tasks
  const sqlQuery = `INSERT INTO tasks (name) VALUES ('${taskName}')`;

  // Выполнение SQL-запроса к базе данных
  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.stack);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log('Запись успешно добавлена в таблицу tasks');
    res.send('Запись успешно добавлена в таблицу tasks');
  });
});


//редактирование
// Пример маршрута Express для получения записи из таблицы tasks с указанным именем
app.put('/putTask', (req, res) => {
  // Получение задачи из тела запроса
  console.log('req.body: ', req.body);
  const taskName = req.body.name;
  const taskId = req.body.id;

  // Проверка наличия задачи в теле запроса
  if (!taskName) {
    res.status(400).send('Не указано имя задачи');
    return;
  }

  // SQL-запрос для изменения записи с указанным именем в таблицу tasks
  const sqlQuery = `UPDATE tasks SET name = '${taskName}' WHERE id = ${taskId}`;

  // Выполнение SQL-запроса к базе данных
  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.stack);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log('Запись успешно изменена в таблице tasks');
    res.send('Запись успешно изменена в таблице tasks');
  });
});


//удаление
app.delete('/deleteTask/:id', (req, res) => {
  // Получение идентификатора задачи из параметра запроса
  const taskId = req.params.id;
  
  // Проверка наличия идентификатора задачи в параметре запроса
  if (!taskId) {
  res.status(400).send('Не указан идентификатор задачи');
  return;
  }
  
  // SQL-запрос для удаления записи с указанным идентификатором из таблицы tasks
  const sqlQuery = `DELETE FROM tasks WHERE id = ${taskId}`;
  
  // Выполнение SQL-запроса к базе данных
  dbConnection.query(sqlQuery, (err, result) => {
  if (err) {
  console.error('Ошибка выполнения запроса: ' + err.stack);
  res.status(500).send('Ошибка сервера');
  return;
  }
  
  if (result.affectedRows === 0) {
  console.log('Запись с указанным идентификатором не найдена');
  res.status(404).send('Задача не найдена');
  return;
  }
  
  console.log('Запись успешно удалена из таблицы tasks');
  res.send('Запись успешно удалена из таблицы tasks');
  });
  });



// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});