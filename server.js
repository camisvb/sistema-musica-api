const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ==========================================
// ROTAS - ARTISTAS
// ==========================================

// GET /artistas - Listar todos os artistas
app.get('/artistas', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM artistas');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET /artistas/:id - Buscar artista por ID
app.get('/artistas/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM artistas WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Artista não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// POST /artistas - Cadastrar novo artista
app.post('/artistas', async (req, res) => {
  const { nome, genero, pais } = req.body;
  if (!nome || !genero || !pais) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos: nome, genero e pais.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO artistas (nome, genero, pais) VALUES (?, ?, ?)',
      [nome, genero, pais]
    );
    res.status(201).json({ id: result.insertId, nome, genero, pais });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// PUT /artistas/:id - Atualizar artista
app.put('/artistas/:id', async (req, res) => {
  const { nome, genero, pais } = req.body;
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'UPDATE artistas SET nome = ?, genero = ?, pais = ? WHERE id = ?',
      [nome, genero, pais, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Artista não encontrado' });
    }

    res.json({ id: Number(id), nome, genero, pais });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE /artistas/:id - Excluir artista
app.delete('/artistas/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM artistas WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Artista não encontrado' });
    }
    res.json({ mensagem: 'Artista excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// ==========================================
// ROTAS - ÁLBUNS
// ==========================================

// GET /albuns - Listar todos os álbuns
app.get('/albuns', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM albuns');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET /albuns/:id - Buscar álbum por ID
app.get('/albuns/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM albuns WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Álbum não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// POST /albuns - Cadastrar novo álbum
app.post('/albuns', async (req, res) => {
  const { titulo, ano_lancamento, artista_id } = req.body;
  if (!titulo || !ano_lancamento || !artista_id) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos: titulo, ano_lancamento e artista_id.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO albuns (titulo, ano_lancamento, artista_id) VALUES (?, ?, ?)',
      [titulo, ano_lancamento, artista_id]
    );
    res.status(201).json({ id: result.insertId, titulo, ano_lancamento, artista_id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// PUT /albuns/:id - Atualizar álbum
app.put('/albuns/:id', async (req, res) => {
  const { titulo, ano_lancamento, artista_id } = req.body;
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'UPDATE albuns SET titulo = ?, ano_lancamento = ?, artista_id = ? WHERE id = ?',
      [titulo, ano_lancamento, artista_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Álbum não encontrado' });
    }

    res.json({ id: Number(id), titulo, ano_lancamento, artista_id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE /albuns/:id - Excluir álbum
app.delete('/albuns/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM albuns WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Álbum não encontrado' });
    }
    res.json({ mensagem: 'Álbum excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// ==========================================
// ROTAS - MÚSICAS
// ==========================================

// GET /musicas - Listar todas as músicas
app.get('/musicas', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM musicas');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET /musicas/:id - Buscar música por ID
app.get('/musicas/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM musicas WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Música não encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// POST /musicas - Cadastrar nova música
app.post('/musicas', async (req, res) => {
  const { titulo, duracao, album_id } = req.body;
  if (!titulo || !duracao || !album_id) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos: titulo, duracao e album_id.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO musicas (titulo, duracao, album_id) VALUES (?, ?, ?)',
      [titulo, duracao, album_id]
    );
    res.status(201).json({ id: result.insertId, titulo, duracao, album_id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// PUT /musicas/:id - Atualizar música
app.put('/musicas/:id', async (req, res) => {
  const { titulo, duracao, album_id } = req.body;
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'UPDATE musicas SET titulo = ?, duracao = ?, album_id = ? WHERE id = ?',
      [titulo, duracao, album_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Música não encontrada' });
    }

    res.json({ id: Number(id), titulo, duracao, album_id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE /musicas/:id - Excluir música
app.delete('/musicas/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM musicas WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Música não encontrada' });
    }
    res.json({ mensagem: 'Música excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// ==========================================
// ROTA EXTRA - CONSULTA COM JOIN
// ==========================================

// GET /musicas-completas - Retorna todos os dados cruzados
app.get('/musicas-completas', async (req, res) => {
  const querySQL = `
    SELECT 
      musicas.id, 
      musicas.titulo AS musica, 
      musicas.duracao, 
      albuns.titulo AS album,
      albuns.ano_lancamento, 
      artistas.nome AS artista, 
      artistas.genero, 
      artistas.pais
    FROM musicas
    INNER JOIN albuns ON musicas.album_id = albuns.id
    INNER JOIN artistas ON albuns.artista_id = artistas.id
  `;

  try {
    const [rows] = await db.query(querySQL);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor a rodar em: http://localhost:${PORT}`);
});