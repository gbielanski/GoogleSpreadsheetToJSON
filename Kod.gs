var SECTOR_TYPE_IDX = 0;
var TERM_IDX = 1;
var TYPE_IDX = 2;

var SECTOR_TYPE_GREEN = "green";
var SECTOR_TYPE_BLUE = "blue";
var SECTOR_TYPE_YELLOW = "yellow";

var keys = ["sectorTerm", "term", "type"];

function onOpen(){  
    SpreadsheetApp.getUi()
      .createMenu('GarbageApp')
      .addItem('Export JSON Data', 'exportJSONData')
      .addToUi();
}

function exportJSONData(e){
  // Step 1 
  var rowsData = getRowsData_();
  // Step 2
  var html = HtmlService
      .createTemplateFromFile('Index');
  html.json = makeJSON_(rowsData);
  // Step 3
  SpreadsheetApp.getUi()
      .showModalDialog(html.evaluate(), 'Exported JSON');
}

function getRowsData_(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var dataRange = sheet.getRange(1, 1, sheet.getMaxRows(), 3);
  var data  = dataRange.getValues();
  var green = [];
  var blue = [];
  var yellow = [];
  var objects = {};
  for(var i = 0; i < data.length; i++){
    var object = {};
    object[keys[TERM_IDX]] = data[i][TERM_IDX];
    object[keys[TYPE_IDX]] = data[i][TYPE_IDX];
 
    switch(data[i][SECTOR_TYPE_IDX]) {
      case SECTOR_TYPE_GREEN:
        green.push(object);
        break;
      case SECTOR_TYPE_BLUE:
        blue.push(object);
        break;
      case SECTOR_TYPE_YELLOW:
        yellow.push(object);
        break;
      default:
          }

  }
  objects[SECTOR_TYPE_GREEN] = green;
  objects[SECTOR_TYPE_BLUE] = blue;
  objects[SECTOR_TYPE_YELLOW] = yellow;
  return objects;
}

function makeJSON_(rowsData) {
  var jsonString = JSON.stringify(rowsData, null, 2);
  return jsonString;
}

function isCellEmpty_(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}


