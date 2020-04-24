import {
    pageInit,
    rowColInputHandler,
    csvFileHandler,
    entryHeaderClickHandler,
} from './modules/handler.js';

// Seiteninitialisierung (Hinzufügen von EventListenern etc.)
pageInit();
// Windowmethoden hinzufügen
window.rowColInputHandler = rowColInputHandler;
window.csvFileHandler = csvFileHandler;
window.entryHeaderClickHandler = entryHeaderClickHandler;