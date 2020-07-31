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
