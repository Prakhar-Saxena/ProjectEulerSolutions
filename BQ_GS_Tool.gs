//06.06.16
//added function runBigQuery2 to append results in spreadsheet
//28.11.15
//shifted var manual=true in function onOpen- need to confirm if this will cause any issues
//changed functionName in function onOpen to start with 'tool.' so that functions can run from this library without being on the deployment sheet - working
//01.12.15
//added function runBigQueryPostprocess
//09.12.15
//added function runBigQueryDates

//v2.0
//v2.1 fixed a bug in uploader (trim the line)

//Add menu option
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ 
    {name: 'RunThisSheet', functionName: 'tool.RunThisSheet'}, 
    {name: 'RunAllSheets', functionName: 'tool.RunAllSheets'}, 
    {name: 'MailAlerts', functionName: 'tool.alert_mail'}    
  ];
  ss.addMenu('DataQuery', menuEntries);
}

var scheduled=false;    
function scheduledRefresh() {
  scheduled=true;
  RunAllSheets();
  alert_mail();
}

var runall=false;
function RunAllSheets() {
  runall=true;
  var startTime= (new Date()).getTime();
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  
  //var str="";
  //for (var i = 0; i < sheets.length; ++i) { str=str+sheets[i].getName(); } 
  //Browser.msgBox(str); 
  
  
  //if we are first - color all as a start, if we are following-up - scip it  Palette - https://docs.google.com/document/d/1breDq1nz0CFwZxMV--duGkFyXumm2remdoSV9YTQu-U/edit
  if (sheets[0].getRange("A1").getBackground()!='#d3a5ba' && sheets[0].getRange("A1").getBackground()!='#b5d5a8') {
    for (var i = 0; i < sheets.length; ++i) { sheets[i].getRange("A1").setBackground('#d3a5ba');}
  }
  
  //iterate through all sheets - only run not coloured2 sheets and mark them later
  for (var i = 0; i < sheets.length; ++i) {
    if (sheets[i].getRange("A1").getBackground()=='#d3a5ba') {
      RunThisSheet(sheets[i]);
      sheets[i].getRange("A1").setBackground('#b5d5a8');
    }
    
    var currTime = (new Date()).getTime();
    if(currTime - startTime >= 1000*60*4) { //4 min limit    
      if (scheduled) {
        ScriptApp.newTrigger("scheduledRefresh").timeBased().at(new Date(currTime+1000*60*5)).create();
      } else {         
        var template = HtmlService.createTemplate('This script was running for too long. <br> Google script limit is 5 minutes. <br> Please select and run DataQuery/RunAllSheets again till all A1 cells are back to white colour.');
        var page = template.evaluate();
        SpreadsheetApp.getUi().showSidebar(page);
      }
      return;
    }
  }
  
  //we are done - clean up sheets colouring
  for (var i = 0; i < sheets.length; ++i) { sheets[i].getRange("A1").setBackground("white"); } 
}


function alert_mail() {
 var sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Alerts");
 if (sheet != null) {
  var end = sheet.getLastRow();
  for (var i = 2; i <= end; ++i) {
    if (sheet.getRange(i,1).getValue() >= 1) {
      var emailAddress = sheet.getRange(i,2).getValue();
      var subject = sheet.getRange(i,3).getValue();
      var message = sheet.getRange(i,4).getValue();
      var message2 = sheet.getRange(i,6).getValue();     //testing 15.03.15
      var message3 = sheet.getRange(i,8).getValue();     //testing 15.03.15      
      var data_range = sheet.getRange(i,5).getValue();   //testing 27.12.15
      var data_range2 = sheet.getRange(i,7).getValue();  //testing 15.03.15
        if(data_range==''){
          MailApp.sendEmail(emailAddress, subject, message)}
        else{
            var data = sheet.getRange(data_range).getValues();
            var columns = sheet.getRange(data_range).getNumColumns();
            var fullmessage = message+"<br><br><TABLE style='border-collapse:collapse;'border = 2 cellpadding = 3 >";
              for( var row in data ) {
                fullmessage+="<tr>"
                for(var col = 0; col < columns; col++){
                  var cell=data[row][col]==''?'':data[row][col];
                  fullmessage+="<td align='right'>"+cell+"</td>"
                  }
                fullmessage+="</tr>"
              }
              fullmessage+="</table>";
          
            if(message2 == ''){
              MailApp.sendEmail(emailAddress,subject, "", {htmlBody: fullmessage})}
            else{
                fullmessage+="<br>"+message2
                if(data_range2 == ''){
                    MailApp.sendEmail(emailAddress,subject, "", {htmlBody: fullmessage})}
                else{
                    var data2 = sheet.getRange(data_range2).getValues();
                    var columns2 = sheet.getRange(data_range2).getNumColumns();
                    fullmessage += "<br><br><TABLE style='border-collapse:collapse;'border = 2 cellpadding = 3 >";
                    for( var row in data2 ) {
                        fullmessage+="<tr>"
                        for(var col = 0; col < columns2; col++){
                            var cell=data2[row][col]==''?'':data2[row][col];
                                fullmessage+="<td align='right'>"+cell+"</td>"
                            }
                            fullmessage+="</tr>"
                        }
                        fullmessage+="</table>";
                    if(message3 == ''){
                        MailApp.sendEmail(emailAddress,subject, "", {htmlBody: fullmessage})}
                    else{
                        fullmessage+="<br>"+message3
                        MailApp.sendEmail(emailAddress,subject, "", {htmlBody: fullmessage})}
                        
    }
   }
  }
 }
}
}
}


