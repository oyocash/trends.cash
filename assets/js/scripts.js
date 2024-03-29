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

var changeSearchRoute = function() {
  if (document.getElementById('navSearchText').value) {
    window.open('/result/?search=' + btoa(document.getElementById('navSearchText').value), "_self")
  }
}

var lineChartHomeConfig = {
    chart: {
      type: 'line',
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
        pointFormat: '<b>{point.y}</b>'
    },
    legend: {
      enabled:false 
    },
    plotOptions: {
        series: {
          step: 'left',
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
var columnChartHomeConfig = {
    chart: {
      type: 'column'
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
        pointFormat: '<b>{point.y}</b>'
    },
    legend: {
      enabled:false 
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
        }
    },
    credits: {
      enabled: false
    }
};


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
