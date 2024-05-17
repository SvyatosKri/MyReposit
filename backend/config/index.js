// файл ./backend/config/index.js
const fs = require('fs');

const config = {
	db: {
    mysql : {
      host: 'db-mysql-fra1-51752-do-user-9208055-0.c.db.ondigitalocean.com',
      user: 'user18', // замените на своего пользователя
      database: 'db18', // можете заменить 'appdb' на свое название базы данных
      password: 'AVNS_xcF1zFZZIwArlwnKBJw', // замените это на пароль от своего пользователя
      port: 25060, // порт базы данных
			ssl: {
			  ca: fs.readFileSync('ca-certificate-test.crt'), // Путь к файлу ca.crt
			}
    },
  }, 
  port: 3000, // порт на котором будет запущен сервер приложения
  jwtSecret: 'secretkey' // Секретный ключ для подписи и верификации JWT токенов, вы его либо сами генерируете, либо сами придумываете
};

module.exports =  config;