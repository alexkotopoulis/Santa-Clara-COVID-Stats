function covidRestTest() {
  var url = 'https://data.sccgov.org/resource/j2gj-bg6c.json';
  var observedZipcodes = ["95124", "95032", "95030", "95008", "95118"];
  let zipcodesMap = new Map();
  
  var dateToday =  Utilities.formatDate(new Date(), 'America/Los_Angeles', "MM/dd/yyyy hh:mm:ss") 

  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  Logger.log(response);
  var dataAll = JSON.parse(response.getContentText()); //
  
  var spreadsheetName = "COVID ZIP Hourly";
  var spreadsheetId = getIdFromName(spreadsheetName);
  
  fileList = DriveApp.getFilesByName(spreadsheetName)
  while (fileList.hasNext()) {
    spreadsheetId=fileList.next().getId();
  }
  
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
  sheet.insertRowAfter(1);
  var i=0;
  for (row in data){
    if ("95124" == data[i].zipcode) {    
      sheet.getRange(2, 1).setValue(dateToday);
      sheet.getRange(2, 2).setValue(data[i].zipcode);
      sheet.getRange(2, 3).setValue(data[i].cases);
      sheet.getRange(2, 4).setValue(data[i].population);
      sheet.getRange(2, 5).setValue(data[i].rate); 
    }
    i++;
  }  
}


function getIdFromName(spreadsheetName) {
   var spreadsheetId = null;
  
  fileList = DriveApp.getFilesByName(spreadsheetName)
  while (fileList.hasNext()) {
    spreadsheetId=fileList.next().getId();
    return spreadsheetId;
  }
  
  return null;
}
  
 