function RunThisSheet(sheet) {

  if (sheet == null) {sheet=SpreadsheetApp.getActiveSheet();}
  var flag=sheet.getRange("A1").getValue();
  if (flag == "BigQuery") {runBigQuery(sheet);}
  if (flag == "BigQuery2") {runBigQuery2(sheet);}
  if (flag == "WN") {runWN(sheet);}
  if (flag == "GA") {runGA(sheet);}
  if (flag == "BigQueryCreate") {runBigQueryCreate(sheet);}
  if (flag == "BigQueryUpload") {runBigQueryUpload(sheet);}
  if (flag == "BigQueryAppend") {runBigQueryAppend(sheet);} //testing
  if (flag == "AdSense") {runAdSense(sheet);}
  if (flag == "AdXSeller") {runAdXSeller(sheet);}
  if (flag == "BigQueryPostprocess") {runBigQueryPostprocess(sheet);}                     //testing
  if (flag == "BigQueryTableDates") {runBigQueryDates(sheet);}                            //testing
  if (sheet.getRange("G1").getValue() == "Export") {exportResult(sheet);}
  
  if (typeof RunSpecialKeywords === "function") { RunSpecialKeywords(sheet, scheduled); } //to add keywords in code.gs section 
  //EXAMPLE
  //function RunSpecialKeywords(sheet) {
  //if (sheet == null) {sheet=SpreadsheetApp.getActiveSheet();}
  //var flag=sheet.getRange("A1").getValue();
  //if (flag == "BigQueryTableDates") {runBigQueryDates(sheet);}
  //}
   
  if (!runall) {Browser.msgBox("Finished this sheet - " + sheet.getSheetName());}
}


function runBigQuery(sheet) {
  var projectNumber = '1022153460529'; //BigQuery credentials
  var sql = sheet.getRange("B1").getValue();
  var queryResults;
  var resource = { query: sql };
  
  try {
    queryResults = BigQuery.Jobs.query(resource, projectNumber);
    var jobId = queryResults.jobReference.jobId; 
  }
  catch (err) {
    if (scheduled) {
      MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
    } else {      
      Browser.msgBox(err);     
    }
    return;
  } 
  
  var sleepTimeMs = 500; // Check on status of the Query Job every 500Ms.
  while (!queryResults.jobComplete) {
    try {
      Utilities.sleep(sleepTimeMs);
      sleepTimeMs *= 2;
      queryResults = BigQuery.Jobs.getQueryResults(projectNumber, jobId);
    }
    catch (err) {
      if (scheduled) {
        MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
      } else {      
        Browser.msgBox(err);     
      }
      return;
    } 
  }
  
  if(sheet.getRange("D1").getValue() > 0) { sheet.getRange(4,1,sheet.getLastRow(),sheet.getRange("D1").getValue()).clearContent(); } //clear sheet
  
  var resultCount = queryResults.getTotalRows();
  if(resultCount==0) {
    Browser.msgBox("Query returned no results");
    return;
  }
  
  var resultSchema = queryResults.getSchema();
  var headers = [];
  for (var x in resultSchema.fields) { headers.push(resultSchema.fields[x].name); } //parce headers
  var headers_array=[headers]; //convert to 2 dimentional
  sheet.getRange(3, 1, 1, headers.length).setValues(headers_array);
  
  var resultValues = new Array(resultCount);
  var tableRows = queryResults.getRows();
  for (var i = 0; i < tableRows.length; i++) {   // Iterate through query results
    var cols = tableRows[i].getF();
    resultValues[i] = new Array(cols.length); // For each column, add values to the result array
    for (var j = 0; j < cols.length; j++) {
      resultValues[i][j] = cols[j].getV();
    }
  } 
  
  sheet.getRange(4, 1, resultCount, tableRows[0].getF().length).setValues(resultValues);  // Update the Spreadsheet with data from the resultValues array

  sheet.getRange('F1').setValue(new Date());   //Set "Last updated" date 
}


