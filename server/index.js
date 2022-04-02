const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/data/array') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify([
        {
          name: 'John',
          age: 30,
        },
        {
          name: 'Adam',
          age: 19,
        },
      ]),
    );
  } else if (req.url === '/data/object') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        name: 'John',
        age: 30,
      }),
    );
  } else if (req.url === '/data/object/nested') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        bath: true,
        bedrooms: 4,
        kitchen: {
          amenities: ['oven', 'stove', 'washer'],
          area: 20,
          wallColor: 'white',
        },
        personal: [
          { name: 'Mike', age: 29 },
          { name: 'Luke', age: 23 },
        ],
      }),
    );
  } else if (req.url === '/data/array/empty') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([]));
  } else if (req.url === '/data/object/empty') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({}));
  } else if (req.url === '/data/null') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(null));
  } else if (req.url === '/404') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  } else if (req.url === '/201') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ created: 'successful' }));
  } else if (req.url === '/401') {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Unauthorized' }));
  } else if (req.url === '/403') {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Forbidden' }));
  } else if (req.url === '/500') {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  } else if (req.url === '/redirect') {
    res.writeHead(302, {
      Location: '/demo',
    });
    res.end();
  } else if (req.url === '/demo') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Demo page!</h1>');
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Location', 'http://localhost:3000/');
    res.end('<h1>Hello, World!</h1>');
  }
});

server.listen(port, () => console.log(`Server running at port ${port}`));
