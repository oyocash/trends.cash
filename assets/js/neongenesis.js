var getOyoProQuery = function(address, type, appName, appUrl, beginTimestamp, endTimestamp) {
  var query = {}
  query['$and'] = []
  query['$and'].push({"out.s1": address})
  if (type !== "") {
    query['$and'].push({"out.s2": type})
  }
  if (appName !== "") {
    query['$and'].push({"out.s3": appName})
  }
  query['$and'].push({"out.s4": { "$regex" : "https?:\\/\\/.*\\{tx_hash\\}.*" }})
  query['$and'].push({"out.e.a": address})
  query['$and'].push({"$or": [{"blk.t": {"$gte": beginTimestamp,"$lte": endTimestamp}}, {"blk": null}]})
  return query
}


var getOyoProAggregatedQueryListAll = function(address, type, appName, appUrl, beginTimestamp, endTimestamp) {
  var query = {
    "v": 3,
    "q": {
      "aggregate": [{
        "$match": getOyoProQuery(address, type, appName, appUrl, beginTimestamp, endTimestamp)
      }, {
        '$project': {
          "out.s3":1, "out.s4": 1
        }
      }, {
        "$group": {
            "_id": {
              "name": "$out.s3",
              "url": "$out.s4"
            }
        }
      }],
      "limit": 10000
    }
  }
  return query
}


var getOyoProAggregatedQuery = function(address, type, appName, appUrl, beginTimestamp, endTimestamp) {
  var query = {
    "v": 3,
    "q": {
      "aggregate": [{
        "$match": getOyoProQuery(address, type, appName, appUrl, beginTimestamp, endTimestamp)
      }, {
        '$project': {
          "out.s3":1, "out.s4": 1,
          'satoshis': {
            '$cond': {
              'if': {
                '$eq': [{'$arrayElemAt': ['$out.e.a', 0]}, address]
              },
              'then': {
                '$arrayElemAt': ['$out.e.v', 0]
              },
              'else': {
                '$cond': {
                  'if': {
                    '$eq': [{'$arrayElemAt': ['$out.e.a', 1]}, address]
                  },
                  'then': {
                    '$arrayElemAt': ['$out.e.v', 1]
                  },
                  'else': {
                    '$cond': {
                      'if': {
                        '$eq': [{'$arrayElemAt': ['$out.e.a', 2]}, address]
                      },
                      'then': {
                        '$arrayElemAt': ['$out.e.v', 2]
                      },
                      'else': 0
                    }
                  }
                }
              }
            }
          }
        }
      }, {
        "$group": {
            "_id": {
              "name": "$out.s3",
              "url": "$out.s4"
            },
            "satoshis": {
              "$sum": "$satoshis"
            }
        }
      }],
      "limit": 10000,
      "sort": {"satoshis": -1}
    }
  }
  return query
}
