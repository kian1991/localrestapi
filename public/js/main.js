import {
    pageInit,
    rowColInputHandler,
    csvFileHandler,
} from './modules/handler.js';

// Seiteninitialisierung (Hinzufügen von EventListenern etc.)
pageInit();
// Windowmethoden hinzufügen
window.rowColInputHandler = rowColInputHandler;
window.csvFileHandler = csvFileHandler;

export {};