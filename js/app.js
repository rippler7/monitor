
console.log("start");

var qidPendingPR = "1000443";
var qidAssignedPR = "1000710";
var qidAssignedFBC = "1000231";
var qidInternalRevPR = "1000428";
var qidInternalRevFBC = "1000159";
var qidHours = "-1019418";
var apptoken = "dxjuywydk6zb2kxn8pz5daj7fcs";

var APAC = {
	"pendingPRs":0,
	"AssignedPRs":0,
	"AssignedFBCs":0,
	"internalReviewPR":0,
	"internalReviewFBC":0,
	"hours":0
}

var EMEA = {
	"pendingPRs":0,
	"AssignedPRs":0,
	"AssignedFBCs":0,
	"internalReviewPR":0,
	"internalReviewFBC":0,
	"hours":0
}

var NAM_West = {
	"pendingPRs":0,
	"AssignedPRs":0,
	"AssignedFBCs":0,
	"internalReviewPR":0,
	"internalReviewFBC":0,
	"hours":0
}

var NAM_East = {
	"pendingPRs":0,
	"AssignedPRs":0,
	"AssignedFBCs":0,
	"internalReviewPR":0,
	"internalReviewFBC":0,
	"hours":0
}

var Name_Programmatic = {  
	"pendingPRs":0,
	"AssignedPRs":0,
	"AssignedFBCs":0,
	"internalReviewPR":0,
	"internalReviewFBC":0,
	"hours":0
}

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

function showTwitter(){
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
}

function getSizmekData(){
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
			//console.log(qdb_numcols);
			//console.log("Number of Pending: "+qdb_numrows);
			//console.log(qdb_data);
			qdb_data.forEach(function(item){
				//console.log(item);
				//console.log("Shift: "+item[0]);
				switch(item[0]){
					case "APAC":
						APAC.pendingPRs++;
						break;
					case "EMEA":
						EMEA.pendingPRs++;
						break;  
					case "Cebu NAM East/Central":
						NAM_East.pendingPRs++;
						break;  
					default:
						NAM_West.pendingPRs++;
				}
				//console.log(item[4]); //PR status
			});
			$("#prPendingText").html(qdb_numrows);
			console.log("APAC: "+APAC.pendingPRs);
			console.log("EMEA: "+EMEA.pendingPRs);
			console.log("NAM West: "+NAM_West.pendingPRs);
		},
		complete:function(){
			
		}
	});

	$.ajax({
		url:"https://sizmek.quickbase.com/db/bhv6kzfnc",
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
			//console.log(qdb_numcols);
			//console.log(qdb_numrows);
			//console.log(qdb_data);
			qdb_data.forEach(function(item){
				//console.log(item);
				switch(item[0]){
					case "APAC":
						APAC.AssignedPRs++;
						break;
					case "EMEA":
						EMEA.AssignedPRs++;
						break;
					case "Cebu NAM East/Central":
						NAM_East.AssignedPRs++;
						break;  
					default:
						NAM_West.AssignedPRs++;
				}
				//console.log(item[3]); //PR status
			});
			$("#prAssignedText").html(qdb_numrows);
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
			"qid":qidAssignedFBC,
			"apptoken":apptoken,
			"test":""
		},
		dataType:"script",
		method:"GET",
		success:function(){
			//console.log(qdb_numcols);
			//console.log(qdb_numrows);
			//console.log(qdb_data);
			qdb_data.forEach(function(item){
				//console.log(item);
				switch(item[0]){
					case "APAC":
						APAC.AssignedFBCs++;
						break;
					case "EMEA":
						EMEA.AssignedFBCs++;
						break;
					case "Cebu NAM East/Central":
						NAM_East.AssignedFBCs++;
						break;  
					default:
						NAM_West.AssignedFBCs++;
				}
				//console.log(item[3]); //PR status
			});
			$("#fbcPendingText").html(qdb_numrows);
		},
		complete:function(){
			
		}
	});

	$.ajax({
		url:"https://sizmek.quickbase.com/db/bhv6kzfnc",
		data:{
			"a":"API_GenResultsTable",
			"jsa":1,
			"options":"csv",
			"qid":qidInternalRevPR,
			"apptoken":apptoken,
			"test":""
		},
		dataType:"script",
		method:"GET",
		success:function(){
			//console.log(qdb_numcols);
			//console.log(this);
			//console.log(qdb_data);
			//console.log(qdb_data.length);
			qdb_data.forEach(function(item){
				////console.log(item[3]); //PR status
				switch(item[0]){
					case "APAC":
						APAC.internalReviewPR++;
						break;
					case "EMEA":
						EMEA.internalReviewPR++;
						break;
					case "Cebu NAM East/Central":
						NAM_East.internalReviewPR++;
						break;  
					default:
						NAM_West.internalReviewPR++;
				}
			});

			$('#prInternalReviewText').html(qdb_numrows);
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
			"qid":qidInternalRevFBC,
			"apptoken":apptoken,
			"test":""
		},
		dataType:"script",
		method:"GET",
		success:function(){
			//console.log(qdb_numcols);
			//console.log(this);
			//console.log(qdb_data);
			//console.log(qdb_data.length);
			qdb_data.forEach(function(item){
				//console.log(item[3]); //PR status
				switch(item[0]){
					case "APAC":
						APAC.internalReviewFBC++;
						break;
					case "EMEA":
						EMEA.internalReviewFBC++;
						break;
					case "Cebu NAM East/Central":
						NAM_East.internalReviewFBC++;
						break;  
					default:
						NAM_West.internalReviewFBC++;
				}
			});

			$('#fbcInternalReviewText').html(qdb_numrows);
		},
		complete:function(){
			
		}
	});

	$.ajax({
		url:"https://sizmek.quickbase.com/db/bhxqi55ba",
		data:{
			"a":"API_GenResultsTable",
			"jsa":1,
			"qrppg":200,
			"options":"csv",
			"qid":qidHours,
			"apptoken":apptoken,
			"test":""
		},
		dataType:"script",
		method:"GET",
		success:function(){
			//console.log(qdb_numcols);
			console.log("QB_DATA: ");
			console.log(qdb_data);
			console.log("HOURS: ");
			qdb_data.forEach(function(item){
					//console.log(item[2]); //display team lead name
					var str = item[2].toLowerCase();
					//console.log(item[12]);
					//console.log(str);
					switch(str){
						case "apac":
						APAC.hours = item[12];
						break;

						case "emea":
						EMEA.hours = item[12];
						break;

						case "programmatic":
						Name_Programmatic.hours = item[12];
						break;

						case "cebu east":
						NAM_East.hours = item[12];
						break;

						case "cebu west":
						NAM_West.hours = item[12];
						break;

						default:
						break;
					}
				
			});
			console.log("APAC.hours: "+APAC.hours);
			console.log("EMEA.hours: "+EMEA.hours);
			console.log("NAM_Programmatic.hours: "+Name_Programmatic.hours);
			console.log("NAM_East.hours: "+NAM_East.hours);
			console.log("NAM_West.hours: "+NAM_West.hours);
			//$('#fbcInternalReviewText').html(qdb_numrows);
		},
		complete:function(){
			
		}
	});


}

$(document).ready(function(){

	console.log("ready");
	showTwitter();
	getSizmekData();

   	$(".TickerNews").newsTicker();
    var liveCount = setInterval(liveTime,1000); 
    var showTweet = setInterval(function(){
    	showTwitter();
    	getSizmekData();
    },15 * 1000);
    new slideShow('slideshow-wrapper','slideshow');
	var flip1 = new FlipSlider({
		startIndex: 1,
	    container: document.querySelector("#flipper")
	});
});