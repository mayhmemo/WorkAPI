const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const displacement = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/')
  const displacements = await displacement.json()
  res.render('displacements/home.ejs', { displacements });
});

router.get('/new', async (req, res) => {
  res.render('displacements/new.ejs');
});

router.get('/edit', async (req, res) => {

  const { id } = req.query;
  if (!id) res.redirect('/displacements');

  const displacement = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/' + id);
  if (displacement.status === 404) res.redirect('/displacements');
  const displacements = await displacement.json()


  res.render('displacements/edit.ejs', { displacements, id });
});

router.get('/view', async (req, res) => {

  const { id } = req.query;
  if (!id) res.redirect('displacements');

  const displacement = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/' + id);
  if (displacement.status === 404) res.redirect('/displacements');
  const displacements = await displacement.json()


  res.render('displacements/view.ejs', { displacements, id });
});

router.post('/new', async function(req, res) {
  fetch('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento', {
    method: 'POST',
    headers: {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "kmInicial": req.body.kmInicial,
      "inicioDeslocamento": req.body.inicioDeslocamento,
      "checkList": req.body.checkList,
      "motivo": req.body.motivo,
      "observacao": req.body.observacao,
      "idCondutor": req.body.idCondutor,
      "idVeiculo": req.body.idVeiculo,
      "idCliente": req.body.idCliente
    })
  });
  res.redirect('/displacements')
});

router.put('/edit', async function(req, res) {
  fetch('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/' + req.body.id + '/EncerrarDeslocamento/', {
    method: 'PUT',
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': req.body.id,
      "observacao": req.body.observacao,
      "kmFinal": req.body.kmFinal,
      "fimDeslocamento": req.body.fimDeslocamento
    })
  });
  res.redirect('/displacements');
});

router.delete('/delete', async function(req, res) {
  fetch('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/' + req.body.id, {
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