const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const vehicle = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Veiculo/')
  const vehicles = await vehicle.json()
  res.render('vehicles/home.ejs', { vehicles });
});

router.get('/new', async (req, res) => {
  res.render('vehicles/new.ejs');
});

router.get('/edit', async (req, res) => {

  const { id } = req.query;
  if (!id) res.redirect('/vehicles');

  const vehicle = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Veiculo/' + id);
  if (vehicle.status === 404) res.redirect('/vehicles');
  const vehicles = await vehicle.json()


  res.render('vehicles/edit.ejs', { vehicles, id });
});

router.get('/view', async (req, res) => {

  const { id } = req.query;
  if (!id) res.redirect('vehicles');

  const vehicle = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Veiculo/' + id);
  if (vehicle.status === 404) res.redirect('/vehicles');
  const vehicles = await vehicle.json()


  res.render('vehicles/view.ejs', { vehicles, id });
});

router.post('/new', async function(req, res) {
  fetch('https://api-deslocamento.herokuapp.com/api/v1/Veiculo', {
    method: 'POST',
    headers: {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "placa": req.body.placa,
      "marcaModelo": req.body.marcaModelo,
      "anoFabricacao": req.body.anoFabricacao,
      "kmAtual": req.body.kmAtual
    })
  });
  res.redirect('/vehicles')
});

router.put('/edit', async function(req, res) {
  fetch('https://api-deslocamento.herokuapp.com/api/v1/Veiculo/' + req.body.id, {
    method: 'PUT',
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': req.body.id,
      "marcaModelo": req.body.marcaModelo,
      "anoFabricacao": req.body.anoFabricacao,
      "kmAtual": req.body.kmAtual
    })
  });
  res.redirect('/vehicles');
});

router.delete('/delete', async function(req, res) {
  fetch('https://api-deslocamento.herokuapp.com/api/v1/Veiculo/' + req.body.id, {
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
});

module.exports = router;