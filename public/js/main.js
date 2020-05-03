import {
  pageInit,
  rowColInputHandler,
  csvFileHandler,
  entryHeaderClickHandler,
  saveButtonHandler,
  entryDeleteButtonHandler,
  entryTableButtonHandler,
} from './modules/handler.js';

// Seiteninitialisierung (Hinzufügen von EventListenern etc.)
pageInit();
// Windowmethoden hinzufügen
window.saveButtonHandler = saveButtonHandler;
window.rowColInputHandler = rowColInputHandler;
window.csvFileHandler = csvFileHandler;
window.entryHeaderClickHandler = entryHeaderClickHandler;
window.entryDeleteButtonHandler = entryDeleteButtonHandler;
window.entryTableButtonHandler = entryTableButtonHandler;
