

var getUrlVars = function() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}
var navToggled = function() {
  if (document.getElementById("nav-list").classList.contains("active")) {
    document.getElementById("nav-list").classList.add('inactive')
    document.getElementById("nav-list").classList.remove('active')
  } else {
    document.getElementById("nav-list").classList.add('active')
    document.getElementById("nav-list").classList.remove('inactive')
  }
}
var navSearchPerformed = function(period, date) {
  document.getElementById('navSearchButton').addEventListener("click", function() {
    searchText = document.getElementById('navSearchText').value;
    changeSearchRoute(searchText, period, date)
  })
  document.getElementById('navSearchText').addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("navSearchButton").click();
    }
  });
}
var changeEndDate = function(path, periodInput, date) {
  if (date === 0) {
    date = new Date().toISOString().substring(0, 10)
  }
  if (date.length !== 10) {
    return
  }
  dateInput = date.substring(0,4) + date.substring(5,7) + date.substring(8,10)
  changeRoute(path, periodInput, dateInput)
}
var changeRoute = function(path, period, date) {
    window.open('/' + path + '/?period=' + period + '&date=' + date, "_self")
}
var changeSearchRoute = function(searchText, period, date, step = 86400) {
  if (document.getElementById('navSearchText').value) {
    window.open('/result/?search=' + btoa(searchText) + '&period=' + period + '&date=' + date + '&step=' + step, "_self")
  }
}
var rankingTable = function(parentElementId, items, colors) {
  for (let i = 0; i < items.length; i++) {
    var color = ""
    if (i < 10) {
      color = colors[i]
    }
    addRankingRow(parentElementId, i, items[i], color)
  }
}
var addRankingRow = function(parentElementId, index, item, color)
{
  var row=document.createElement("div");
  row.className = "resultTable-item resultTable-container resultTable-separator";
  var cell1 = document.createElement("div");
  cell1.className = "label-line-number"
  if (index < 10) {
    cell1.style.backgroundColor = color;
  }
  var cell2 = document.createElement("div");
  cell2.className = "label-text"
  var cell3 = document.createElement("div");
  cell3.className = "label-value"
  var textNode1=document.createTextNode(index + 1);
  var textNode2=document.createTextNode(item[0]);
  var textNode3=document.createTextNode(item[1]);
  var a = document.createElement("a");
  var href = getTrendsLink(item[2], item[4])
  if (item[2].length == 1 && item[3] && item[2][0] == btoa(item[3])) {
    href = getTrendsLink([item[3]], item[4])
  }
  a.setAttribute("href", href);
  cell1.appendChild(textNode1);
  cell2.appendChild(a).appendChild(textNode2);
  cell3.appendChild(textNode3);
  row.appendChild(cell1);
  row.appendChild(cell2);
  row.appendChild(cell3);
  document.getElementById(parentElementId).appendChild(row)
}
var getTrendsLink = function(base64Ids, type) {
  let query = 'prefix:' + base64Ids.join(', prefix:')
  if (type === 'mapApp') {
    query = 'app:' + base64Ids.join(', app:')
  }
  if (type === 'run') {
    query = 'app:' + base64Ids.join(', app:')
  }
  let b64 = btoa(JSON.stringify(query).slice(1, JSON.stringify(query).length-1))
  return '/result/?search=' + b64 + '&period=' + window.searchPeriodDefault + '&date=0'
}

var isToday = function(someDate) {
  const today = new Date()
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}
var getPromise = function (url, header){
  return fetch(url, header).then(function(r) {
    var url = r.url
    return r.json()
  }).then(function(response) {
    return {"data": response, "url": url}
  })
};

var hexToBase64 = function(str) {
  return btoa(String.fromCharCode.apply(null,
    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
  );
}

function extractHostname(url) {
  if (Array.isArray(url)) {
    url = url[0]
  }
  if (!validURL(dummyTxUrl(url)))
    return url;
  var pathArray = url.split( '/' );
  var protocol = pathArray[0];
  var host = pathArray[2];
  host = host.split( '?' )[0];
  return protocol + '//' + host;
}
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~\{\}+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
function dummyTxUrl(url) {
  return url.replace("{tx_hash}", "000000000000000000000000000000000000000000000000000000000000")
}

var lineChartConfig = {
    chart: {
      type: 'line'
    },
    subtitle: {
      text: "trends.cash"
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: false
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    legend: {
      itemStyle: {
         fontSize: '10px',
         fontWeight: 'normal',
         color: '#666666'
      },
    },
    plotOptions: {
        series: {
          states: {
            inactive: {
              opacity: 1
            },
            hover: {
              enabled: false
            }
          }
        },
        line: {
            marker: {
                radius: 0
            },
            lineWidth: 2,
            states: {
                hover: {
                    lineWidth: 2
                }
            },
            threshold: null
        }
    },
    credits: {
      enabled: false
    },
    series: []
};

var pieChartConfig = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    subtitle: {
      text: "trends.cash"
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    legend: {
      itemStyle: {
         fontSize: '10px',
         fontWeight: 'normal',
         color: '#666666'
      },
    },
    plotOptions: {
        series: {
          states: {
            inactive: {
              opacity: 1
            },
            hover: {
              enabled: false
            }
          }
        },
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: true,
            size: "90%"
        }
    },
    credits: {
      enabled: false
    }
}
