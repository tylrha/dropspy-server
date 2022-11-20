<h1 align="center">
  Dropspy server
</h1>

<p align="center">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/lucasvtiradentes/dropspy-server.svg">
  <a href="https://github.com/lucasvtiradentes/dropspy-server/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lucasvtiradentes/dropspy-server.svg">
  </a>

  <a href="https://github.com/lucasvtiradentes/dropspy-server/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/lucasvtiradentes/dropspy-server.svg">
  </a>

</p>

<p align="center">
  <a href="#information_source-description">Description</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="#information_source-features">Features</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-edit-it">How to edit it?</a>
</p>

## :information_source: Description

This is the website build for visualize the information collected by all the [dropspy](https://github.com/lucasvtiradentes/dropspy) bots about the spied [shopify stores](https://www.shopify.com/) and stored in a [mongoDB](https://www.mongodb.com/).

<div align="center" style="text-align: center;">
  <table>
    <tr>
      <th>Desktop</th>
      <th>Mobile</th>
    </tr>
    <tr>
      <td align="center"><img src="https://i.giphy.com/media/Rktxs8rU3wiXeHDV7Z/giphy.webp"></td>
      <td align="center"><img height="200" src="https://i.giphy.com/media/yb3lz7HdXw48uQz9OJ/giphy.webp">
      </td>
    </tr>
  </table>
</div>

## :information_source: Features

- [x] Handle user authentication: register and login with users;
- [x] Add and controlls which store must be spied;
- [x] Sort tables and charts acording to the selected filter;
- [x] Admin panel to display database statistics;

## :information_source: Technologies

This project uses the following technologies:

<div align="center" style="text-align: center;">
  <table>
    <tr>
      <th>Scope</th>
      <th>Technologies</th>
    </tr>
    <tr>
      <td>engine</td>
      <td align="center">
        <a target="_blank" href="https://nodejs.org"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <td>main</td>
      <td align="center">
        <a target="_blank" href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"></a>
        <a target="_blank" href="https://expressjs.com/pt-br/"><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"></a>
      </td>
    </tr>
    <tr>
      <td>secondary</td>
      <td align="center">
        <a target="_blank" href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"></a>
        <a target="_blank" href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <td>dev tools</td>
      <td align="center">
        <a target="_blank" href="https://editorconfig.org/"><img src="https://img.shields.io/badge/editorconfig-gray?style=for-the-badge&logo=editorconfig&logoColor=white"></a>
      </td>
    </tr>
  </table>
</div>

## :information_source: How to edit it

To clone this repository and make changes in the source code, you'll need [Git](https://git-scm.com) and  [Nodejs](https://nodejs.org/en/) in your computer.

```bash
# Clone this repository
$ git clone https://github.com/lucasvtiradentes/dropspy-server

# Go into the repository folder
$ cd dropspy-server

# Install dependencies
$ npm install

# Run the code in devlopment mode
$ npm run dev
```

To build the production code, run the following code:

```bash
# Clone this repository
$ npm run build

# Run the code in production mode
$ npm run start
```

---

Made with ♥ by Lucas Vieira.

Get it touch: [github](https://github.com/lucasvtiradentes) | [linkedin](https://www.linkedin.com/in/lucasvtiradentes) | lucasvtiradentes@gmail.com
