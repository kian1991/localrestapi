import { smallModalComponent } from './components.js';
import { csvToJson } from './util.js';

const modalTableManipulator = (rows, cols, tableData = undefined) => {
    const table = document.getElementById('modal-table');

    // Zeilen und Spalten respektive der Zeilen und Spalten der Tabellendaten
    if (tableData) {
        // alte Tabelle zurücksetzen, falls vorhanden
        if (table.tHead) {
            table.tHead.innerHTML = '';
            table.tBodies[0].innerHTML = '';
        }

        rows = tableData.table.data.length + 1; // +1 wegen header
        cols = tableData.table.header.length;
        // Eingabefelder modifizieren
        document.getElementById('rows').value = rows;
        document.getElementById('cols').value = cols;
    }

    // Funktionen zur erstellung editierbarer Zellen
    const getEditableHeadCell = (cellValue = '') => {
        const th = document.createElement('th');
        th.contentEditable = true;
        th.innerText = cellValue;
        return th;
    };
    const getEditableCell = (cellValue = '') => {
        const td = document.createElement('td');
        td.contentEditable = true;
        td.innerText = cellValue;
        return td;
    };

    // Prüfen ob Tabelle bereits Daten enthält
    if (table.tHead && !tableData) {
        // Tabelle enthält bereits Daten
        // also nur entsprechende Zeilen oder Spalten hinzufügen
        const rowDiff = rows - table.rows.length; // Differenz kann negativ oder positiv sein (löschen/hinzufügen)
        const colDiff = cols - table.rows[0].cells.length;

        // Zeilen
        if (rowDiff > 0) {
            // Hinzufügen
            for (let rowIndex = 0; rowIndex < rowDiff; rowIndex++) {
                // Wenn nicht erste Zeile, dann zum body hinzufügen
                let row =
                    rows > 1 ? table.tBodies[0].insertRow() : table.tHead.insertRow();
                for (let colIndex = 0; colIndex < cols; colIndex++) {
                    row.appendChild(getEditableCell());
                }
            }
        } else if (rowDiff < 0) {
            // Entfernen
            let oldRowCount = table.rows.length - 1;
            let newRowCount = table.rows.length - Math.abs(rowDiff) - 1;
            for (let rowIndex = oldRowCount; rowIndex > newRowCount; rowIndex--) {
                table.deleteRow(rowIndex);
            }
        }

        // Spalten - hier ist der Tabellenkopf zu beachten
        if (colDiff > 0) {
            // hinzufügen
            for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
                let row = table.rows[rowIndex];
                rowIndex === 0 ?
                    row.appendChild(getEditableHeadCell()) :
                    row.appendChild(getEditableCell());
            }
        } else if (colDiff < 0) {
            // entfernen
            const oldColCount = table.rows[0].cells.length - 1;
            const newColCount = table.rows[0].cells.length - Math.abs(colDiff) - 1;
            for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
                let row = table.rows[rowIndex];
                for (let colIndex = oldColCount; colIndex > newColCount; colIndex--) {
                    row.deleteCell(colIndex);
                }
            }
        }
        return;
    }

    // Neue Elemente anlegen
    const tBody = document.createElement('tbody');
    const tHead = document.createElement('thead');

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        // Erste Zeile ist der Tabellenkopf
        let row = rowIndex === 0 ? tHead.insertRow() : tBody.insertRow();
        for (let colIndex = 0; colIndex < cols; colIndex++) {
            // Erste Zeile ist der Tabellenkopf
            rowIndex === 0 ?
                row.appendChild(
                    getEditableHeadCell(
                        tableData ? tableData.table.header[colIndex] : ''
                    ) // Falls Tabellendaten vorhanden sind, diese einfügen
                ) :
                row.appendChild(
                    getEditableCell(
                        tableData ? tableData.table.data[rowIndex - 1][colIndex] : ''
                    )
                );
        }
    }
    // Die kreirten Elemente (tbody, thead) der Tabelle hinzufügen
    table.appendChild(tHead);
    table.appendChild(tBody);
};

const modalMessageReset = () => {
    const modalMessage = document.getElementById('modal-message');
    modalMessage.classList.remove(['color-error', 'color-message']);
    modalMessage.innerText = '';
};

const modalMessageError = (message) => {
    const modalMessage = document.getElementById('modal-message');
    modalMessage.classList.add('color-error');
    modalMessage.innerText = message;
};

const modalMessageSuccess = (message) => {
    const modalMessage = document.getElementById('modal-message');
    modalMessage.classList.add('color-success');
    modalMessage.innerText = message;
};

const entryHeaderClickHandler = (entryHeader) => {
    const entryElement = entryHeader.parentElement;
    // Tabelle und Footer einblenden
    let contentElement = entryElement.getElementsByClassName('entry-content')[0];
    let footerElement = entryElement.getElementsByClassName('entry-footer')[0];

    if (contentElement.style.display === 'none') {
        contentElement.style.display = 'flex';
        footerElement.style.display = 'flex';
    } else {
        contentElement.style.display = 'none';
        footerElement.style.display = 'none';
    }
};

const rowColInputHandler = () => {
    // Elemente vom DOM
    const rowInput = document.getElementById('rows');
    const colInput = document.getElementById('cols');
    // Eingabe Validation

    // Funktions ausführung
    modalTableManipulator(rowInput.value, colInput.value);
};

const csvFileHandler = () => {
    const input = document.getElementById('csv-upload');
    input.files[0]
        .text()
        .then((text) => {
            return csvToJson(text);
        })
        .then((json) => {
            modalTableManipulator(0, 0, json);
            modalMessageReset(); // Fehler -  falls vorhanden - zurücksetzen
        })
        .catch((err) => {
            modalMessageError(err);
        });
};

const closeModal = () => {
    const modal = document.querySelector('.modal-container');
    document.body.removeChild(modal);
};

const pageInit = () => {
    window.addEventListener('click', (event) => {
        if (event.target.classList.value.includes('modal-container')) {
            closeModal();
        }
    });

    document.getElementById('newEndpoint').addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('modal-container');
        modal.innerHTML = smallModalComponent();
        document.body.append(modal);
    });
};

export {
    pageInit,
    closeModal,
    entryHeaderClickHandler,
    rowColInputHandler,
    csvFileHandler,
};