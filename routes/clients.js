const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const client = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Cliente')
  const clientes = await client.json()
  res.render('clients/home.ejs', { clientes });
});

router.get('/new', async (req, res) => {
  res.render('clients/new.ejs');
});

router.get('/edit', async (req, res) => {

  const { id } = req.query;
  if (!id) res.redirect('/');

  const client = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Cliente/' + id);
  if (client.status === 404) res.redirect('/clients');
  const cliente = await client.json()


  res.render('clients/edit.ejs', { cliente, id });
});

router.get('/view', async (req, res) => {

  const { id } = req.query;
  if (!id) res.redirect('clients');

  const client = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Cliente/' + id);
  if (client.status === 404) res.redirect('/clients');
  const cliente = await client.json()


  res.render('clients/view.ejs', { cliente, id });
});

router.post('/new', async function(req, res) {
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
  res.redirect('/clients')
});

router.put('/edit', async function(req, res) {
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
  res.redirect('/clients')
});

router.delete('/delete', async function(req, res) {
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

module.exports = router;