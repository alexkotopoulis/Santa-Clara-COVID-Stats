/**
 * Pull current stats from Santa Clara County Health site and store it into a Google Sheet: 
 * COVID ZIP: List of new case statistics per selected ZIP
 */
function saveCovidStats() {
  let zipcodesMap = new Map();
  
  var dateToday =  Utilities.formatDate(new Date(), 'America/Los_Angeles', "MM/dd/yyyy") 

  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  Logger.log(response);
  var dataAll = JSON.parse(response.getContentText());
  var zipList = getZips();
  var zipCount = zipList.length;
  
  /*
  var spreadsheetName = "COVID ZIP History";
  var spreadsheetId = getIdFromName(spreadsheetName);
  var doc = null;

  
  if (null != spreadsheetId) {
    doc = SpreadsheetApp.openById(spreadsheetId)
  } else {
    doc = SpreadsheetApp.create(spreadsheetName);
    var sheet = doc.getActiveSheet();
    sheet.getRange(1, 1).setValue("date");
    sheet.getRange(1, 2).setValue("zipcode");
    sheet.getRange(1, 3).setValue("cases");
    sheet.getRange(1, 4).setValue("population");
    sheet.getRange(1, 5).setValue("rate");    
  }
    
  var sheet = doc.getActiveSheet();
  var data = dataAll;
  sheet.insertRowsAfter(1, data.length);
  var i=0;

  for (row in data){
    sheet.getRange(i+2, 1).setValue(dateToday);
    sheet.getRange(i+2, 2).setValue(data[i].zipcode);
    sheet.getRange(i+2, 3).setValue(data[i].cases);
    sheet.getRange(i+2, 4).setValue(data[i].population);
    sheet.getRange(i+2, 5).setValue(data[i].rate);
    
    if (zipList.includes(data[i].zipcode)) {
      zipcodesMap[data[i].zipcode] = data[i].cases;
    }
    i++;   
  }
  */
  
  var newSheet = false;
  var covidName = "COVID ZIP";
  var covidId = getIdFromName(covidName);
  if (null != covidId) {
    docCovid = SpreadsheetApp.openById(covidId);
  } else {
    docCovid = buildSheet(covidName);
    newSheet = true;
  }
  
  var sheetCovid = docCovid.getActiveSheet();
  
  if (newSheet) {
    addFirstRow(sheetCovid, zipCount);
  } else {
     sheetCovid.insertColumnAfter(5);
     addNewRow(sheetCovid, zipCount);
  }
  
  // Copy from 7th column, all rows for one column and paste to 6th colum  
  // var range = sheetCovid.getRange(1, 7, 13, 1);
  // range.copyTo(sheetCovid.getRange(1, 6, 13, 1), {contentsOnly:false});
  
  sheetCovid.getRange(4, 6).setValue(dateToday);
  for (i=0;i<zipList.length;i++){  
    sheetCovid.getRange(5+i, 6).setValue(zipcodesMap[zipList[i]]);
  }
}

/**
* Get ID for spreadsheet from spreadsheet name. 
* Will return the first spreadsheet that matches the name or null if none matches.
*/
function getIdFromName(spreadsheetName) {
   var spreadsheetId = null;
  
  fileList = DriveApp.getFilesByName(spreadsheetName)
  while (fileList.hasNext()) {
    spreadsheetId=fileList.next().getId();
    return spreadsheetId;
  }
  
  return null;
}

function getZips() {
  var zips=[];
  for (i=0;i<observedZipcodes.length;i++){
    zips.push(observedZipcodes[i].zip);
  }
  return zips;
}

