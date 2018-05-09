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
	totalHoursB:0,
	totalNonBillable:0
};
var EMEA = {
	id: "EMEA",
	members: ["Guerrero, Ivan -Master Ivan","Africano, Nixon -Nixon", "Cabalida, Stephen -Stephen", "Dramayo, Lorenciano -Ciano", "Calisang, Ebenezer -Boboi", "Rosell, Christian Adam -Christian"],
	totalHours: 0,
	totalHoursB:0,
	totalNonBillable:0
};
var NAM_NonAuto = {
	id:"NAM_NonAuto",
	members:["Pepito, Arniel -Sirs","Baldomero, Abdella -Del", "DeGuzman, Reynaldo -JR", "Laborte, Niko -Niko", "Pagulong, Lauro -Byakuks"],
	totalHours:0,
	totalHoursB:0,
	totalNonBillable:0
};
var NAM_Programmatic = {
	id:"NAM_Programmatic",
	members:["Ancog, Jeremy -Master","Abellana, Peter John -PJ","Del Rosario, Emmanuel -Mikee","Imus, Jollie Mae -Jollie","Loquinario, Mary Rose -Mary","Madduma, John -Erick"],
	totalHours:0,
	totalHoursB:0,
	totalNonBillable:0
};
var Automotive = {
	id:"Automotive",
	members:["Lopez, Ryan -Boss","Mingo, Christian -Sexy Meng","Valdehueza, Joshry Jade -Josh","Villas, John Aldwin"],
	totalHours:0,
	totalHoursB:0,
	totalNonBillable:0	
};
var Interactive_Designer = {
	id:"Interactive",
	members:["Pantoja, Maureen -Mau","Palapar, James -James"],
	totalHours:0,
	totalHoursB:0,
	totalNonBillable:0	
};


var Teams = [APAC,EMEA,NAM_NonAuto,NAM_Programmatic,Automotive,Interactive_Designer];

var contentModal ="";
var apacBar;
var emeaBar;
var namBar_Programmatic;
var namBar_NonAuto;
var namBar_Auto;
var interDesBar;
var apacBillBar;
var emeaBillBar;
var programmaticBillBar;
var namBillBar_NonAuto;
var namBillBar_Auto;
var interDesBillBar;

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
	//console.log(testDate+" - "+nowDate+" = "+ (testDate - nowDate)/36e5);
	//console.log(testDate - nowDate);
	return result;
}

function getActiveTeams(){
	//console.log("get active teams logic...");

	var nowDateDefault = new Date();
	var timeNowDefault = new Date(toTimeZone2(nowDateDefault,"America/New_York"));
	var h = nowDateDefault.getHours();
	var m = nowDateDefault.getMinutes();
	var shiftNow = "NAM";

	if(h >= 7 && h < 14){
		shiftNow = "APAC";
	} else if (h >= 14 && h < 20){
		shiftNow = "EMEA";
	} else {
		shiftNow = "NAM"; 
	}
	return shiftNow;
}


