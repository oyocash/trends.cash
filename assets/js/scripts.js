window.dataURL = "https://data.trends.cash/"

// default search period
window.searchPeriodDefault = 7
window.rankingPeriodDefault = 1
// oyoExternalLinkProtocol values
window.oyoRankingAddress = "149xadSKJcKdhgE4sMmcvx421nsGYwgkWo"
window.oyoRankingPeriod = 30 * 24 * 60 * 60

// bob bitbus node
window.bobBitbusNodeDefault = 'https://bob.bitbus.network/block/'
window.bobBitbusNode = window.bobBitbusNodeDefault
if (localStorage.getItem('bobBitbusNode')) {
  if (window.bobBitbusNodeDefault === localStorage.getItem('bobBitbusNode'))
  {
    localStorage.removeItem('bobBitbusNode')
  } else {
    window.bobBitbusNode = localStorage.getItem('bobBitbusNode')
  }
}
// planaria token
window.planariaTokenDefault = 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiIxR2hyVVYyd1luNWlkaEFhbTd4cXpDOTl1ZXNSdEs4aEV2IiwiaXNzdWVyIjoiZ2VuZXJpYy1iaXRhdXRoIn0.SUEyYVRzbEZ4UG9TYXdTNjd0bnU0ZnhnSDV4VjlCeHNHTHRPZlpLdWU1Z0xQMTJNRGY1M1ovdnQvTDNKTGZBbHRYak5VUFg2cWEyVXhvRjZFTHdyUm5jPQ'
window.planariaToken = window.planariaTokenDefault
if (localStorage.getItem('planariaToken')) {
  if (window.planariaTokenDefault === localStorage.getItem('planariaToken'))
  {
    localStorage.removeItem('planariaToken')
  } else {
    window.planariaToken = localStorage.getItem('planariaToken')
  }
}
// old bob node
window.bobPlanariaNodeDefault = 'https://bob.planaria.network/q/1GgmC7Cg782YtQ6R9QkM58voyWeQJmJJzG/'
window.bobPlanariaNode = window.bobPlanariaNodeDefault
if (localStorage.getItem('bobPlanariaNode')) {
  if (window.bobPlanariaNodeDefault === localStorage.getItem('bobPlanariaNode'))
  {
    localStorage.removeItem('bobPlanariaNode')
  } else {
    window.bobPlanariaNode = localStorage.getItem('bobPlanariaNode')
  }
}
// neongenesis planaria node
window.neongenesisNodeDefault = 'https://neongenesis.bitdb.network/q/1HcBPzWoKDL2FhCMbocQmLuFTYsiD73u1j/'
window.neongenesisNode = window.neongenesisNodeDefault
if (localStorage.getItem('neongenesisNode')) {
  if (window.neongenesisNodeDefault === localStorage.getItem('neongenesisNode'))
  {
    localStorage.removeItem('neongenesisNode')
  } else {
    window.neongenesisNode = localStorage.getItem('neongenesisNode')
  }
}
// bitdb api key
window.bitdbApiKeyDefault = 'qpl84tsdqd6yxd3hpxhj5ngr3rp0pvlweqy7p7rzfy'
window.bitdbApiKey = window.bitdbApiKeyDefault
if (localStorage.getItem('bitdbApiKey')) {
  if (window.bitdbApiKeyDefault === localStorage.getItem('bitdbApiKey'))
  {
    localStorage.removeItem('bitdbApiKey')
  } else {
    window.bitdbApiKey = localStorage.getItem('bitdbApiKey')
  }
}
// protocols
var protocolsFile = {
  "bQE=": { "name": "memo" },
  "bQI=": { "name": "memo" },
  "bQM=": { "name": "memo" },
  "bQQ=": { "name": "memo" },
  "bQU=": { "name": "memo" },
  "bQY=": { "name": "memo" },
  "bQc=": { "name": "memo" },
  "bQo=": { "name": "memo" },
  "bQs=": { "name": "memo" },
  "bQw=": { "name": "memo" },
  "bQ0=": { "name": "memo" },
  "bQ4=": { "name": "memo" },
  "bRA=": { "name": "memo" },
  "bRM=": { "name": "memo" },
  "bRQ=": { "name": "memo" },
  "bRY=": { "name": "memo" },
  "bRc=": { "name": "memo" },
  "bSQ=": { "name": "memo" },
  "bTA=": { "name": "memo slp dex" },
  "bTE=": { "name": "memo slp dex" },
  "bTI=": { "name": "memo slp dex" }
}
window.protocolsDefault = protocolsFile
if (!localStorage.getItem('protocols')) {
  window.protocols = window.protocolsDefault
} else {
  window.protocols = localStorage.getItem('protocols')
}
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

