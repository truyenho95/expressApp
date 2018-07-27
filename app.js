const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }
];
const bookRouter = require('./src/routes/bookRouter')(nav);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views/index.html'));
  res.render(
    'index',
    {
      title: 'Library',
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }
      ]
    }
  );
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
