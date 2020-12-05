const { Router } = require('express');

const { adminController } = require('../controllers');
const { clientController } = require('../controllers');

const router = new Router();

// Administrative Routen um Tabellen anzulegen/löschen
router.get('/admin/table', adminController.getTableNames);
router.get('/admin/table/*', adminController.getTable);
router.put('/admin/table', adminController.createTable);
router.delete('/admin/table', adminController.deleteTable);

// Clientrouten mit generischem Inhalt (kann "searchquery" beinhalten)
router.get('/api/*', clientController.getContent);
router.post('/api/*', clientController.createContent);
router.delete('/api/*', clientController.deleteContent);

module.exports = router;
