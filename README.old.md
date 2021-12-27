# goit-react-hw-05-movies

# Критерии приема

-  Создан репозиторий `goit-react-hw-05-movies`
-  При сдаче домашней работы есть ссылки: на исходные файлы и рабочие страницы каждого проекта на
   `Netlify`
-  В состоянии компонентов хранится минимально необходимый набор данных, остальное вычисляется
-  При запуске кода задания, в консоли нету ошибок и предупреждений
-  Для каждого компонента есть отдельная папка с файлом React-компонента и файлом стилей
-  Для компонентов описаны `propTypes`
-  Все что компонент ожидает в виде пропов, передается ему при вызове
-  Имена компонентов понятные, описательные
-  JS-код чистый и понятный, используется `Prettier`
-  Стилизация выполнена `CSS-модулями` или `Styled Components`.

## Задание «Кинопоиск»

Создай базовую маршрутизацию для приложения поиска и хранения фильмов. Превью рабочего приложения
[смотри по ссылке](https://drive.google.com/file/d/1vR0hi3n1236Q5Bg4-se-8JVKD9UKSfId/view?usp=sharing).

## API themoviedb.org

Для бекенда используй [themoviedb.org API](https://www.themoviedb.org/). Необходимо зарегистриваться
(можно ввести произвольные данные) и получить API-ключ. В этой работе будут использоваться следующие
ендпоинты.

-  [/trending/get-trending](https://developers.themoviedb.org/3/trending/get-trending) список самых
   популярных фильмов на сегодня для создания коллекции на главной странице.
-  [/search/search-movies](https://developers.themoviedb.org/3/search/search-movies) поиск
   кинофильма по ключевому слову на странице фильмов.
-  [/movies/get-movie-details](https://developers.themoviedb.org/3/movies/get-movie-details) запрос
   полной информации о фильме для страницы кинофильма.
-  [/movies/get-movie-credits](https://developers.themoviedb.org/3/movies/get-movie-credits) запрос
   информации о актёрском составе для страницы кинофильма.
-  [/movies/get-movie-reviews](https://developers.themoviedb.org/3/movies/get-movie-reviews) запрос
   обзоров для страницы кинофильма.

[Ссылка на документацию](https://developers.themoviedb.org/3/getting-started/introduction)

## Маршруты

В приложении должны быть следующие маршруты. Если пользователь зашел по несуществующему маршруту,
его необходимо перенаправлять на домашнюю страницу.

-  `'/'` - компонент `<HomePage>`, домашняя страница со списком популярных кинофильмов.
-  `'/movies'` - компонент `<MoviesPage>`, страница поиска фильмов по ключевому слову.
-  `'/movies/:movieId'` - компонент `<MovieDetailsPage>`, страница с детальной информацией о
   кинофильме.
-  `/movies/:movieId/cast` - компонент `<Cast>`, информация о актерском составе. Рендерится на
   странице `<MovieDetailsPage>`.
-  `/movies/:movieId/reviews` - компонент `<Reviews>`, информация об обзорах. Рендерится на странице
   `<MovieDetailsPage>`.

## Code Splitting (разделение кода)

Добавь асинхронную загрузку JS-кода для маршрутов приложения используя `React.lazy()` и `Suspense`.

# React App.

_Создает React приложение в текущей папке:_

```bash
npx create-react-app .
```

_Создает React приложение в папке my-app:_

```bash
npx create-react-app my-app
```

# Настройка pre-commit хуков

## 1 - Установка зависимостей

Установить в проект следующие пакеты.

```bash
npm i -D prettier eslint
```

**В случае ошибки установить явно указать 7-ую версию: eslintv7.11.0 --->>**

```bash
npm i -D prettier eslint@7.11.0
```

## 2 - Инициализация lint-staged и husky

Пользователям **MacOS** и **Linux** систем необходимо выполнить в терминале следующую команду. Она
установит и настроит `husky` и `lint-staged` в зависимости от инструментов качества кода из
зависимостей проекта в `package.json`.

```bash
npx mrm lint-staged
```

_Пользователям **Windows** необходимо выполнить следующую команду. Она делает тоже самое:_

```bash
npx mrm@2 lint-staged
```

## 3 - Установка дополнительных зависимостей (npm-пакетов):

### -ESLint

**eslint-config-react** Набор самоуверенных правил ESLint (http://eslint.org) (включая все правила),
адаптированных для проектов React.

```bash
npm i -S eslint-config-react babel-eslint eslint-plugin-react
```

**eslint-config-react-app** Этот пакет включает общую конфигурацию ESLint, используемую приложением
Create React.

```bash
npm i -S eslint-config-react-app
```

### -Prop-types

Проверка типа во время выполнения для свойств React и подобных объектов.

```bash
npm i -S prop-types
```

### -Nano ID

Крошечный, безопасный, удобный для URL генератор уникальных строковых идентификаторов для
JavaScript.

```bash
npm i -D nanoid
```

### -Sass

Чтобы использовать Sass, установите **node-sass**:

```bash
npm i -S node-sass@6.0.0
```

### -Postcss-loader

Инструмент для преобразования стилей с помощью плагинов JS и PostCSS-loader для webpack.

```bash
npm i -S postcss-loader postcss
```

### -Modern-normalize

Сброс стилей. Нормализатор стилей.

```bash
npm i -S modern-normalize
```

```index.js
import 'modern-normalize/modern-normalize.css';
```

## 4 - Добавить npm скрипты в файл package.json:

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "deploy": "gh-pages -d build",
    "clean": "gh-pages-clean",
    "prepare": "husky install",
    "predeploy": "yarn build",
    ...
    "predeploy": "npm run build",
  },
```

## 5 - Интерграция плагинов

Ссылки на документацию по интеграции плагинов в популярные редакторы.

-  [Prettier editor integration](https://prettier.io/docs/en/editors.html)
-  [ESLint editor integration](https://eslint.org/docs/user-guide/integrations)

## 6 - Настройки VSCode

Для комфортной работы, после установки плагинов, нужно добавить несколько настроек редактора для
автосохранения и форматирования файлов.

```json
{
   "files.autoSave": "onFocusChange",
   "editor.formatOnSave": true,
   "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
   }
}
```

## 7 - Deployment на GitHub Pages

```bash
npm i -S gh-pages
```

**package.json**

```json
"homepage": "https://имя-профиля.github.io/имя-репозитория",
"scripts": {
+   "predeploy": "npm run build",
+   "deploy": "gh-pages -d build",
    "start": "react-scripts start",
},
```

_"homepage": "https://DimaLitvinenko.github.io/goit-react-hw-02-phonebook",_
