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
var navSearchPerformed = function() {
  document.getElementById('navSearchButton').addEventListener("click", function() {
    searchText = document.getElementById('navSearchText').value;
    changeSearchRoute(searchText)
  })
  document.getElementById('navSearchText').addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("navSearchButton").click();
    }
  });
}
var changeSearchRoute = function(searchText) {
  if (document.getElementById('navSearchText').value) {
    window.open('/result/?search=' + btoa(searchText), "_self")
  }
}

var hexToBase64 = function(str) {
  return btoa(String.fromCharCode.apply(null,
    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
  );
}


var pieChartHomeConfig = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        zoomBySingleTouch: true,
        zoomType: 'xy'
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
      type: 'line',
      zoomBySingleTouch: true,
      zoomType: 'xy'
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
      type: 'column',
      zoomBySingleTouch: true,
      zoomType: 'xy'
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
var lineChartConfig = {
    chart: {
      type: 'line',
      zoomBySingleTouch: true,
      zoomType: 'xy'
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
        type: 'pie',
        zoomBySingleTouch: true,
        zoomType: 'xy'
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