function runBigQuery2(sheet) {
  var projectNumber = '1022153460529'; //BigQuery credentials
  var sql = sheet.getRange("B1").getValue();
  var queryResults;
  var resource = { query: sql };
  
  try {
    queryResults = BigQuery.Jobs.query(resource, projectNumber);
    var jobId = queryResults.jobReference.jobId; 
  }
  catch (err) {
    if (scheduled) {
      MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
    } else {      
      Browser.msgBox(err);     
    }
    return;
  } 
  
  var sleepTimeMs = 500; // Check on status of the Query Job every 500Ms.
  while (!queryResults.jobComplete) {
    try {
      Utilities.sleep(sleepTimeMs);
      sleepTimeMs *= 2;
      queryResults = BigQuery.Jobs.getQueryResults(projectNumber, jobId);
    }
    catch (err) {
      if (scheduled) {
        MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
      } else {      
        Browser.msgBox(err);     
      }
      return;
    } 
  }
  
  //if(sheet.getRange("D1").getValue() > 0) { sheet.getRange(4,1,sheet.getLastRow(),sheet.getRange("D1").getValue()).clearContent(); } //clear sheet
  
  var resultCount = queryResults.getTotalRows();
  if(resultCount==0) {
    Browser.msgBox("Query returned no results");
    return;
  }
  
  var resultSchema = queryResults.getSchema();
  var headers = [];
  for (var x in resultSchema.fields) { headers.push(resultSchema.fields[x].name); } //parce headers
  var headers_array=[headers]; //convert to 2 dimentional
  sheet.getRange(3, 1, 1, headers.length).setValues(headers_array);
  
  var resultValues = new Array(resultCount);
  var tableRows = queryResults.getRows();
  for (var i = 0; i < tableRows.length; i++) {   // Iterate through query results
    var cols = tableRows[i].getF();
    resultValues[i] = new Array(cols.length); // For each column, add values to the result array
    for (var j = 0; j < cols.length; j++) {
      resultValues[i][j] = cols[j].getV();
    }
  } 
  
  sheet.getRange(sheet.getLastRow()+1, 1, resultCount, tableRows[0].getF().length).setValues(resultValues);  // Update the Spreadsheet with data from the resultValues array

  sheet.getRange('F1').setValue(new Date());   //Set "Last updated" date 
}


//v.1.0.3 improved speed
function runWN(sheet) {
  sheet.getRange(1,6).clearContent();
  sheet.getRange(1,7).clearContent();
  i = 0;
  while (sheet.getRange(1,6).getValue() == "") {
  try {
  var conn = Jdbc.getConnection("jdbc:mysql://enigma-elb-1.bezurk.org:60333/wegonomics", "gurls", "go w3g0 gurls!"); //WN credentials
  var start = new Date();
  var stmt = conn.createStatement();
  var sql = sheet.getRange("B1").getValue();
  var queryResults = stmt.executeQuery(sql);

  if(sheet.getRange("D1").getValue() > 0) { sheet.getRange(4,1,sheet.getLastRow(),sheet.getRange("D1").getValue()).clearContent(); } //clear sheet
  
  var numCols = queryResults.getMetaData().getColumnCount();
  var headers = [];
  for (var col = 1; col <= numCols; col++) { headers.push(queryResults.getMetaData().getColumnName(col)); } //parce headers
  var headers_array=[headers]; //convert to 2 dimentional
  sheet.getRange(3, 1, 1, headers.length).setValues(headers_array);
  
  //convert JDBC queryResults object into array
  var arrayResults = [];
  var row = 0;
  while (queryResults.next()) {
    var line = [];
    for (var col = 1; col <= numCols; col++) {
      line.push(queryResults.getString(col));
    }
    arrayResults.push(line); //
    row++;
  }   
  
  sheet.getRange(4,1,arrayResults.length,numCols).setValues(arrayResults); //paste results into sheet
  
  queryResults.close();
  stmt.close();
  conn.close();
  
  sheet.getRange('F1').setValue(new Date());   //Set "Last updated" date 
  }
   catch (err) {
//    Logger.log(err);
//    Browser.msgBox(err);
//    return;
sheet.getRange(1,7).setValue(err.message);
  }
    i++
  sheet.getRange(1,8).setValue(i+" retry");
  }
}

