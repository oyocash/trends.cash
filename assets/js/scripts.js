window.dataURL = "https://data.trends.cash:9007/"

// default search period
window.searchPeriodDefault = 7
window.rankingPeriodDefault = 1

// colors
window.colors = ['#1f78b4','#a6cee3','#33a02c','#b2df8a','#e31a1c','#fb9a99','#ff7f00','#fdbf6f','#6a3d9a','#cab2d6','#b15928','#ffff99']


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

var pieChartHomeConfig = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    subtitle: {
      text: "trends.cash"
    },
    tooltip: { enabled: false },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
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
            size: "80%"
        }
    },
    credits: {
      enabled: false
    }
}
var lineChartHomeConfig = {
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
    tooltip: { enabled: false },
    legend: { enabled: false },
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
    }
};

var lineChartConfig = {
    chart: {
      type: 'line'
    },
    subtitle: {
      text: "trends.cash"
    },
    xAxis: {
        type: 'number'
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
// loader
async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}
async function loadHead() {
    document.head.innerHTML += await fetchHtmlAsText("/includes/head.html");
}
async function loadNav() {
    const contentDiv = document.getElementById("nav");
    if (contentDiv !== null) {
      contentDiv.innerHTML = await fetchHtmlAsText("/includes/nav.html");
    }
}
async function loadFooter() {
    const contentDiv = document.getElementById("footer");
    if (contentDiv !== null) {
      contentDiv.innerHTML = await fetchHtmlAsText("/includes/footer.html");
    }
}
// END loader

// BOB queries
var bitcomPrefixes = []
var bitcomProtocols = {}

var getPromise = function (url, header){
  return fetch(url, header).then(function(r) {
    var url = r.url
    return r.json()
  }).then(function(response) {
    return response
  })
};

var searchQueryCreator = function(searchPhrase, beginTimestamp, endTimestamp) {
  let matchPhrase = searchPhrase
  let queryMatch = {}
  queryMatch['$and'] = []

  // transform prefix "h" to prefix "b"
  if (matchPhrase.match(/prefix:\s*[0-9a-fA-F]+\b\s*/)) {
    let match = matchPhrase.match(/(?:^|\s+)prefix:\s*([0-9a-fA-F]+)\s*/u)
    if (match && match[1]) {
      var bPrefix = hexToBase64(match[1])
      matchPhrase = matchPhrase.replace(/(?:^|\s+)prefix:\s*[0-9a-fA-F]+\s*/gu, ' prefix:' + bPrefix + ' ')
    }
  }
  matchPhrase = matchPhrase.trim()
  //quoting words containing '.'
  let tmpMatchPhraseArray = matchPhrase.match(/\S+|"[^"]+"/gu) || []
  for (let i = 0; i < tmpMatchPhraseArray.length; ++i) {
    if (tmpMatchPhraseArray[i].includes('.') && !tmpMatchPhraseArray[i].includes('"')) {
      tmpMatchPhraseArray[i] = '"' + tmpMatchPhraseArray[i] + '"'
    }
  }
  matchPhrase = tmpMatchPhraseArray.join(" ")

  if (matchPhrase) {
    queryMatch['$and'].push({'$text': {'$search': '\"' + matchPhrase + '\"'}})
  }
  queryMatch['$and'].push({'blk.t': {'$gte': beginTimestamp, '$lte': endTimestamp}})

  return queryMatch
}
// end BOB queries
