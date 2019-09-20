    var bitcomPrefixes = []
    var dummyChartObj = {}
    var getBitcomProtocols =  function() {
      return new Promise(function(resolve, reject) {
        let queryMatch = {}
        queryMatch['$and'] = []
        queryMatch['$and'].push({"out.tape.cell": {"$all": [{"$elemMatch": {"i": 0, "s": "$"}}, {"$elemMatch": {"i": 1, "s": "echo"}}, {"$elemMatch": {"i": 3, "s": "to"}}, {"$elemMatch": {"i": 4, "s": {'$in': ['name']}}}]}})
        queryMatch['$and'].push({'in.e.a': {'$in': bitcomPrefixes}})

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
        if (window.bobApiKey) {
          header = {
            headers: { key: window.bobApiKey }
          }
        }

        fetch(url, header).then(function(r) {
          return r.json()
        }).then(response => {
          if (response !== undefined && (response.u !== undefined || response.c !== undefined)) {
            let bitcomEchoResults = []
            if (response.u !== undefined) {
              bitcomEchoResults = bitcomEchoResults.concat(response.u.reverse())
            }
            if (response.c !== undefined) {
              bitcomEchoResults = bitcomEchoResults.concat(response.c)
            }

            let bitcomProtocols = {}
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
                    if (bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][0].s === "$" && bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][1].s === "echo" && bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][3].s === "to" && bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][4].s === "name") {
                      let field = bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][4].s
                      if (bitcomProtocols[bitcomEchoResults[i]['in'][0].e.a][field] === undefined) {
                        bitcomProtocols[bitcomEchoResults[i]['in'][0].e.a][field] = bitcomEchoResults[i]['out'][j]['tape'][jj]['cell'][2].s
                      }
                    }
                  }
                }
              }
            }
            for (let key in bitcomProtocols) {
              if (!bitcomProtocols.hasOwnProperty(key)) continue;
              for (let ii = 0; ii < dummyChartObj.chartData.length; ii++) {
                if (dummyChartObj.chartData[ii][0] === key) {
                  dummyChartObj.chartData[ii][0] = bitcomProtocols[key]['name']
                }
              }
            }
            resolve(dummyChartObj.chartData)
          }
        })
        .catch(error => {
          reject(error)
          console.log(error)
        })
      });
    }