//v1.0.2 changed exporting logic 
function exportResult(sheet) { 
  var url=sheet.getRange("H1").getValue();
  var sheetName=sheet.getRange("I1").getValue();
  var mainDoc=SpreadsheetApp.getActiveSpreadsheet();
  var exportDoc=SpreadsheetApp.openByUrl(url);
  if (mainDoc.getSheetByName("Temp_copy") != null) { mainDoc.getSheetByName("Temp_copy").setName("Temp_copy"+Date()); } //if Temp_copy exists - delete it
  
  var tempSheet=mainDoc.insertSheet("Temp_copy");
  
  var values=sheet.getRange(2,1,sheet.getLastRow()-1,sheet.getLastColumn()).getValues();
  tempSheet.getRange(1,1,sheet.getLastRow()-1,sheet.getLastColumn()).setValues(values);
  
  //if sheet exists in export doc - rename it (can't delete if it is the only sheet there)  
  if (exportDoc.getSheetByName(sheetName) != null) { var existingSheet=exportDoc.getSheetByName(sheetName).setName(sheetName+Date()); }     
  
  tempSheet.copyTo(exportDoc).setName(sheetName);  
  mainDoc.deleteSheet(tempSheet);
  if (existingSheet != null) { exportDoc.deleteSheet(existingSheet); } //remove existing sheet if it existed and was renamed
}


function runGA(sheet) {
  var startDate = Utilities.formatDate(sheet.getRange("C2").getValue(), Session.getScriptTimeZone(),'yyyy-MM-dd');
  var endDate = Utilities.formatDate(sheet.getRange("D2").getValue(), Session.getScriptTimeZone(),'yyyy-MM-dd');
  var tableId  = sheet.getRange("B2").getValue();
  var metric = sheet.getRange("E2").getValue();
  var op_str = sheet.getRange("F2").getValue();
  var options = JSON.parse(op_str);
  var report = Analytics.Data.Ga.get(tableId, startDate, endDate, metric, options);
  if (report.rows) {
    if(sheet.getRange("H1").getValue() > 0) { sheet.getRange(4,1,sheet.getLastRow(),sheet.getRange("H1").getValue()).clearContent(); } //clear sheet
    
    var headers = [];
    for (var x in report.columnHeaders) { headers.push(report.columnHeaders[x].name); } //parce headers
    var headers_array=[headers]; //convert to 2 dimentional
    sheet.getRange(3, 1, 1, headers.length).setValues(headers_array);
    
    sheet.getRange(4, 1, report.rows.length, headers.length).setValues(report.rows);  
  }
  
  sheet.getRange('F1').setValue(new Date());   //Set "Last updated" date 
}


function formula(r,c) { // used it for alerting, not very useful
  return SpreadsheetApp.getActiveSheet().getRange(r,c).getFormula();
}