var getBitcomProtocolEchos =  function(address) {
  return new Promise(function(resolve, reject) {
    let queryMatch = {}
    queryMatch['$and'] = []
    queryMatch['$and'].push({"out.tape.cell": {"$all": [{"$elemMatch": {"i": 0, "s": "$"}}, {"$elemMatch": {"i": 1, "s": "echo"}}, {"$elemMatch": {"i": 3, "s": {"$in": ["to", ">"]}}}, {"$elemMatch": {"i": 4, "s": {"$exists": true, "$ne": ""}}}]}})
    queryMatch['$and'].push({'in.e.a': {'$in': [address]}})

    let query = {
      'v': 3,
      'q': {
        'find': queryMatch,
        "project": {
          "in.e.a": 1,
          "out.tape.cell.s": 1
        },
        'skip': 0,
        'limit': 100
      }
    }
    let url = window.bobBitbusNode

    let fetchParams = {
      method: "post",
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        'token': window.planariaToken,
        "format": "json"
      },
      body: JSON.stringify(query)
    }

    fetch(url, fetchParams).then(function(r) {
      return r.json()
    }).then(response => {
      let bitcomEchoResults = response
      let bitcomProtocolEchos = {}

      for (let i = 0; i < bitcomEchoResults.length; ++i) {
        for (let j = 0; j < bitcomEchoResults[i]['out'].length; ++j) {
          if (!bitcomEchoResults[i]['out'][j]) {
            continue
          }
          for (let jj = 0; jj < bitcomEchoResults[i]['out'][j]['tape'].length; ++jj) {
            if (bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][4] !== undefined) {
              if (bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][0].s === "$" && bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][1].s === "echo" && (bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][3].s === "to" || bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][3].s === ">")) {
                let field = bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][4].s
                if (bitcomProtocolEchos[field] === undefined) {
                  bitcomProtocolEchos[field] = bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][2].s
                }
              }
            }
          }
        }
      }
      resolve(bitcomProtocolEchos)
    })
    .catch(error => {
      reject(error)
      console.log(error)
    })
  });
}

