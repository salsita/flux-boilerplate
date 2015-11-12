import express from 'express';

const server = express();
server.use('/', express.static('dist/client'));
server.get('/hello', (req, res) => res.json({hello: true}));
server.listen(process.env.PORT || 3000);
