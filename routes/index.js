const express = require('express');

const { adminController } = require('../controllers');

const router = express.Router();

// Administrative Routen um Tabellen anzulegen/löschen
router.get('/admin/table', adminController.getTableNames);
router.put('/admin/table', adminController.createTable);
router.delete('/admin/table', adminController.deleteTable);

// Clientrouten mit generischem Inhalt

module.exports = router;