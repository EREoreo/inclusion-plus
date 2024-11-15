// routes/materials.js
const express = require('express');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Mock data (замените на базу данных)
let materials = [];

// Получить все материалы
router.get('/', authenticateToken, (req, res) => {
  res.json(materials);
});

// Добавить материал
router.post('/', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).send('Forbidden');
  }

  const { title, description, file_url } = req.body;
  const newMaterial = {
    id: materials.length + 1,
    title,
    description,
    file_url,
    created_at: new Date(),
  };

  materials.push(newMaterial);
  res.status(201).json(newMaterial);
});

// Редактировать материал
router.put('/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).send('Forbidden');
  }

  const materialId = parseInt(req.params.id);
  const { title, description } = req.body;

  const materialIndex = materials.findIndex((m) => m.id === materialId);
  if (materialIndex === -1) {
    return res.status(404).send('Material not found');
  }

  materials[materialIndex] = {
    ...materials[materialIndex],
    title,
    description,
  };

  res.json(materials[materialIndex]);
});

// Удалить материал
router.delete('/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).send('Forbidden');
  }

  const materialId = parseInt(req.params.id);
  const materialIndex = materials.findIndex((m) => m.id === materialId);
  if (materialIndex === -1) {
    return res.status(404).send('Material not found');
  }

  materials.splice(materialIndex, 1);
  res.status(204).send();
});

module.exports = router;
