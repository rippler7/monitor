var qidPendingPR = "1000443";
var qidAssignedPR = "1000710";
var qidAssignedFBC = "1000231";
var qidInternalRevPR = "1000428";
var qidInternalRevFBC = "1000159";
var qidHours = "1000164"; //-1019757
var apptoken = "dxjuywydk6zb2kxn8pz5daj7fcs";

var APAC = {
	id:"APAC",
	members:["Quinquilleria, Silbeth -Betty","Basadre, Rey -Rey", "DeGuzman, Ediral -Ed", "Hatamosa, Mike -Gab", "Pascual, Christian -Paski"],
	totalHours:0,
	totalNonBillable:0
};
var EMEA = {
	id: "EMEA",
	members: ["Guerrero, Ivan -Master Ivan","Africano, Nixon -Nixon", "Cabalida, Stephen -Stephen", "Dramayo, Lorenciano -Ciano", "Calisang, Ebenezer -Boboi", "Rosell, Christian Adam -Christian"],
	totalHours: 0,
	totalNonBillable:0
};
var NAM_NonAuto_members = {
	id:"NAM_NonAuto",
	members:["Pepito, Arniel -Sirs","Baldomero, Abdella -Del", "DeGuzman, Reynaldo -JR", "Laborte, Niko -Niko", "Pagulong, Lauro -Byakuks"],
	totalHours:0,
	totalNonBillable:0
};
var NAM_Programmatic = {
	id:"NAM_Programmatic",
	members:["Ancog, Jeremy -Master","Abellana, Peter John -PJ","Del Rosario, Emmanuel -Mikee","Imus, Jollie Mae -Jollie","Loquinario, Mary Rose -Mary","Madduma, John -Erick"],
	totalHours:0,
	totalNonBillable:0
};
var Automotive = {
	id:"Automotive",
	members:["Lopez, Ryan -Boss","Mingo, Christian -Sexy Meng","Valdehueza, Joshry Jade -Josh","Villas, John Aldwin"],
	totalHours:0,
	totalNonBillable:0	
};
var Interactive_Designer = {
	id:"Interactive",
	members:["Pantoja, Maureen -Mau","Palapar, James -James"],
	totalHours:0,
	totalNonBillable:0	
};


var Teams = [APAC,EMEA,NAM_NonAuto_members,NAM_Programmatic,Automotive,Interactive_Designer];

var contentModal ="";

var teams = [];
var teams2 = [];
var warningBasket = [];
var overdueBasket = [];
var warningBasketFBC = [];
var overdueBasketFBC = [];
callFBC = 0;
callPR = 0;

function fadeSound(audio){
    if(audio.volume > 0){
        audio.volume -= 0.1;
        setTimeout(fade, 2);
    }else{
        audio.pause();
    }
}

function alertSound(sound){
	var snd = new Audio(sound);
	snd.play();
}

function timeLeft(days){
	var hours = days.toString();
	var measuredRes = hours.split(" ");
	var remaining = Number(measuredRes[0]);
	var timeMeasure = measuredRes[1].toLowerCase();
	if(measuredRes[1] == "days" || measuredRes[1] == "day"){
		remaining = (remaining*24);
	} else if (measuredRes[1] == "mins"){
		remaining = (remaining/60);
	} 
	return remaining;
}

function getGap(dateGiven,timeGiven){
	var nowDateDefault = new Date();
	var EST_Now = (toTimeZone2(nowDateDefault,"America/New_York"));
	var nowDate = new Date(EST_Now);
	var dateSample = Date.parse(dateGiven+", "+timeGiven);
	var testDate = new Date(dateSample);
	var result = (testDate - nowDate)/36e5;
	return result;
}

