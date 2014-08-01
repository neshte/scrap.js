var request = require("request");
var cheerio = require('cheerio');
var csv = require("fast-csv");
var fs = require("fs")

var currentrequests = 0;
var maxrequests = 1000;
var recordsdumped = 0;

var url = "http://www.example.com";
var headers = {};

var trselector = "#thetable tbody tr";
var tdselector = "td";

function dumpPage(){

	request({
		uri: url,
		headers: headers,
		method: "GET"
	},function(error, response, body){
	
		var $ = cheerio.load(body);
		var $trs = $(trselector);
		var rows = [];
		for(var i=0; i<$trs.length; i++){
			var $tds = $(tdselector,$trs[i]);
			var row = [];
			for(var j=0; j<14; j++){
				row.push($($tds[j]).text().trim());
			}
			rows.push(row);
		}
		currentrequests++;
		recordsdumped += rows.length;
		csv.writeToPath("csvs/list"+currentrequests+".csv",rows).on("finish", function(){
			fs.appendFile("csvs/lista"+currentrequests+".csv","\n",function(){});
			console.log("Pages/Files: "+currentrequests+" Records: "+recordsdumped+" RemainingPages: "+(maxrequests-currentrequests)+" RemainingRecords: "+((maxrequests*50)-(currentrequests*50)));
			if(currentrequests < maxrequests){
				dumpPage();
			}
		});
		
	});

}

dumpPage();