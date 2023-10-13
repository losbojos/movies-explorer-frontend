# Movies-explorer. Поиск и сохранение карточек любимых фильмов.

[ Домашняя страница (демо)](https://lifemovie.nomoreparties.co "https://lifemovie.nomoreparties.co")

## Описание

Данный проект выполнялся в рамках дипломной работы на курсе "Веб-разработчик" от Я.Практикум. 
В проекте можно зарегистрироваться и воспользоваться поиском по имеющейся базе карточек кинофильмов, сохранять понравившиеся\любимые фильмы в списке избранных.

На входе было фиксированное ТЗ и дизайн-макет в Figma. Используется внешний API для первоначального получения списка фильмов с описанием, изображениями и ссылками на трейлер. Остальной функционал реализован с использованием своей серверной части с БД и REST API. 

Стек технологий: React, Express.js, MongoDB. 
Деплой на серверных ресурсах Yandex.Cloud, веб-сервер Nginx.

Продукт включает в себя главную страницу (лэндинг), страницы регистрации и авторизации, форму редактирования профиля, страницы поиска фильмов и отмеченных любимых фильмов. 
Адаптивная верстка под разные экраны.

## Ссылки

### Репозитории (исходный код)

+ [frontend](https://github.com/losbojos/movies-explorer-frontend)
+ [backend](https://github.com/losbojos/movies-explorer-api)
+ [Дизайн (вариант dark-4)](https://www.figma.com/file/6FMWkB94wE7KTkcCgUXtnC/light-1?type=design&node-id=1-9662&mode=design&t=NGK34yb7P31H0KQj-0)

### Деплой

+ [Домашняя страница (демо)](https://lifemovie.nomoreparties.co)
+ [API сервера](https://api.lifemovie.nomoreparties.co)

## Инструкции

### Развертывание

Для работы с репозиторием на вашем компьютере потребуется Git, React, Node.js, MongoDB. Установите данные пакеты.

### Развертывание сервера

Смотрите на [странице серверной части проекта](https://github.com/losbojos/movies-explorer-api)

### Развертывание клиента (фронтенд)

1. Склонируйте или скачайте архивом и распакуйте [исходный код фронт-енда](https://github.com/losbojos/movies-explorer-frontend.git)
2. Откройте папку с исходным кодом в Visual Studio Code.
3. Откройте окно терминала и запустите в корневой папке проекта команду установку зависимостей
```bash
$ npm install
```
4. Измените значение константы MAIN_SERVER в файле ./src/utils/consts.js для подключения к необходимому серверу:
```bash
const MAIN_SERVER = 'http://localhost:3003';
```
5. Запустите приложение командой. Автоматически откроется страница в браузере.
```bash
$ npm start
```
6. Регистрируйтесь в приложении и пользуйтесь.

### Доступные страницы (роуты)

+ "/"             - Главная страница (лэндинг)
+ "/signin"       - Вход (логин)
+ "/signup"       - Регистрация
+ "/movies"       - Список фильмов
+ "/saved-movies" - Сохраненные фильмы
+ "/profile"      - Профиль пользователя
+ "/404"          - Страница не найдена

### Редактирование профиля

Для выхода из режима редактирования нажать Esc.

## Используемые техники и технологии

+ БЭМ методология и структура файлов
+ Семантические элементы
+ Классы и псевдоклассы
+ Флексбокс-вёрстка
+ Адаптивная верстка и использование медиазапросов
+ Всплывающие формы (popup), валидация форм
+ Javascript и DOM
+ Работа с API сервера
+ Асинхронность
+ React и JSX, Декларативный подход и функциональные компоненты
+ React Context
+ Регистрация и авторизация пользователей
+ Работа с jwt-токеном
+ Защищенные роуты
+ Бэкенд: Express.js, MongoDB, REST API, Nginx.

## Планы по развитию
Проект в рамках дипломной работы завершен, но есть планы в дальнейшем модифицировать его для практического применения:
+ Заменить внешнее API на собственную базу фильмов, чтобы не зависеть от внешних сервисов.
+ Добавить интеграцию с популярными сервисами поиска фильмов, например kinopoisk.
+ Добавить возможность пользователям добавлять новые фильмы.