var getBitcomProtocols =  function() {
  return new Promise(function(resolve, reject) {
    var promises = []
    for (let i = 0; i < bitcomPrefixes.length; i = i + 100) {
      var slicedBitcomPrefixes = bitcomPrefixes.slice(i, i + 100)
      let queryMatch = {}
      queryMatch['$and'] = []
      queryMatch['$and'].push({"out.tape.cell": {"$all": [{"$elemMatch": {"i": 0, "s": "$"}}, {"$elemMatch": {"i": 1, "s": "echo"}}, {"$elemMatch": {"i": 3, "s": {"$in": ["to", ">"]}}}, {"$elemMatch": {"i": 4, "s": {'$in': ['name']}}}]}})
      queryMatch['$and'].push({'in.e.a': {'$in': slicedBitcomPrefixes}})

      let query = {
        'v': 3,
        'q': {
          'find': queryMatch,
          "project": {
            "in.e.a": 1,
            "out.tape.cell.s": 1
          },
          'skip': 0,
          'limit': 500
        }
      }
      let url = window.bobBitbusNode

      let fetchParams = {
        method: "post",
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          'token': window.planariaToken,
          "format": "json"
        },
        body: JSON.stringify(query)
      }

      promises.push(getPromise(url, fetchParams));
    }
    Promise.all(promises)
    .then(function(args) {
      for (let ii = 0; ii < args.length; ii++) {
        var bitcomEchoResults = args[ii]
        for (let i = 0; i < bitcomEchoResults.length; ++i) {
          for (let j = 0; j < bitcomEchoResults[i]['out'].length; ++j) {
            if (!bitcomEchoResults[i]['out'][j]) {
              continue
            }
            for (let jj = 0; jj < bitcomEchoResults[i]['out'][j]['tape'].length; ++jj) {
              if (bitcomProtocols[bitcomEchoResults[i]['in'][0].e.a] === undefined) {
                bitcomProtocols[bitcomEchoResults[i]['in'][0].e.a] = {}
              }
              if (bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][4] !== undefined) {
                if (bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][0].s === "$" && bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][1].s === "echo" && (bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][3].s === "to" || bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][3].s === ">") && bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][4].s === "name") {
                  let field = bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][4].s
                  if (bitcomProtocols[bitcomEchoResults[i]['in'][0].e.a][field] === undefined) {
                    bitcomProtocols[bitcomEchoResults[i]['in'][0].e.a][field] = bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][2].s
                  }
                }
              }
            }
          }
        }
      }
      resolve(bitcomProtocols)
    })
    .catch(error => {
      reject(error)
      console.log(error)
    })
  });
}

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

  // prefix "b"
  if (matchPhrase.match(/prefix:\s*\S+=\s*/)) {
    let match = matchPhrase.match(/(?:^|\s+)prefix:\s*(\S+=)\s*/u)
    if (match && match[1]) {
      queryMatch['$and'].push({"out.tape.cell": {"$all": [{"$elemMatch": {"i": 0, "b": match[1]}}]}})
      matchPhrase = matchPhrase.replace(/(?:^|\s+)prefix:\s*\S+=\s*/gu, ' ')
    }
  }
  // prefix "s"
  if (matchPhrase.match(/prefix:\s*\S+\s*/)) {
    let match = matchPhrase.match(/(?:^|\s+)prefix:\s*(\S+)\s*/u)
    if (match && match[1]) {
      queryMatch['$and'].push({"out.tape.cell": {"$all": [{"$elemMatch": {"i": 0, "s": match[1]}}]}})
      matchPhrase = matchPhrase.replace(/(?:^|\s+)prefix:\s*\S+\s*/gu, ' ')
    }
  }
  // MAP app
  if (matchPhrase.match(/app:\s*\S+\s*/)) {
    let match = matchPhrase.match(/(?:^|\s+)app:\s*(\S+)\s*/u)
    if (match && match[1]) {
      queryMatch['$and'].push({"$or": [{"out.tape.cell": {"$all": [{"$elemMatch": {"i": 2, "s": "app"}}, {"$elemMatch": {"i": 3, "s": match[1]}}]}}, {"out.tape.cell": {"$all": [{"$elemMatch": {"i": 14, "s": "app"}}, {"$elemMatch": {"i": 15, "s": match[1]}}]}}, {"out.tape.cell": {"$all": [{"$elemMatch": {"i": 16, "s": "app"}}, {"$elemMatch": {"i": 17, "s": match[1]}}]}}]})
      matchPhrase = matchPhrase.replace(/(?:^|\s+)app:\s*\S+\s*/gu, ' ')
    }
  }
  if (matchPhrase.includes("from:")) {
    let match = matchPhrase.match(/(?:^|\s+)from:\s*(\S+)\s*/u)
    if (match && match[1]) {
      queryMatch['$and'].push({'in.e.a': window.convertAddress(match[1])})
      matchPhrase = matchPhrase.replace(/(?:^|\s+)from:\s*\S+\s*/gu, ' ')
    }
  }
  if (matchPhrase.includes("notfrom:")) {
    let match = matchPhrase.match(/(?:^|\s+)notfrom:\s*(\S+)\s*/u)
    if (match && match[1]) {
      queryMatch['$and'].push({'in.e.a': { '$ne': window.convertAddress(match[1]) }})
      matchPhrase = matchPhrase.replace(/(?:^|\s+)notfrom:\s*\S+\s*/gu, ' ')
    }
  }
  if (matchPhrase.includes("to:")) {
    let match = matchPhrase.match(/(?:^|\s+)to:\s*(\S+)\s*/u)
    if (match && match[1]) {
      queryMatch['$and'].push({'out.e.a': window.convertAddress(match[1])})
      matchPhrase = matchPhrase.replace(/(?:^|\s+)to:\s*\S+\s*/gu, ' ')
    }
  }
  if (matchPhrase.includes("notto:")) {
    let match = matchPhrase.match(/(?:^|\s+)notto:\s*(\S+)\s*/u)
    if (match && match[1]) {
      queryMatch['$and'].push({'out.e.a': { '$ne': window.convertAddress(match[1]) }})
      matchPhrase = matchPhrase.replace(/(?:^|\s+)notto:\s*\S+\s*/gu, ' ')
    }
  }
  // datetime:
  if (matchPhrase.includes("datetime:")) {
    let match = matchPhrase.match(/(?:^|\s+)datetime:\s*(\S+)\s*/u)
    if (match && match[1]) {
      let endDate = new Date(Date.UTC(match[1].substring(0,4), parseInt(match[1].substring(4,6)) - 1, match[1].substring(6,8), 23, 59, 59, 0))
      endTimestamp = parseInt(endDate.getTime() / 1000) + 1
      matchPhrase = matchPhrase.replace(/(?:^|\s+)datetime:\s*\S+\s*/gu, ' ')
    }
  }
  // period:
  if (matchPhrase.includes("period:")) {
    let match = matchPhrase.match(/(?:^|\s+)period:\s*(\S+)\s*/u)
    if (match && match[1]) {
      beginTimestamp = parseInt(endTimestamp - (match[1] * 24 * 60 * 60))
      matchPhrase = matchPhrase.replace(/(?:^|\s+)period:\s*\S+\s*/gu, ' ')
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
