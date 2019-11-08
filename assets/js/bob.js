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
          'skip': 0,
          'limit': 500
        }
      }
      let b64 = btoa(JSON.stringify(query))
      let url = bobNode + b64
      let header
      if (window.bitdbApiKey) {
        header = {
          headers: { key: window.bitdbApiKey }
        }
      }
      promises.push(getPromise(url, header));
    }

    Promise.all(promises)
    .then((...args) => {
      for (let i = 0; i < args.length; i++) {
        var response = args[i][0]
        if (response !== undefined && (response.u !== undefined || response.c !== undefined)) {
          let bitcomEchoResults = []
          if (response.u !== undefined) {
            bitcomEchoResults = bitcomEchoResults.concat(response.u.reverse())
          }
          if (response.c !== undefined) {
            bitcomEchoResults = bitcomEchoResults.concat(response.c)
          }

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
