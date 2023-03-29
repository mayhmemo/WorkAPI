const express = require('express');
const app = express();
const ejs = require('ejs');
const fetch = require('node-fetch');
const methodOverride = require('method-override');
var port = 5000;

const clientsRouter = require('./routes/clients');
const conductorsRouter = require('./routes/conductors');
const vehiclesRouter = require('./routes/vehicles');
const displacementsRouter = require('./routes/displacements');


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  res.render('home.ejs');
});

app.use('/clients', clientsRouter);
app.use('/conductors', conductorsRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/displacements', displacementsRouter);

app.listen(port, () => {
  console.log('servidor no ar em %s', port);
});