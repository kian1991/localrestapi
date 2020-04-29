const {Router} = require('express');

const {adminController} = require('../controllers');
const {clientController} = require('../controllers');

const router = new Router();

// Administrative Routen um Tabellen anzulegen/löschen
router.get('/admin/table', adminController.getTableNames);
router.put('/admin/table', adminController.createTable);
router.delete('/admin/table', adminController.deleteTable);

// Clientrouten mit generischem Inhalt (kann "searchquery" beinhalten)
router.get('/*', clientController.getContent);
router.put('/*', clientController.createContent);
router.delete('/*', clientController.deleteContent);

module.exports = router;
