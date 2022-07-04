function doGet(e) {
    var template = HtmlService.createTemplateFromFile('index')
    return  template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width , initial-scale=1')
  }
  
  function setPlainText() {
   var ss = SpreadsheetApp.getActiveSpreadsheet();
   var sheets = ss.getSheets();
     for(var i = 0; i < sheets.length; i++) {
       var setPlainText = ss.getSheets()[i]; 
       var sheetColumnA = setPlainText.getRange("A1:A");
       sheetColumnA.setNumberFormat("@");
     }
  } 
  
  function getCode(code) {
  var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = ws.getRange(1, 1, ws.getLastRow(), 4).getValues();
  var stdCodesList = data.map (function(r) { return r[0]; }); 
  var stdList = data.map(function(r) { 
  return [`  
          <table class="table table-bordered">
          <thead class="thead-light">
           <tr>
            <th scope="col"><center>UserID</center></th>
            <th scope="col"><center>โรคประจำตัว</center></th>
            <th scope="col"><center>ประวัติสุขภาพ</center></th>
            <th scope="col"><center>ยาที่แพ้</center></th>
           </tr>
          </thead>
          <tbody>
           <tr>
            <td>${r[1]}</td> <td>${r[2]}</td> <td>${r[3]}</td>  <td>${r[4]} <td>${r[5]}</td>
           </td>
           </tr>
          </tbody>
          </table>
          `];
  });
  var position = stdCodesList.indexOf(code); 
  if(position > -1){
  return stdList[position];
  } else {
  return '*ไม่พบข้อมูล';
  
    }
  }
  