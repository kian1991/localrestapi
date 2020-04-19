// Components
const smallModalComponent = () => {
    return `
    <div class="modal main-border">
        <div class="modal-header">
            <input id="rows" type="number" min="1" value="1" onchange="rowColInputHandler();">
             X 
            <input id="cols" type="number" min="1" value="1" onchange="rowColInputHandler();">
            <div class="ml-auto">
                Pfad: /<input type="text">
            </div>
        </div>
        <div class="modal-content">
            <table id="modal-table">
            </table>
        </div>
        <div class="modal-footer">
            <button class="btn mt-auto" onclick="blur()">Speichern</button>
            <span id="modal-message" class="m-auto px-1 font-smaller"></span>
                <span class="btn align-center">
                    <label for="csv-upload">CSV Einlesen</label>
                    <input type="file" onchange="csvFileHandler();" id="csv-upload">
                </span>
        </div>
    </div>`;
};

export { smallModalComponent };