function getActiveTeams(){
	//console.log("get active teams logic...");

	var nowDateDefault = new Date();
	var timeNowDefault = new Date(toTimeZone2(nowDateDefault,"America/New_York"));

	var h = nowDateDefault.getHours();
	/*
	var ampmText = "am";
	if (h >= 12){
		h = h-12;
		ampmText = "pm";	
	}
	*/
	var m = nowDateDefault.getMinutes();
		/*
	var timeLower = timeGiven.toLowerCase();
	var timeConv = timeLower.split(":");
	var dueHour = Number(timeConv[0]);
	var dueMinute = Number(timeConv[1].split(" ")[0]);
	var dueAmPm = timeConv[1].split(" ")[1];
		*/
	var shiftNow = "NAM";

	if(h >= 7 && h < 14){
		shiftNow = "APAC";
	} else if (h >= 14 && h < 20){
		shiftNow = "EMEA";
	} else {
		shiftNow = "NAM"; 
	}

	/*

	//console.log("timeNowDefault: "+timeNowDefault);

	var nowHours = Number(timeNowDefault.getHours());
	var nowMinutes = Number(timeNowDefault.getMinutes());

	var timeLower = timeGiven.toLowerCase();
	var timeConv = timeLower.split(":");
	var dueHour = Number(timeConv[0]);
	var dueMinute = Number(timeConv[1].split(" ")[0]);

	var ampm = "AM"; 
	if(timeGiven.indexOf("AM") < 0){
		dueHour = dueHour + 12;
	} else {
		if(timeConv[0] == 12){
			dueHour = 0;
		}
	}

	var baseDate = new Date(2000, 0, 1, dueHour, dueMinute);
	var nowDate = new Date(2000, 0, 1, nowHours, nowMinutes);
	//console.log(nowDate);

	var dateAPACEnd1 = new Date(2000, 0, 1, 03, 00);

	var dateAPACStart = new Date(2000, 0, 1, 18, 00);
	var dateAPACEnd = new Date(2000, 0, 2, 03, 00);

	var dateEMEAStart = new Date(2000, 0, 1, 03, 00);
	var dateEMEAEnd = new Date(2000, 0, 1, 12, 00);

	var dateNAMStart = new Date(2000, 0, 1, 09, 00);
	var dateNAMEnd = new Date(2000, 0, 1, 18, 00);

		/*
	(dateAPACStart <= baseDate && baseDate <= dateAPACEnd)? teams.push("apac"):console.log("");
	(dateEMEAStart <= baseDate && baseDate <= dateEMEAEnd)? teams.push("emea"):console.log("");
	(dateNAMStart <= baseDate && baseDate <= dateNAMEnd)? teams.push("nam"):console.log("");
	(baseDate <= dateAPACEnd1)? teams.push("apac"):console.log("");

	(dateAPACStart <= nowDate && nowDate <= dateAPACEnd)? teams2.push("apac"):console.log("");
	(dateEMEAStart <= nowDate && nowDate <= dateEMEAEnd)? teams2.push("emea"):console.log("");
	(dateNAMStart <= nowDate && nowDate <= dateNAMEnd)? teams2.push("nam"):console.log("");
	(nowDate <= dateAPACEnd1)? teams2.push("apac"):console.log("");
		
	var currTeam;
	(dateAPACStart <= baseDate && baseDate <= dateAPACEnd)? currTeam = "APAC": console.log("");
	(dateEMEAStart <= baseDate && baseDate <= dateEMEAEnd)? currTeam = "EMEA": console.log("");
	(dateNAMStart <= baseDate && baseDate <= dateNAMEnd)? currTeam = "NAM":console.log("");
	return currTeam;
	*/
	return shiftNow;

}


function hoursIndicators(bar,hours,total,div){
	$(div).html("");
	$(div).attr("data-preset","fan");
	var strokeColor;
	if(hours >= 40){
		strokeColor = "#55FF33";
	} else if(hours < 32) {
		strokeColor = "#FF3333";
	} else {
		strokeColor = "#FFF";
	}
	if(div.toLowerCase() == "#totalline") {strokeColor="#FF0";} 
 	bar = new ldBar(div, {
 		"stroke": strokeColor
 	});
	var percentage = (hours/total)*100;
	bar.set(percentage);
}


function formatAMPM(date) {
	var n = new Date(date);
  var hours = n.getHours();
  var minutes = n.getMinutes();
  var seconds = n.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '12' should be '0'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;
  var strTime = hours + ':' + minutes + ':' + seconds +' '+ ampm;
  return strTime;
}

function toTimeZone(time, zone) {
    var format = 'hh:mm A';
    return moment(time, format).tz(zone).format(format);
}