function runBigQueryCreate(sheet) {
  var projectId = '1022153460529'; //BigQuery credentials
  var sql = sheet.getRange("B1").getValue();
  
  //parcer - vary bad thing to avoid 1000 limit 
  if (sheet.getRange("A2").getValue()=='Parce') {
    sql=replaceAll(sql, sheet.getRange("A3").getValue(), sheet.getRange("B3").getValue());
    sql=replaceAll(sql, sheet.getRange("A4").getValue(), sheet.getRange("B4").getValue());
  }

  var dataset= sheet.getRange("C1").getValue();
  var tableid= sheet.getRange("C2").getValue();
  var queryResults, jobs;
  var resource = {
      configuration: {
        query: {
          query: sql,
          timeoutMs: 1000,
          destinationTable: {projectId: "wego-cloud", datasetId: dataset, tableId: tableid},
          writeDisposition: "WRITE_TRUNCATE",
          createDisposition: "CREATE_IF_NEEDED",
          allowLargeResults: true,
          userDefinedFunctionResources: [{resourceUri: "gs://nik-export/udf_kenshoo_import.js"}]
        }
      }
    };
  
  try {
    queryResults= BigQuery.Jobs.insert(resource, projectId);
    var jobId = queryResults.jobReference.jobId;
    var jobResults = BigQuery.Jobs.get(projectId, jobId);
  }
  catch (err) {
    if (scheduled) {
      MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
    } else {      
      Browser.msgBox(err);     
    }
    return;
  }  
  
  if (sheet.getRange("D1").getValue()!='no waiting') {
    var sleepTimeMs = 500; // Check on status of the Query Job every 500Ms.
    while (jobResults.status.state!="DONE") {
      try {
        Utilities.sleep(sleepTimeMs);
        if(sleepTimeMs<1000*10) { sleepTimeMs *= 2; } //Never sleep for more than 10 sec
        jobResults = BigQuery.Jobs.get(projectId, jobId);
      }
      catch (err) {
        if (scheduled) {
          MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
        } else {      
          Browser.msgBox(err);     
        }
        return;
      } 
    }
    
    if (typeof jobResults.status.errors != 'undefined') {
      var err='';
      for (var x in jobResults.status.errors) { err=err + jobResults.status.errors[x].message + ' ' + jobResults.status.errors[x].location + '\n'; }   
      if (scheduled) {
        MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
      } else {      
        Browser.msgBox(err);     
      }
      return;
    }
  }
  
  sheet.getRange('F1').setValue(new Date());   //Set "Last updated" date

  //functions to allow for parcing in order to avoid 1000 tables limit... 
  function escapeRegExp(string) { return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"); }
  function replaceAll(string, find, replace) { return string.replace(new RegExp(escapeRegExp(find), 'g'), replace); }
}

function tableGenerate() { //table just for parcer
sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("leaderboard");
  if (sheet.getRange("C3").getValue()>0) {
    sheet.getRange("C3").setValue(sheet.getRange("C3").getValue()-300);
  }
runBigQueryCreate(sheet)
}

//v.1.0.4 tab separation instead of ,
function runBigQueryUpload(sheet) {
  var projectId = '1022153460529'; //BigQuery credentials
  var datasetId = sheet.getRange("C1").getValue();
  var tableId = sheet.getRange("C2").getValue();
  var lastColumn = sheet.getLastColumn();
  var lastRow = sheet.getLastRow();
  
  var job = {
    configuration: {
      load: {
        destinationTable: {
          projectId: projectId,
          datasetId: datasetId,
          tableId: tableId
        },
        schema: {
          fields: []
        },
        skipLeadingRows: 0,
        writeDisposition: "WRITE_TRUNCATE",
        fieldDelimiter: "\t"
      }
    }
  };  
  
  var columns=0;
  for (var i = 1; i <= lastColumn; ++i) {
    if (sheet.getRange(3,i).getValue() > "") {
      columns=columns+1;
      job.configuration.load.schema.fields.push({name: sheet.getRange(3,i).getValue(), type: sheet.getRange(4,i).getValue()});
    }
  }
  
  var data_string="";
  var values=sheet.getRange(5,1,lastRow-4,columns).getValues();
  for (var i = 0; i <= lastRow-5; ++i) {
    var empty=0;
    for (var j = 0; j <= columns-1; ++j) { if (values[i][j]!="") {empty=empty+1;} } //check if line has values
    if (empty>0) {
      for (var j = 0; j <= columns-1; ++j) {data_string=data_string+values[i][j]+"\t";} //attach all columns
      data_string=data_string.substring(0, data_string.length - 1)+"\n"; //subst last comma with newline
    }
  }

  data_string = data_string.slice(0, -1); //trim last newline
  var data = Utilities.newBlob(data_string).setContentType('application/octet-stream');
  
  //job = BigQuery.Jobs.insert(job, projectId, data);
  
  try {
    var jobResults = BigQuery.Jobs.insert(job, projectId, data);
    var jobId = jobResults.jobReference.jobId;
  }
  catch (err) {
    if (scheduled) {
      MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
    } else {      
      Browser.msgBox(err);     
    }
    return;
  } 
  
  if (sheet.getRange("D1").getValue()!='no waiting') {
    var sleepTimeMs = 1000*10; // Check on status of the Query Job every X Ms.
    while (jobResults.status.state!="DONE") {
      try {
        Utilities.sleep(sleepTimeMs);
        //sleepTimeMs *= 2;
        jobResults = BigQuery.Jobs.get(projectId, jobId);
      }
      catch (err) {
        if (scheduled) {
          MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
        } else {      
          Browser.msgBox(err);     
        }
        return;
      } 
    }
    
    if (typeof jobResults.status.errors != 'undefined') {
      var err='';
      for (var x in jobResults.status.errors) { err=err + jobResults.status.errors[x].message + ' ' + jobResults.status.errors[x].location + '\n'; }   
      if (scheduled) {
        MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
      } else {      
        Browser.msgBox(err);     
      }
      return;
    }
  }
  
  sheet.getRange('F1').setValue(new Date());   //Set "Last updated" date 
}

//v1.0.5 added Adsense
function runAdSense(sheet) {  //https://developers.google.com/apps-script/advanced/adsense
  var op_str = sheet.getRange("B2").getValue();
  var options = JSON.parse(op_str);
  var startDate = Utilities.formatDate(sheet.getRange("C2").getValue(), Session.getScriptTimeZone(),'yyyy-MM-dd');
  var endDate = Utilities.formatDate(sheet.getRange("D2").getValue(), Session.getScriptTimeZone(),'yyyy-MM-dd');
  var timezone = Session.getScriptTimeZone();

  var report = AdSense.Reports.generate(startDate, endDate, options);

  if (report.rows) {
    if(sheet.getRange("F1").getValue() > 0) { sheet.getRange(4,1,sheet.getLastRow(),sheet.getRange("F1").getValue()).clearContent(); } //clear sheet 
    var headers = [];
    for (var x in report.headers) { headers.push(report.headers[x].name); } //parce headers
    var headers_array=[headers]; //convert to 2 dimentional
    sheet.getRange(3, 1, 1, report.headers.length).setValues(headers_array);
    sheet.getRange(4, 1, report.rows.length, report.headers.length).setValues(report.rows);  
  }
  
  sheet.getRange('H1').setValue(new Date());   //Set "Last updated" date 
}

//v1.0.6 added google API and AdXSeller pub-9628538644604139
function runAdXSeller(sheet) {
  sheet.getRange(1,8).clearContent();
  sheet.getRange(2,8).clearContent();
  i = 0;
  while (sheet.getRange(1,8).getValue() == "") {
  try {

  var accountID='pub-9628538644604139';
  var startDate = Utilities.formatDate(sheet.getRange("C2").getValue(), Session.getScriptTimeZone(),'yyyy-MM-dd');
  var endDate = Utilities.formatDate(sheet.getRange("D2").getValue(), Session.getScriptTimeZone(),'yyyy-MM-dd');
  var options = sheet.getRange("B2").getValue();
  
  if (userAuth('AdXSeller','https://www.googleapis.com/auth/adexchange.seller.readonly')) {return;} // check if we have user authorisation
  var service = getService('AdXSeller','https://www.googleapis.com/auth/adexchange.seller.readonly'); // name and scope of API
  
  var response = UrlFetchApp.fetch('https://www.googleapis.com/adexchangeseller/v2.0/accounts/' + accountID + '/reports?' +
                                   'startDate=' + startDate +
                                   '&endDate=' + endDate +
                                   '&' + options,  
                                   {headers: { Authorization: 'Bearer ' + service.getAccessToken() }}
                                  );
  var report = JSON.parse(response.getContentText());

  if (report.rows) {
    if(sheet.getRange("F1").getValue() > 0) { sheet.getRange(4,1,sheet.getLastRow(),sheet.getRange("F1").getValue()).clearContent(); } //clear sheet 
    var headers = [];
    for (var x in report.headers) { headers.push(report.headers[x].name); } //parce headers
    var headers_array=[headers]; //convert to 2 dimentional
    sheet.getRange(3, 1, 1, report.headers.length).setValues(headers_array);
    sheet.getRange(4, 1, report.rows.length, report.headers.length).setValues(report.rows);  
  }
  
  sheet.getRange('H1').setValue(new Date());   //Set "Last updated" date
  }
   catch (err) {
//    Logger.log(err);
//    Browser.msgBox(err);
//    return;
sheet.getRange(2,8).setValue(err.message);
  }
    i++
  sheet.getRange(1,9).setValue(i+" retry");
  }
}


function runBigQueryPostprocess(sheet) {                            //testing
  
  if (scheduled) {
    sheet.getRange("B6").setValue(sheet.getRange("B8").getValue());
    runBigQueryCreate(sheet);   
  } else {
    var start=sheet.getRange("B11").getValue();
    var end=sheet.getRange("B12").getValue();
    var step=sheet.getRange("B13").getValue();
    if (step=='') { step=1; } //default step is one day
    while (start<=end) {
      sheet.getRange("B6").setValue(start);
      runBigQueryCreate(sheet);
      start.setDate(start.getDate() + step);
    } 
  }
  
}

function runBigQueryDates(sheet) {
  var projectNumber = '1022153460529'; //BigQuery credentials
  var times = []; 
  
  for(var i=3, l = sheet.getLastRow(); i<=l; i++) {
  
    var dataset = sheet.getRange(i,1).getValue();
    var table = sheet.getRange(i,2).getValue();
    var queryResults;
    
    try {
      queryResults = BigQuery.Tables.get(projectNumber, dataset, table);
    }
    catch (err) {
      Logger.log(err);
      Browser.msgBox(err);
      return;
    }
    
    var d = new Date(Number(queryResults.lastModifiedTime));
    times.push([d]); 
  }

  // Update the Spreadsheet with data from the resultValues array
  sheet.getRange(3, 3, times.length,1).setValues(times);

  //Set "Last updated" date 
  var end = new Date();
  var F1 = sheet.getRange('F1');
  F1.setValue(end);
}


function runBigQueryAppend(sheet) {                                        //testing 01 Feb 16
  var projectId = '1022153460529'; //BigQuery credentials
  var sql = sheet.getRange("B1").getValue();
  
  //parcer - vary bad thing to avoid 1000 limit 
  if (sheet.getRange("A2").getValue()=='Parce') {
    sql=replaceAll(sql, sheet.getRange("A3").getValue(), sheet.getRange("B3").getValue());
    sql=replaceAll(sql, sheet.getRange("A4").getValue(), sheet.getRange("B4").getValue());
  }

  var dataset= sheet.getRange("C1").getValue();
  var tableid= sheet.getRange("C2").getValue();
  var queryResults, jobs;
  var resource = {
      configuration: {
        query: {
          query: sql,
          timeoutMs: 1000,
          destinationTable: {projectId: "wego-cloud", datasetId: dataset, tableId: tableid},
          writeDisposition: "WRITE_APPEND",
          createDisposition: "CREATE_IF_NEEDED",
          allowLargeResults: true,
          userDefinedFunctionResources: [{resourceUri: "gs://nik-export/udf_kenshoo_import.js"}]
        }
      }
    };
  
  try {
    queryResults= BigQuery.Jobs.insert(resource, projectId);
    var jobId = queryResults.jobReference.jobId;
    var jobResults = BigQuery.Jobs.get(projectId, jobId);
  }
  catch (err) {
    if (scheduled) {
      MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
    } else {      
      Browser.msgBox(err);     
    }
    return;
  }  
  
  if (sheet.getRange("D1").getValue()!='no waiting') {
    var sleepTimeMs = 500; // Check on status of the Query Job every 500Ms.
    while (jobResults.status.state!="DONE") {
      try {
        Utilities.sleep(sleepTimeMs);
        if(sleepTimeMs<1000*10) { sleepTimeMs *= 2; } //Never sleep for more than 10 sec
        jobResults = BigQuery.Jobs.get(projectId, jobId);
      }
      catch (err) {
        if (scheduled) {
          MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
        } else {      
          Browser.msgBox(err);     
        }
        return;
      } 
    }
    
    if (typeof jobResults.status.errors != 'undefined') {
      var err='';
      for (var x in jobResults.status.errors) { err=err + jobResults.status.errors[x].message + ' ' + jobResults.status.errors[x].location + '\n'; }   
      if (scheduled) {
        MailApp.sendEmail('r.kritiga@wego.com, aaron@wego.com', 'Error in Tool script', 'Error in GSheet - ' + SpreadsheetApp.getActiveSpreadsheet().getName() + ' ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n Sheet name: ' + sheet.getSheetName() + '\n\n' + err);       
      } else {      
        Browser.msgBox(err);     
      }
      return;
    }
  }
  
  sheet.getRange('F1').setValue(new Date());   //Set "Last updated" date

  //functions to allow for parcing in order to avoid 1000 tables limit... 
  function escapeRegExp(string) { return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"); }
  function replaceAll(string, find, replace) { return string.replace(new RegExp(escapeRegExp(find), 'g'), replace); }
}









