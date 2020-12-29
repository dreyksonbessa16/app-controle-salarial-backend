const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool

router.get('/salario', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error })}
        conn.query(
            "SELECT * FROM cliente;",
            (error, results) => {
              conn.release();
              if (error) {return res.status(500).send({ error: error })}
              return res.status(200).send({
                results
              });
            }
          );
    });
});

router.post('/salario', (req, res, next) => {
  mysql.getConnection((error, conn) => {
      if (error) {return res.status(500).send({ error: error })}
      conn.query(
          "update cliente set salario = ?;",
          (error, results) => {
            conn.release();
            if (error) {return res.status(500).send({ error: error })}
            return res.status(200).send({
              mensagem: 'Salário atualizado com sucesso'
            });
          }
        );
  });
});

router.get('/timeline', (req, res, next) => {
  mysql.getConnection((error, conn) => {
      if (error) {return res.status(500).send({ error: error })}
      conn.query(
          `SELECT id, nome, valor, descricao, tipo, cor, date_format(data,'%d/%m/%Y') as data, cliente_id 
          FROM timeline where cliente_id = 1 order by id desc;`,
          (error, results) => {
            conn.release();
            if (error) {return res.status(500).send({ error: error })}

            return res.status(200).send({
              results
            });
          }
        );
  });
});

router.post('/timeline', (req, res, next) => {
  mysql.getConnection((error, conn) => {
      console.log('Erro chegou aki00');
      if (error) {return res.status(500).send({ error: error })}
      console.log('Erro chegou aki01');
      conn.query(
          `insert into timeline
          (nome, valor, descricao, tipo, cor, data, cliente_id)
          values (?, ?, ?, ?, ?, date(now()), 1);`,
          [req.body.nome, req.body.valor, req.body.descricao, req.body.tipo, req.body.cor],
          (error, results) => {
            if (error) {return res.status(400).send({ error: error })}
            return res.status(200).send({
                mensagem: 'Inserido com sucesso'
            });
          }
        );
  });
});

router.put('/salario', (req, res, next) => {
  mysql.getConnection((error, conn) => {
      if (error) {return res.status(500).send({ error: error })}
      conn.query(
          `update cliente set salario = ? where id=1;`,
          [req.body.salario],
          (error, results) => {
            if (error) {return res.status(400).send({ error: error })}
            return res.status(200).send({
                mensagem: 'Salario atualizado com sucesso'
            });
          }
        );
  });
});




module.exports = router;