function hoursIndicators(bar,hours,total,div){
	var res = Math.floor(Math.round((hours/total)*100));
	$(div).html("");
	$(div).attr("data-preset","fan");
	console.log(div.toLowerCase().indexOf("bill")+", with hours: "+hours+"/"+total+" = "+(hours/total)*100+"%");
	var strokeColor;
	if(div.toLowerCase().indexOf("bill") > -1){
		if(res >= 20){
			strokeColor = "#FF3333";
		} else if(res < 20 && res > 0) {
			strokeColor = "#55FF33";
		} else {
			strokeColor = "#FFF";
		}
	} else {
		if(res >= 40){
			strokeColor = "#55FF33";
		} else if(res < 40) {
			strokeColor = "#FF3333";
		} else {
			strokeColor = "#FFF";
		}
	}
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

			});
			$("#prPendingText").html(qdb_numrows);
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
			//console.log(qdb_data);
			//console.log("HOURS: ");
			Teams.forEach(function(team){
				team.totalHours = 0;
				team.totalHoursB = 0;
				team.totalNonBillable = 0;
			});

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
					//console.log(lastName+", "+firstName); 
					//console.log("tHours: "+tHours);
					
					for(var i=0;i<Teams.length;i++){
						var counter = Teams[i].members.length;
						for(var j=0;j<counter;j++){
							var tmember = Teams[i].members[j];
							var tlastName = tmember.split(",")[0];
							var tfirstName = tmember.split(",")[1].split("-")[0].split(" ")[1];
							var tnickName = tmember.split(",")[1].split("-")[1];
							if((tfirstName.indexOf(firstName) > -1) && (tlastName.indexOf(lastName) > -1)){
								/*
								console.log(tfirstName+".indexOf("+firstName+") = "+tfirstName.indexOf(firstName));
								console.log(tlastName+".indexOf("+lastName+") = "+tlastName.indexOf(lastName));
								console.log(tfirstName+" == "+firstName);
								*/
								hoursTeam = Teams[i].id;
								Teams[i].totalHours+=Number(item[4]);
								Teams[i].totalHoursB+=Number(item[1]);
								Teams[i].totalNonBillable+=parseInt(item[2]);
							}
						}
						//console.log(Teams[i].totalHours);
						//console.log(Teams[i].totalHours);
					}
						
					//console.log(firstName+" is in "+hoursTeam);
					
					var str = item[0].toLowerCase();
					//console.log(item[12]);
					//console.log(str);
					//console.log(item[3]+"/"+item[14])*100;
					var totalNon = parseInt(item[2])/parseInt(item[1]);
				
			});
			/*
			Teams.forEach(function(c){
				console.log(c.id+" = "+c.totalHours+" in two weeks");
				console.log(c.id+" = "+c.totalNonBillable+" non-billable in two weeks");
			});

			*/
			//SHOW NUMBERS TEXT ON BILLABLE
			$("#apacDiv > span").html(Math.round((APAC.totalHours/APAC.members.length))+"/40 hrs"); //!!!!!!!!!!!!!!!!!!!
			$("#emeaDiv > span").html(Math.round((EMEA.totalHours/EMEA.members.length))+"/40 hrs");  //!!!!!!!!!!!!!!!!!!!!!!
			$("#programmaticDiv > span").html(Math.round((NAM_Programmatic.totalHours/NAM_Programmatic.members.length))+"/40 hrs"); //!!!!!!!!!!!!!!!!!!!
			$("#namWestDiv > span").html(Math.round((NAM_NonAuto.totalHours/NAM_NonAuto.members.length))+"/40 hrs");  //!!!!!!!!!!!!!!!!!!!!!!
			$("#namEastDiv > span").html(Math.round((Automotive.totalHours/Automotive.members.length))+"/40 hrs"); //!!!!!!!!!!!!!!!!!!!
			$("#totalDiv > span").html(Math.round((Interactive_Designer.totalHours/Interactive_Designer.members.length))+"/40 hrs");  //!!!!!!!!!!!!!!!!!!!!!!

			$("#apacBillDiv > span").html(Math.round(APAC.totalNonBillable)+"/"+Math.round(APAC.totalHoursB)); //!!!!!!!!!!!!!!!!!!!
			$("#emeaBillDiv > span").html(Math.round(EMEA.totalNonBillable)+"/"+Math.round(EMEA.totalHoursB));  //!!!!!!!!!!!!!!!!!!!!!!
			$("#programmaticBillDiv > span").html(Math.round(NAM_Programmatic.totalNonBillable)+"/"+Math.round(NAM_Programmatic.totalHoursB)); //!!!!!!!!!!!!!!!!!!!
			$("#westBillDiv > span").html(Math.round(NAM_NonAuto.totalNonBillable)+"/"+Math.round(NAM_NonAuto.totalHoursB));  //!!!!!!!!!!!!!!!!!!!!!!
			$("#eastBillDiv > span").html(Math.round(Automotive.totalNonBillable)+"/"+Math.round(Automotive.totalHoursB)); //!!!!!!!!!!!!!!!!!!!
			$("#totalBillDiv > span").html(Math.round(Interactive_Designer.totalNonBillable)+"/"+Math.round(Interactive_Designer.totalHoursB));  //!!!!!!!!!!!!!!!!!!!!!!
			
			//SHOW GRAPHS
			hoursIndicators(apacBar,(APAC.totalHours/APAC.members.length),40,"#apacLine");
			hoursIndicators(emeaBar,(EMEA.totalHours/EMEA.members.length),40,"#emeaLine");
			hoursIndicators(namBar_Programmatic,(NAM_Programmatic.totalHours/NAM_Programmatic.members.length),40,"#programmaticLine");
			hoursIndicators(namBar_NonAuto,(NAM_NonAuto.totalHours/NAM_NonAuto.members.length),40,"#namWestLine");
			hoursIndicators(namBar_Auto,(Automotive.totalHours/Automotive.members.length),40,"#namEastLine");
			hoursIndicators(interDesBar,(Interactive_Designer.totalHours/Interactive_Designer.members.length),40,"#totalLine");

			hoursIndicators(apacBillBar,APAC.totalNonBillable,APAC.totalHoursB,"#apacBill");
			hoursIndicators(emeaBillBar,EMEA.totalNonBillable,EMEA.totalHoursB,"#emeaBill");
			hoursIndicators(programmaticBillBar,NAM_Programmatic.totalNonBillable,NAM_Programmatic.totalHoursB,"#programmaticBill");
			hoursIndicators(namBillBar_NonAuto,NAM_NonAuto.totalNonBillable,NAM_NonAuto.totalHoursB,"#westBill");
			hoursIndicators(namBillBar_Auto,Automotive.totalNonBillable,Automotive.totalHoursB,"#eastBill");
			hoursIndicators(interDesBillBar,Interactive_Designer.totalNonBillable,Interactive_Designer.totalHoursB,"#totalBill");
			
		},
		complete:function(){
			
		}
	});
}


function callModal(){
	if(callFBC == 1 && callPR == 1){
		if(warningBasket.length > 0 || warningBasketFBC.length > 0 || overdueBasket.length > 0 || overdueBasketFBC.length > 0){
			$("#PRFBC_Modal .modal-dialog .modal-content .modal-body").html(contentModal);
					//console.log(warningBasket);
					//console.log(overdueBasket);
					$('#PRFBC_Modal').modal('show');
					var modalTimeout = setTimeout(function(){
					  	$('#PRFBC_Modal').modal('hide');
					  	clearTimeout(modalTimeout);
					},7000);
					alertSound('./audio/klang.wav');
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
    var liveCount = setInterval(function(){
    	liveTime();
    },1000); 
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
	//$(".TickerNews").newsTicker();
	//console.log("time difference: "+Number(getGap("02-28-2018","12:30 AM")));
});