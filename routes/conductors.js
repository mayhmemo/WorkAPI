const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const conductor = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Condutor/')
  const conductors = await conductor.json()
  res.render('conductors/home.ejs', { conductors });
});

router.get('/new', async (req, res) => {
  res.render('conductors/new.ejs');
});

router.get('/edit', async (req, res) => {

  const { id } = req.query;
  if (!id) res.redirect('/conductors');

  const conductor = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Condutor/' + id);
  if (conductor.status === 404) res.redirect('/conductors');
  const conductors = await conductor.json()


  res.render('conductors/edit.ejs', { conductors, id });
});

router.get('/view', async (req, res) => {

  const { id } = req.query;
  if (!id) res.redirect('conductors');

  const conductor = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Condutor/' + id);
  if (conductor.status === 404) res.redirect('/conductors');
  const conductors = await conductor.json()


  res.render('conductors/view.ejs', { conductors, id });
});

router.post('/new', async function(req, res) {

  fetch('https://api-deslocamento.herokuapp.com/api/v1/Condutor', {
    method: 'POST',
    headers: {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "nome": req.body.nome,
      "numeroHabilitacao": req.body.numeroHabilitacao,
      "categoriaHabilitacao": req.body.categoriaHabilitacao,
      "vencimentoHabilitacao": req.body.vencimentoHabilitacao
    })
  });
  res.redirect('/conductors')
});

router.put('/edit', async function(req, res) {
  fetch('https://api-deslocamento.herokuapp.com/api/v1/Condutor/' + req.body.id, {
    method: 'PUT',
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': req.body.id,
      'categoriaHabilitacao': req.body.categoriaHabilitacao,
      // por algum motivo misterioso a atribuição acima não funciona para a API
      'vencimentoHabilitacao': req.body.vencimentoHabilitacao
    })
  });
  res.redirect('/conductors');
});

router.delete('/delete', async function(req, res) {
  fetch('https://api-deslocamento.herokuapp.com/api/v1/Condutor/' + req.body.id, {
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