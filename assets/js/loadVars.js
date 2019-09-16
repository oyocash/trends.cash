// default search period
window.searchPeriodDefault = 7
window.rankingPeriodDefault = 1
// bitdb babel node
window.bitdbNodeDefault = 'https://bob.planaria.network/q/1GgmC7Cg782YtQ6R9QkM58voyWeQJmJJzG/'
window.bitdbNode = window.bitdbNodeDefault
if (localStorage.getItem('bitdbNode')) {
  if (window.bitdbNodeDefault === localStorage.getItem('bitdbNode'))
  {
    localStorage.removeItem('bitdbNode')
  } else {
    window.bitdbNode = localStorage.getItem('bitdbNode')
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
window.colors = [
  ["rgba(143, 81, 215, 0.5)",
  "rgba(206, 120, 127, 0.5)",
  "rgba(126, 165, 94, 0.5)",
  "rgba(155, 99, 132, 0.5)",
  "rgba(129, 116, 106, 0.5)",
  "rgba(214, 87, 221, 0.5)",
  "rgba(151, 176, 87, 0.5)",
  "rgba(17, 126, 69, 0.5)",
  "rgba(130, 178, 215, 0.5)",
  "rgba(201, 97, 3, 0.5)",
  "rgba(219, 105, 170, 0.5)",
  "rgba(0, 77, 95, 0.5)",
  "rgba(71, 169, 63, 0.5)",
  "rgba(211, 182, 20, 0.5)",
  "rgba(83, 226, 201, 0.5)",
  "rgba(96, 135, 14, 0.5)",
  "rgba(88, 20, 244, 0.5)",
  "rgba(245, 3, 208, 0.5)",
  "rgba(84, 136, 134, 0.5)",
  "rgba(115, 236, 137, 0.5)",
  "rgba(9, 34, 55, 0.5)",
  "rgba(198, 153, 42, 0.5)",
  "rgba(76, 148, 115, 0.5)",
  "rgba(159, 38, 144, 0.5)",
  "rgba(89, 102, 123, 0.5)"],
  ["rgb(143, 81, 215)",
  "rgb(206, 120, 127)",
  "rgb(126, 165, 94)",
  "rgb(155, 99, 132)",
  "rgb(129, 116, 106)",
  "rgb(214, 87, 221)",
  "rgb(151, 176, 87)",
  "rgb(17, 126, 69)",
  "rgb(130, 178, 215)",
  "rgb(201, 97, 3)",
  "rgb(219, 105, 170)",
  "rgb(0, 77, 95)",
  "rgb(71, 169, 63)",
  "rgb(211, 182, 20)",
  "rgb(83, 226, 201)",
  "rgb(96, 135, 14)",
  "rgb(88, 20, 244)",
  "rgb(245, 3, 208)",
  "rgb(84, 136, 134)",
  "rgb(115, 236, 137)",
  "rgb(9, 34, 55)",
  "rgb(198, 153, 42)",
  "rgb(76, 148, 115)",
  "rgb(159, 38, 144)",
  "rgb  (89, 102, 123)"]
]