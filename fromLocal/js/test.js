var qidPendingPR = "1000443";
var qidAssignedPR = "1000710";
var qidAssignedFBC = "1000231";
var qidInternalRevPR = "1000428";
var qidInternalRevFBC = "1000159";
var qidHours = "-1019757";
//-1019757
//-1019627
var apptoken = "dxjuywydk6zb2kxn8pz5daj7fcs";

function toTimeZone2(time, zone){
	var format = 'YYYY-MM-DD, hh:mm A';
    return moment(time, format).tz(zone).format(format);
}

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
			console.log("https://sizmek.quickbase.com/db/bhv6kzfnc?options=csv&jsa=1&a=API_GenResultsTable&qid="+qidAssignedPR+"&apptoken="+apptoken);
			qdb_data.forEach(function(item){
				//console.log(item);
				//console.log(item[3]);
				//console.log(item[4]);
			});
		}
});