
console.log("start");

var qidPendingPR = "1000710";
var qidAssignedPR = "1000231";
var apptoken = "dxjuywydk6zb2kxn8pz5daj7fcs";

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;
  var strTime = hours + ':' + minutes + ':' + seconds +' '+ ampm;
  return strTime;
}

function toTimeZone(time, zone) {
    var format = 'hh:mm A';
    return moment(time, format).tz(zone).format(format);
}

function liveTime(){
	var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();

    var timestamp = date.getTime();

    $("#bigDate").html(dd);
    $("#bigMonth").html(monthNames[mm]);
    $("#bigYear").html(yyyy);
  
    var tz = moment.tz.guess();
    var timeManila = toTimeZone(date,tz);
    var timeEST = toTimeZone(date,"America/New_York");
    var timePST = toTimeZone(date,"America/Los_Angeles");
    var timeGMT = toTimeZone(date,"Etc/GMT+0"); 
    var timeAEST = toTimeZone(date,"Australia/Melbourne");

    $("#mnlTime").html(timeManila);
    $("#estTime").html(timeEST);
    $("#pstTime").html(timePST);
    $("#gmtTime").html(timeGMT);
    $("#aestTime").html(timeAEST);
}

$(document).ready(function(){

	console.log("ready");

	$.ajax({
		url:"https://sizmek.quickbase.com/db/bhv6kzfnc",
		data:{
			"a":"API_GenResultsTable",
			"jsa":1,
			"options":"csv",
			"qid":qidPendingPR,
			"apptoken":apptoken,
			"test":""
		},
		dataType:"script",
		method:"GET",
		success:function(){
			console.log(qdb_numcols);
			console.log(qdb_numrows);
			console.log(qdb_data);
			qdb_data.forEach(function(item){
				console.log(item);
				console.log(item[10]); //PR status
			})
		},
		complete:function(){
			
		}
	});

	$.ajax({
		url:"https://sizmek.quickbase.com/db/bhtzcnzkd",
		data:{
			"a":"API_GenResultsTable",
			"jsa":1,
			"options":"csv",
			"qid":qidAssignedPR,
			"apptoken":apptoken,
			"test":""
		},
		dataType:"script",
		method:"GET",
		success:function(){
			console.log(qdb_numcols);
			console.log(qdb_numrows);
			console.log(qdb_data);
			qdb_data.forEach(function(item){
				console.log(item);
				console.log(item[3]); //PR status
			})
		},
		complete:function(){
			
		}
	});

	var configProfile = {
	  "profile": {"screenName": 'sizmek'},
	  "domId": 'rightContent',
	  "maxTweets": 2,
	  "enableLinks": false, 
	  "showUser": true,
	  "showTime": true,
	  "showImages": true,
	  "lang": 'en'
	};
	twitterFetcher.fetch(configProfile);

   	$(".TickerNews").newsTicker();
    var liveCount = setInterval(liveTime,1000);

    new slideShow();

});