function toTimeZone2(time, zone){
	var format = 'YYYY-MM-DD, hh:mm A';
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
	callFBC = 0;
	callPR = 0;
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
			console.log("Get Sizmek Pending PR: ");
			console.log("https://sizmek.quickbase.com/db/bhv6kzfnc"+"?a=API_GenResultsTable&jsa="+1+"&options=csv&qid="+qidPendingPR+"&apptoken="+apptoken);
			qdb_data.forEach(function(item){
				//console.log(item);
				//console.log("Shift: "+item[0]);
				//console.log(item[5]+', '+item[6]);
				getGap(item[5],item[6]);
				/*
				switch(item[0]){
					case "APAC":
						APAC.pendingPRs++;
						break;
					case "EMEA":
						EMEA.pendingPRs++;
						break;  
					case "Cebu NAM Producer Managed":
						NAM_East.pendingPRs++;
						break; 
					case "Programmatic":
						NAM_Programmatic.pendingPRs++;
						break; 
					default:
						NAM_West.pendingPRs++;
				}
				*/
				//console.log(item[4]); //PR status
			});
			$("#prPendingText").html(qdb_numrows);
			//console.log("APAC: "+APAC.pendingPRs);
			//console.log("EMEA: "+EMEA.pendingPRs);
			//console.log("NAM West: "+NAM_West.pendingPRs);
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
			console.log("Assigned PR: ");
			console.log("https://sizmek.quickbase.com/db/bhv6kzfnc"+"?a=API_GenResultsTable&jsa="+1+"&options=csv&qid="+qidAssignedPR+"&apptoken="+apptoken);
			warningBasket = [];
			overdueBasket = [];
			qdb_data.forEach(function(item){
				//console.log(item[9]);
				//console.log(item[2]);
				/*
				var timeLeftItems = Number(timeLeft(item[2]));
				console.log(timeLeftItems+" -> "+item[0]);

				console.log(timeLeftItems <= 2);

				if(timeLeftItems <= 2 && timeLeftItems > 0){
					warningBasket.push(item[0]);
				} else if (timeLeftItems <= 0){
					overdueBasket.push(item[0]);
				}
				*/
				var campaign = item[5].toString().toLowerCase();
				var training = (campaign.indexOf('training'));
				if(!item[4] || item[4] == '' || item[4] == undefined){
						item[4] = '11:59:59 PM';
					}
				//console.log("to Split: "+item[4]);
				var gap = Number(getGap(item[3],item[4]));
				//console.log("GAP: "+gap);
				
				if(training < 0){
					if(gap <= 24 && gap > 0){
						warningBasket.push(item[0]);
					} else if (gap <= 0){
						overdueBasket.push(item[0]);
					}
				}
				
				//console.log("PR GAP: "+gap+" => "+item[0]+", campaign: "+item[5]);
					/*
				switch(item[0]){
					case "APAC":
						APAC.AssignedPRs++;
						break;
					case "EMEA":
						EMEA.AssignedPRs++;
						break;
					case "Cebu NAM Producer Managed":
						NAM_East.AssignedPRs++;
						break;
					case "Programmatic":
						NAM_Programmatic.AssignedPRs++;
						break;   
					default:
						NAM_West.AssignedPRs++;
				}
				*/
				//console.log(item[3]); //PR status
			});
			$("#prAssignedText").html(qdb_numrows);

			if(warningBasket.length > 0 || overdueBasket.length > 0){
				var wItems = "";
				var oItems = "";
				for(var w=0;w<warningBasket.length;w++){
					(w!=warningBasket.length-1)? wItems+= warningBasket[w]+", " : wItems += warningBasket[w];
				}
				for(var o=0;o<overdueBasket.length;o++){
					(o!=overdueBasket.length-1)? oItems+= overdueBasket[o]+", " : oItems += overdueBasket[o];
				}
				if(warningBasket.length > 0){
					contentModal += "<span class='thickText'>PRs Due Soon:</span> "+wItems+"<br />";
				}
				if(overdueBasket.length > 0){
					contentModal += "<span class='redText'><span class='thickText'>PRs Overdue:</span> "+oItems+"</span><br />";
				}
			}
			//console.log("warningBasket: "+warningBasket+", overdueBasket: "+overdueBasket+"<br />");
			callPR = 1;
			callModal();
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
			console.log("Assigned FBC: ");
			console.log("https://sizmek.quickbase.com/db/bhtzcnzkd"+"?a=API_GenResultsTable&jsa="+1+"&options=csv&qid="+qidAssignedFBC+"&apptoken="+apptoken);
			warningBasketFBC = [];
			overdueBasketFBC = [];
			qdb_data.forEach(function(item){
				//console.log(item);
				var account = item[6].toLowerCase();
				var dueDate = item[2];
				var dueTime = item[1];
				var notInternal = true;
				if(dueTime == '' || dueTime == undefined){
					dueTime = "11:59 PM";
				}
				var gap = getGap(dueDate,dueTime);
				if(account.indexOf("sizmek internal") >= 0){
					notInternal = false;
				}
				if(notInternal ==  true){

					if(gap <= 24.0 && gap > 0){
						//console.log("WARNING!!! "+item[0]);
						warningBasketFBC.push(item[0]);
					} else if(gap < 0){
						//console.log("OVERDUE!!! "+item[0]);
						overdueBasketFBC.push(item[0]);
					}
				}
				/*
				switch(item[0]){
					case "APAC":
						APAC.AssignedFBCs++;
						break;
					case "EMEA":
						EMEA.AssignedFBCs++;
						break;
					case "Cebu NAM Producer Managed":
						NAM_East.AssignedFBCs++;
						break;
					case "Programmatic":
						NAM_Programmatic.AssignedFBCs++;
						break;   
					default:
						NAM_West.AssignedFBCs++;
				}
				*/
				//console.log(item[3]); //PR status
			});
			if(warningBasketFBC.lengt > 0 || overdueBasketFBC.length > 0){
					var wItems = "";
					var oItems = "";
					for(var w=0;w<warningBasketFBC.length;w++){
						(w!=warningBasketFBC.length-1)? wItems+= warningBasketFBC[w]+", " : wItems += warningBasketFBC[w]+"<br />";
					}
					for(var o=0;o<overdueBasketFBC.length;o++){
						(o!=overdueBasketFBC.length-1)? oItems+= overdueBasketFBC[o]+", " : oItems += overdueBasketFBC[o]+"<br />";
					}
					if(warningBasketFBC.length > 0){
						contentModal += "<span class='thickText'>FBCs Due Soon:</span> "+wItems+"</span>";
					}
					if(overdueBasketFBC.length > 0){
						contentModal += "<span class='redText'><span class='thickText'>FBCs Overdue</span>: "+oItems+"</span><br />";
					}
				}
			$("#fbcPendingText").html(qdb_numrows);
			callFBC = 1;
			//console.log(teams);
			//console.log(teams2);
			callModal();
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
			console.log("Internal Review PR: ");
			console.log("https://sizmek.quickbase.com/db/bhv6kzfnc"+"?a=API_GenResultsTable&jsa="+1+"&options=csv&qid="+qidInternalRevPR+"&apptoken="+apptoken);
			qdb_data.forEach(function(item){
				////console.log(item[3]); //PR status
				/*
				switch(item[0]){
					case "APAC":
						APAC.internalReviewPR++;
						break;
					case "EMEA":
						EMEA.internalReviewPR++;
						break;
					case "Cebu NAM Producer Managed":
						NAM_East.internalReviewPR++;
						break;
					case "Programmatic":
						NAM_Programmatic.internalReviewPR++;
						break;   
					default:
						NAM_West.internalReviewPR++;
				}
				*/
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
			console.log("Internal Review FBC: ");
			console.log("https://sizmek.quickbase.com/db/bhtzcnzkd"+"?a=API_GenResultsTable&jsa="+1+"&options=csv&qid="+qidInternalRevFBC+"&apptoken="+apptoken);
			qdb_data.forEach(function(item){
				console.log(item[2]); //PR status
				/*
				switch(item[0]){
					case "APAC":
						APAC.internalReviewFBC++;
						break;
					case "EMEA":
						EMEA.internalReviewFBC++;
						break;
					case "Cebu Producer Managed":
						NAM_East.internalReviewFBC++;
						break;
					case "Programmatic":
						NAM_Programmatic.internalReviewFBC++;
						break;  
					default:
						NAM_West.internalReviewFBC++;
				}
				*/
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
			console.log("HOURS: ");
			console.log("https://sizmek.quickbase.com/db/bhxqi55ba?a=API_GenResultsTable&jsa=1&qid="+qidHours+"&apptoken="+apptoken);
			/*
			APAC.nBMonth = 0;
			EMEA.nBMonth = 0;
			NAM_East.nBMonth = 0;
			NAM_West.nBMonth = 0;
			NAM_Programmatic.nBMonth = 0;
			APAC.nBMPercent = 0;
			EMEA.nBMPercent = 0;
			NAM_East.nBMPercent = 0;
			NAM_West.nBMPercent = 0;
			NAM_Programmatic.nBMPercent = 0;
			APAC.twhours = 0,
			EMEA.twhours = 0,
			NAM_East.twhours = 0,
			NAM_West.twhours = 0,
			NAM_Programmatic.twhours = 0,
			APAC.nBthours = 0;
			EMEA.nBthours = 0,
			NAM_East.nBthours = 0,
			NAM_West.nBthours = 0,
			NAM_Programmatic.nBthours = 0
			*/
			//console.log("QB_DATA: ");
			console.log(qdb_data);
			//console.log("HOURS: ");
			qdb_data.forEach(function(item){
					//console.log(item[2]); //display team lead name
					//console.log("Internal Teams: "+item[5].toLowerCase());
					if(!item[1] || item[1] == '' || item[1] == undefined){
						item[1] = '0';
					}
					if(!item[2] || item[2] == '' || item[2] == undefined){
						item[2] = '0';
					}
					if(!item[3] || item[3] == '' || item[3] == undefined){
						item[3] = '0';
					}
					if(!item[4] || item[4] == '' || item[4] == undefined){
						item[4] = '0';
					}	
					var nBM = item[2];
					if(!nBM || nBM == '' || nBM == undefined){
						nBM = '0';
					}
					var nBLMonth = parseInt(item[2]);
					if(!nBLMonth || nBLMonth == '' || nBLMonth == undefined){
						nBLMonth = '0';
					}		
					var tHours = item[1];
					if(!tHours || tHours == '' || tHours == undefined){
						tHours = '0';
					}			
					var Name = item[0].split(" ");
					var firstName = Name[0];
					var lastName = Name[Name.length-1];
					var hoursTeam;
					console.log(lastName+", "+firstName); 
					//console.log("tHours: "+tHours);
					
					for(var i=0;i<Teams.length;i++){
						var counter = Teams[i].members.length;
						for(var j=0;j<counter;j++){
							var tmember = Teams[i].members[j];
							var tlastName = tmember.split(",")[0];
							var tfirstName = tmember.split(",")[1].split("-")[0].split(" ")[1];
							var tnickName = tmember.split(",")[1].split("-")[1];
							if((tfirstName.indexOf(firstName) > -1) && (tlastName.indexOf(lastName) > -1)){
								console.log(tfirstName+".indexOf("+firstName+") = "+tfirstName.indexOf(firstName));
								console.log(tlastName+".indexOf("+lastName+") = "+tlastName.indexOf(lastName));
								console.log(tfirstName+" == "+firstName);
								hoursTeam = Teams[i].id;
								Teams[i].totalHours+=Number(item[1]);
								Teams[i].totalNonBillable+=parseInt(item[2]);
							}
						}
						//console.log(Teams[i].totalHours);
						//console.log(Teams[i].totalHours);
					}
						
					console.log(hoursTeam);
					
					var str = item[0].toLowerCase();
					//console.log(item[12]);
					//console.log(str);
					//console.log(item[3]+"/"+item[14])*100;
					var totalNon = parseInt(item[2])/parseInt(item[1]);
					/*
					switch(str){
						case "apac":
						APAC.hours = item[1];
						APAC.nBMonth += parseInt(nBLMonth);
						APAC.nBMPercent += totalNon;
						APAC.nBthours += parseInt(nBM);
						APAC.twhours += parseInt(tHours);
						$("#apacDiv > span").html(APAC.hours+" hrs");
						break;

						case "emea":
						EMEA.hours = item[1];
						//console.log("EMEA non-Billable: "+nBM);
						//console.log(nBLMonth);
						EMEA.nBMonth += parseInt(nBLMonth);
						EMEA.nBMPercent += totalNon;
						EMEA.nBthours += parseInt(nBM);
						EMEA.twhours += parseInt(tHours);
						$("#emeaDiv > span").html(EMEA.hours+" hrs");
						break;

						case "programmatic":
						NAM_Programmatic.hours = item[1];
						NAM_Programmatic.nBMonth += parseInt(nBLMonth);
						NAM_Programmatic.nBMPercent += totalNon;
						NAM_Programmatic.nBthours += parseInt(nBM);
						NAM_Programmatic.twhours += parseInt(tHours);
						$("#programmaticDiv > span").html(NAM_Programmatic.hours+" hrs");
						break;

						case "cebu nam producer managed":
						NAM_East.hours = item[1];
						NAM_East.nBMonth += parseInt(nBLMonth);
						NAM_East.nBMPercent += totalNon;
						NAM_East.nBthours += parseInt(nBM);
						NAM_East.twhours += parseInt(tHours);
						$("#namEastDiv > span").html(NAM_East.hours+" hrs");
						break;

						case "cebu west":
						NAM_West.hours = item[1];
						NAM_West.nBMonth += parseInt(nBLMonth);
						NAM_West.nBMPercent += totalNon;
						NAM_West.nBthours += parseInt(nBM);
						NAM_West.twhours += parseInt(tHours);
						$("#namWestDiv > span").html(NAM_West.hours+" hrs");
						break;

						default:
						break;
					}
					*/
				
			});
			Teams.forEach(function(c){
				console.log(c.id+" = "+c.totalHours+" in two weeks");
				console.log(c.id+" = "+c.totalNonBillable+" non-billable in two weeks");
			});
			/*
			var totals = ((parseInt(NAM_Programmatic.hours)+parseInt(NAM_West.hours)+parseInt(NAM_East.hours)+parseInt(EMEA.hours)+parseInt(APAC.hours))/5);
			var avetwononbillable = ((parseInt(NAM_Programmatic.nBthours)+parseInt(NAM_West.nBthours)+parseInt(NAM_East.nBthours)+parseInt(EMEA.nBthours)+parseInt(APAC.nBthours)));
			var twtotals = ((parseInt(NAM_Programmatic.twhours)+parseInt(NAM_West.twhours)+parseInt(NAM_East.twhours)+parseInt(EMEA.twhours)+parseInt(APAC.twhours)));
			
			console.log("totals: "+totals);
			console.log("APAC non-Billable 2 weeks: "+ APAC.nBthours);
			console.log("APAC hours 2 weeks: "+ APAC.twhours);
			*/
			//$("#apacBillDiv > span").html(APAC.nBthours+"/"+APAC.twhours+" hours: "+((APAC.nBthours/APAC.twhours)*100).toFixed(2)+"%");
			//$("#apacBillDiv > span").html(APAC.nBthours+"/"+APAC.twhours+" hrs"); //!!!!!!!!!!!!!!!!!!!
			//console.log("EMEA non-Billable 2 weeks: "+ EMEA.nBthours);
			//console.log("EMEA hours 2 weeks: "+ EMEA.twhours);
			//$("#emeaBillDiv > span").html(EMEA.nBthours+"/"+EMEA.twhours+" hrs");  //!!!!!!!!!!!!!!!!!!!!!!
			//console.log("Programmatic non-Billable 2 weeks: "+ NAM_Programmatic.nBthours);
			//console.log("Programmatic hours 2 weeks: "+ NAM_Programmatic.twhours);
			//$("#programmaticBillDiv > span").html(NAM_Programmatic.nBthours+"/"+NAM_Programmatic.twhours+" hrs"); //!!!!!!!!!!!!!!!!!!
			//console.log("NAM West non-Billable 2 weeks: "+ NAM_West.nBthours);
			//console.log("NAM West hours 2 weeks: "+ NAM_West.twhours);
			//$("#westBillDiv > span").html(NAM_West.nBthours+"/"+NAM_West.twhours+" hrs"); //!!!!!!!!!!!!!!!!!!!!!!!!
			//console.log("NAM East non-Billable 2 weeks: "+ NAM_East.nBthours);
			//console.log("NAM East hours 2 weeks: "+ NAM_East.twhours);
			//$("#eastBillDiv > span").html(NAM_East.nBthours+"/"+NAM_East.twhours+" hrs"); //!!!!!!!!!!!!!!!!!!!!!!
			//console.log("Total non-Billable 2 weeks: "+ avetwononbillable);
			//console.log("Total hours 2 weeks: "+ twtotals);
			//$("#totalBillDiv > span").html(avetwononbillable+"/"+twtotals+" hrs"); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			/*
			console.log("APAC non-Billable: "+ APAC.nBMonth);
			console.log("APAC total Hours: "+ APAC.twhours);
			console.log("APAC nonBillable Percentage: "+ (APAC.nBthours/APAC.twhours)*100+"%");
			console.log("EMEA non-Billable: "+ EMEA.nBMonth);
			console.log("APAC non-Billable Percentage: "+ APAC.nBMPercent);
			console.log("EMEA non-Billable Percentage: "+ EMEA.nBMPercent);
			*/ 
			/*
			hoursIndicators(apacBar,APAC.hours,80,"#apacLine");
			hoursIndicators(emeaBar,EMEA.hours,80,"#emeaLine");
			hoursIndicators(programmaticBar,NAM_Programmatic.hours,80,"#programmaticLine");
			hoursIndicators(namEastBar,NAM_East.hours,80,"#namEastLine");
			hoursIndicators(namWestBar,NAM_West.hours,80,"#namWestLine");
			hoursIndicators(totalBar,totals,80,"#totalLine");

			hoursIndicators(apacBillBar,APAC.nBthours,APAC.twhours,"#apacBill");
			hoursIndicators(emeaBillBar,EMEA.nBthours,EMEA.twhours,"#emeaBill");
			hoursIndicators(programmaticBillBar,NAM_Programmatic.nBthours,NAM_Programmatic.twhours,"#programmaticBill");
			hoursIndicators(namWestBillBar,NAM_West.nBthours,NAM_West.twhours,"#westBill");
			hoursIndicators(namEastBillBar,NAM_East.nBthours,NAM_East.twhours,"#eastBill");
			hoursIndicators(totalBillBar,avetwononbillable,twtotals,"#totalBill");

			$("#totalDiv > span").html(totals+" hours");
			*/
			
		},
		complete:function(){
			
		}
	});
}


function callModal(){
	if(callFBC == 1 && callPR == 1){
		if(warningBasket.length > 0 || warningBasketFBC.length > 0 || overdueBasket.length > 0 || overdueBasketFBC.length > 0){
			alertSound('./audio/klang.wav');
			$("#PRFBC_Modal .modal-dialog .modal-content .modal-body").html(contentModal);
					//console.log(warningBasket);
					//console.log(overdueBasket);
					$('#PRFBC_Modal').modal('show');
					var modalTimeout = setTimeout(function(){
					  	$('#PRFBC_Modal').modal('hide');
					  	clearTimeout(modalTimeout);
					},7000);
		}
	}
}

$(document).ready(function(){

	//console.log("ready");
	//showTwitter();
	var dtNow = new Date();
	var h = dtNow.getHours();
	var ampmText = "AM";
	if (h >= 12){
		h = h-12;
		ampmText = "PM";	
	}
	var m = dtNow.getMinutes();
	getSizmekData();
	console.log("GET DATE NOW: "+ h+":"+m+" "+ampmText);
	console.log(dtNow);
	var currTeam = getActiveTeams();
	console.log("currTeam: "+currTeam);
	if(currTeam == "APAC"){
		console.log("It's APAC!");
		document.getElementsByTagName("html")[0].style.backgroundImage = "url(./img/red.jpg)";
	} else if(currTeam == "EMEA"){
		document.getElementsByTagName("html")[0].style.backgroundImage = "url(./img/purple.jpg)";
	} else {
		document.getElementsByTagName("html")[0].style.backgroundImage = "url(./img/homepage-hero.jpg)";
	}
   	$(".TickerNews").newsTicker();
    var liveCount = setInterval(liveTime,1000); 
    var showTweet = setInterval(function(){
    	//showTwitter();
    	contentModal ="";
    	getSizmekData();
    },60 * 1000);
    new slideShow('slideshow-wrapper','slideshow');
	var flip1 = new FlipSlider({
		startIndex: 1,
	    container: document.querySelector("#flipper"),
	    timeout:2000
	});

	var flip2 = new FlipSlider({ 
		startIndex: 0,
		container: document.querySelector("#graphs"),
		timeout:4000
	});

	//console.log("time difference: "+Number(getGap("02-28-2018","12:30 AM")));
});