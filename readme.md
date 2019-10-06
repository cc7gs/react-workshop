> 本仓库是学习 frontendMaster react-v5学习笔记

** 可以根据我提交记录去查看相关内容

[原仓库地址](https://github.com/btholt/complete-intro-to-react-v5)
[原文档地址](https://btholt.github.io/complete-intro-to-react-v5)
# parcel    
## install
```js
npm install -g parcel-bundler
```
`.babelrc`
```js
{
    "presets": ["@babel/preset-react", "@babel/preset-env"]
  }
```
## use

`src/index.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adopt me</title>
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <div id="root">not rendered  </div>
    <script src="./app.js"></script>
</body>

</html>
```
`app.js`
```js
import React from 'react'
import ReactDOM from 'react-dom'
import SearchParams from './SearchParams'

const App = () => {
  return (
    <div>
        hello world
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById("root"));

```
`package.json`
```js
"scripts": {
    "clear-build-cache": "rm -rf .cache/ dist/",
    "dev": "parcel src/index.html --port 3000 ",
    "format": "prettier --write \"src/**/*.{js,jsx}\"",
  },
```
> npm run dev


# css in js
use emotion.js,document click [here](https://emotion.sh/docs/install)

## install

```js
npm install --save @emotion/core @emotion/babel-preset-css-prop

```
.babelrc
```js
{
  "presets": [
    "@babel/preset-react",
    "@babel/preset-env",
    [
      "@emotion/babel-preset-css-prop",
      {
        "sourceMap": false
      }
    ]
  ],
}
```
## use
```js
import React from 'react'
import { css,keyframes } from '@emotion/core'
import { Link } from '@reach/router'

const Spin=keyframes`
    to {
        transform:rotate(360deg);
    }
`;

export default function NavBar() {
    return (
        <header css={css`
        background-color:#333;
        position:sticky;
        top:0;
        `}>
            <Link to="/">Adopt Me!</Link>
            <span 
            css={css`
                animation:1s ${Spin} linear infinite;
                font-size:60px;
            `}
            aria-label="logo" 
            role="img"> 🐩</span>
        </header>
    )
}

```
** vscode 下载 `styled-components`插件

# typescipt

> npm i typescript -D
> npx tsc --init //init ts config