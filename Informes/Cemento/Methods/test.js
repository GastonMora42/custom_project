
var obj = [
    {
        "TIPO": "FILLER",
        "CANTIDAD": 8313,
        "PORCENTAJE": 89
    },
    {
        "TIPO": "NORMAL",
        "CANTIDAD": 974,
        "PORCENTAJE": 10
    },
    {
        "TIPO": "PUZZOLANICO",
        "CANTIDAD": 27,
        "PORCENTAJE": 0
    },
    {
        "TIPO": "TOTAL",
        "CANTIDAD": 9314,
        "PORCENTAJE": 100
    }
]

console.log(typeof(obj))
//var arrBirds = Object.keys(obj).map((key) => [key, obj[key]]);;
var arrBirds = obj;
console.log(typeof(arrBirds))
var col = [];
for (var key in arrBirds) {
  if (col.indexOf(key) === -1) {
    col.push(key);
  }
}



for (var i = 0; i < arrBirds.length; i++) {
  
  console.log(arrBirds[i].Name);
}


function createTableWithInnerHTML(data) {
  let tableHTML = '<table border="1"><tr>';

  Object.keys(data[0]).forEach(key => {
      tableHTML += `<th>${key}</th>`;
  });

  tableHTML += '</tr>';

  data.forEach(item => {
      tableHTML += '<tr>';
      Object.values(item).forEach(value => {
          tableHTML += `<td>${value}</td>`;
      });
      tableHTML += '</tr>';
  });

  tableHTML += '</table>';

   return tableHTML;
}

console.log (createTableWithInnerHTML(obj))






data.forEach(item => {
    tableHTML += '<tr class="border-bottom border-200">';
    Object.values(item).forEach(value => {
        
        if (typeof value == "string") {
            tableHTML += `<td class="align-middle fw-medium">${value}</td>`;
        } else {
            tableHTML += `<td style="text-align:right;"  class="align-middle">${value}</td>`;
        }
        
        
    });
    tableHTML += '</tr>';
});

  