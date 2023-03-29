const express = require('express');
const app = express();
const ejs = require('ejs');
const fetch = require('node-fetch');
const methodOverride = require('method-override');
var port = 5000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const client = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Cliente')
  const clientes = await client.json()
  res.render('home.ejs', { clientes });
});

app.get('/new', async (req, res) => {
  res.render('new.ejs');
});

app.get('/edit', async (req, res) => {

  const { id } = req.query;
  if (!id) res.redirect('/');

  const client = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Cliente/' + id);
  if (client.status === 404) res.redirect('/');
  const cliente = await client.json()


  res.render('edit.ejs', { cliente, id });
});

app.get('/view', async (req, res) => {

  const { id } = req.query;
  if (!id) res.redirect('/');

  const client = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Cliente/' + id);
  if (client.status === 404) res.redirect('/');
  const cliente = await client.json()


  res.render('view.ejs', { cliente, id });
});

app.post('/register', async function(req, res) {
  fetch('https://api-deslocamento.herokuapp.com/api/v1/Cliente', {
    method: 'POST',
    headers: {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'numeroDocumento': req.body.documento,
      'tipoDocumento': req.body.tipodocumento,
      'nome': req.body.nome,
      'logradouro': req.body.logradouro,
      'numero': req.body.numero,
      'bairro': req.body.bairro,
      'cidade': req.body.cidade,
      'uf': req.body.uf
    })
  });
  res.redirect('/')
})

app.put('/edit', async function(req, res) {
  fetch('https://api-deslocamento.herokuapp.com/api/v1/Cliente/' + req.body.id, {
    method: 'PUT',
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': req.body.id,
      'nome': req.body.nome,
      'logradouro': req.body.logradouro,
      'numero': req.body.numero,
      'bairro': req.body.bairro,
      'cidade': req.body.cidade,
      'uf': req.body.uf
    })
  });
  res.redirect('/')
})

app.delete('/delete', async function(req, res) {
  fetch('https://api-deslocamento.herokuapp.com/api/v1/Cliente/' + req.body.id, {
    method: 'DELETE',
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': req.body.id
    })
  });
  res.redirect('back')
})

app.listen(port, () => {
  console.log('servidor no ar em %s', port);
});