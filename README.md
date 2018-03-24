[![Build Status](https://travis-ci.org/lsnq/shri-homework-04-06.svg?branch=master)](https://travis-ci.org/lsnq/shri-homework-04-06)

### ШРИ. Домашнее задание 04
Установка:
````
yarn
````
Запуск среды:
````
yarn start:dev
````

##### Заметки (в основном для себя)
1.1 Чтобы heroku собирал Dockerfile по heroku.yml вместо деплоя сурсов из репозитория, жизненно необходимо указать 
stack - container. В случае работы с pipeline имя приложения указывается явно.
```
heroku stack:set -a <APP_NAME> container
```

1.2 Иногда, если прочитать документацию чуть внимательнее, можно сэкономить пару дней.