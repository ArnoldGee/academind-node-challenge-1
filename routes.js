const fs = require('fs');

let user = "";

const serverRouter = (req, res) => {
  const {url, method} = req;
  switch (url) {
    case '/users':
      res.setHeader('Content-Type', 'text/html');
      res.write(`
        <html>
          <head>
            <title>List of users</title>
          </head>
          <body>
            <h1>List of users</h1>
            <ul>
              <li>Knuckles</li>
              <li>Seymour</li>
              <li>Pingu</li>
              <li>Carlos Matos</li>
              <li>Pepe</li>
              <li>${user}</li>
            </ul>
          </body>
        </html>
      `);
      return res.end();

    case '/create-user':
      if (method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
          body.push(chunk);
        });
        return req.on('end', () => {
          user = Buffer.concat(body).toString().split('=')[1];
          console.log(user);
          res.statusCode = 302;
          res.setHeader('Location', '/users');
          return res.end()
        })
      } else {
        res.statusCode = 302;
        res.setHeader('Location', '/users');
        return res.end()
      }

    default:
      res.setHeader('Content-Type', 'text/html');
      res.write(`
        <html>
          <head>
            <title>Create your username</title>
          </head>
          <body>
            <h1>What's your username</h1>
            <form action="/create-user" method="POST">
              <input type="text" name="user">
              <button type="submit">Send</button>
            </form>
          </body>
        </html>
      `);
      return res.end();
  }
};

module.exports = serverRouter;
