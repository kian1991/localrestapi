/**
 * Wandelt HTML Table in folgendes json-Format um
 *
 *  table: {
        header: ['head1', 'head2', 'head3', 'head4'],
        data: [
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
        ],
    },
  };
 *
 * @param {*} table HTMLDom Table Element
 * @returns json-formatierte Tabelle
 */
const tableToJson = (table) => new Promise((resolve, reject) => {
  const header = table.tHead.rows[0].innerText.split('\t');

  // Prüfen ob in jeder "Header"-Spalte etwas geschrieben steht
  if (header.some((head) => !head)) reject(new Error('Bitte Kopfzeile vollständig füllen'));

  let data = [];
  Array.from(table.tBodies[0].rows).forEach((row) => {
    data.push(row.innerText.split('\t'));
  });
  // ID Spalte entfernen falls vorhanden
  if (header[0].toLowerCase() === 'id') {
    header.shift();
    data = data.map((el) => { el.shift(); return el; });
  }
  resolve({
    table: {
      data,
      header,
    },
  });
});

const csvToJson = (csvString) => new Promise((resolve, reject) => {
  // CSV auslesen
  const rows = csvString.split('\n');
  const header = rows.shift().split(',');
  const data = rows.map((row) => row.split(','));
  // CSV validieren (alle Zeilen müssen die gleiche länge haben)
  const invalid = (row) => row.length !== header.length;
  if (data.some(invalid)) {
    reject(new Error('CSV ist nicht korrekt formatiert'));
  }
  // CSV ist im richtigen format
  resolve({
    table: {
      header,
      data,
    },
  });
});

export { tableToJson, csvToJson };
