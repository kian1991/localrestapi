// Components
const smallModalComponent = () => `
    <div class="modal main-border">
        <div class="modal-header">
            <input id="modal-input-rows" type="number" min="1" value="1" onchange="rowColInputHandler();">
             X 
            <input id="modal-input-cols" type="number" min="1" value="1" onchange="rowColInputHandler();">
            <div class="ml-auto">
                Pfad: /<input id="modal-input-name" type="text">
            </div>
        </div>
        <div class="modal-content">
            <table id="modal-table">
            </table>
        </div>
        <div class="modal-footer">
            <button class="btn mt-auto" onclick="blur(); saveButtonHandler();">Speichern</button>
            <span id="modal-message" class="m-auto px-1 font-smaller"></span>
                <span class="btn align-center">
                    <label for="csv-upload">CSV Einlesen</label>
                    <input type="file" onchange="csvFileHandler();" id="csv-upload">
                </span>
        </div>
    </div>`;

const entryComponent = (name, headerArray) => {
  // JSON aus dem headerArray Formen
  let json = {};
  // ID entfernen falls vorhanden
  if (headerArray[0].toLowerCase() === 'id') headerArray.shift();
  headerArray.forEach((head) => {
    json[head] = 'wert';
  });
  // json in String umwandeln und 'Pretty-Printen'
  json = JSON.stringify(json, null, 2);

  return `
    <div class="entry-header unselectable" onclick="entryHeaderClickHandler(this)">
        <span>/${name}</span>
    </div>
    <div class="entry-content mt-1" style="display: none;">
        <table class="entry-table">
            <thead>
                <th>Methode</th>
                <th>Pfad</th>
                <th>Beschreibung</th>
            </thead>
            <tbody>
                <tr>
                    <td>GET</td>
                    <td>/api/${name}</td>
                    <td>
                        <p>Abrufen aller Einträge</p>
                    </td>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/api/${name}?[spaltenname]=[wert]</td>
                    <td>
                        <p>Abrufen bestimmter Einträge mit Wert</p>
                    </td>
                </tr>
                <tr>
                    <td>POST</td>
                    <td>/api/${name}</td>
                    <td>
                        <p>Hinzufügen neuer Einträge mit JSON-Body: <br>
                            <pre>
${json}    
                            </pre>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>DELETE</td>
                    <td>/api/${name}?[spaltenname]=[wert]</td>
                    <td>
                        <p>Löschen bestimmter Einträge mit Wert</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="entry-footer" style="display: none">
        <button class="btn mr-auto my-1" onclick="entryTableButtonHandler('${name}')" >Tabelle</button>
        <button class="btn ml-auto my-1" onclick="entryDeleteButtonHandler('${name}')" >Löschen</button>
    </div>
    `;
};

export { smallModalComponent, entryComponent };
