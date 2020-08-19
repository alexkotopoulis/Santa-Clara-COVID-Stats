function buildSheet(spreadsheetName) {
  //var spreadsheetName = "COVID ZIP2"

  var spreadsheetId = getIdFromName(spreadsheetName);
  var doc = null;
  if (null != spreadsheetId) {
    Logger.log("id:"+spreadsheetId);
    DriveApp.getFileById(spreadsheetId).setTrashed(true);
  }

  doc = SpreadsheetApp.create(spreadsheetName);
  var sheet = doc.getActiveSheet();
  sheet.getRange(2, 2).setFontSize(18).setValue("Cambrian-Campbell-Los Gatos COVID Cases");
  
  sheet.getRange(4, 2).setValue("ZIP Code");
  sheet.getRange(4, 3).setValue("Population");
  sheet.getRange(4, 4).setValue("Cases/1 mil");
  
  var zipCount=observedZipcodes.length;
  
  for (i=0;i<observedZipcodes.length;i++){
   
    sheet.getRange(5+i,2).setValue(observedZipcodes[i].zip);
    sheet.getRange(5+i,3).setValue(observedZipcodes[i].pop);
    sheet.getRange(5+i,4).setNumberFormat("#,###").setFormula("=index(A"+(5+i)+":AT"+(5+i)+",1,6)*1000000/C"+(5+i));
    sheet.getRange(5+i,5).setValue(observedZipcodes[i].zip);
    Logger.log(i+" "+observedZipcodes[i]+" "+observedZipcodes[i].zip);
  }
  
  sheet.getRange(5+zipCount,2).setValue("New cases")
  sheet.getRange(6+zipCount,2).setValue("5 day average")
  sheet.getRange(7+zipCount,2).setValue("New/1 mil")
  sheet.getRange(8+zipCount,2).setValue("Sum")
  sheet.getRange(8+zipCount,3).setFormula("=sum(OFFSET(C5,0,0,"+zipCount+"))")
  var row = 8+zipCount;
  sheet.getRange(row,4).setFormula("=index(A"+row+":AT"+row+",1,6)*1000000/C"+row);
  

  sheet.getRange("R4C2:R"+row+"C6").setBorder(true, true, true, true, true, true, "black",null);
  sheet.getRange("R4C2:R4C6").setBackground("#aaaaaa"); 
  sheet.setColumnWidth(1, 30);  
  sheet.setColumnWidth(2, 100);
  sheet.setColumnWidth(3, 80);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 70);
  sheet.setColumnWidth(6, 50);
  
  return doc;

}


function addFirstRow(sheet, zipCount) {
  Logger.log("addFirstRow");
  sheet.getRange(5+zipCount,6).setValue(0);
  sheet.getRange(8+zipCount,6).setNumberFormat("#,###").setFormula("=sum(F5:F"+(4+zipCount)+")");
  
  sheet.getRange("R4C6:R"+(8+zipCount)+"C6").setBorder(true, true, true, true, true, true, "black",null);
  sheet.getRange("R4C6").setBackground("#aaaaaa"); 
}

function addNewRow(sheet, zipCount) {
  Logger.log("addNewRow");
  addFirstRow(sheet, zipCount);
  
  sheet.getRange(5+zipCount,6).setNumberFormat("#,###").setFormula("=F"+(8+zipCount)+"-G"+(8+zipCount));
  sheet.getRange(6+zipCount,6).setNumberFormat("#,###").setFormula("=AVERAGE(F"+(5+zipCount)+":J"+(5+zipCount)+")");
  sheet.getRange(7+zipCount,6).setNumberFormat("#,###").setFormula("=F"+(5+zipCount)+"*1000000/$C"+(8+zipCount));
}
