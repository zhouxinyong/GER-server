/**
 * @author zhaodonghong
 * @fileoverview api report/getAll.js
 * @date 2017/03/03
 */


module.exports = function(req, res){
	let itemNum = 10;
	let from = (req.query.pages || 1 - 1) * itemNum;
	console.log(from, itemNum);
	let _this = this;
	let aa = this.search({
		index: 'logstash-web_access*',  //h5
		// index: 'logstash-pre_adev_app_pc*',  //融合
		body: {
			// 3.1-3.15 err_msg 所有数据
			"size" : itemNum,
			"from" : from,
			"query" : {
				"bool": {
					"must" : [
						{
							"regexp": {
				    			"request_url": ".*err_msg=.*"
				    		}
						},
						{
							"match": {
				    			"project_name": "JS"
				    		}
						},
						{
	    					"range": {
		    					"@timestamp": {
									"gte": "2017-03-01",
									"lte": "2017-03-15"
								}
		    				}
		    			}
					]
	    		}
			},
    		"aggregations": {
    			"aggByReferer": {
					"terms": {
						"field": "referer.raw"
					}
				}
    		},
    		"sort": [
				{
					"@timestamp": {
						"order": "desc" //asc正序(默认)    desc倒序
					}
				}
			]
		}
	}).then(results => {
		var data = {};
		data.flag = 1;
		data.buckets = results.aggregations.aggByReferer.buckets;
		data.buckets.forEach(function (i, v){
			console.log(i.key, i.doc_count);
		});
		res.status(200).json(data);
		// res.status(200).json(results);
	});
}

