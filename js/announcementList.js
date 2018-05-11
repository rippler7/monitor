function showAlerts(){
	var timeOutSet;
	var greeting = "";
	var annLine = "";
	var announce = "";
	var speed = 5;
	var birthdays = [];
	//var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var jan = {
		mname:"January",
		celebrants:[
		"Joshry = 6",
		"Arniel = 11"
		]
	};
	var feb = {
		mname:"February",
		celebrants:[
		"Khackie = 26", 
		"Ryan = 28"
		]
	};
	var mar = {
		mname:"March",
		celebrants:[
		"Ian Haigh = 2", 
		"Jeremy = 16", 
		"Lorenciano = 18", 
		"Christian R. = 30"
		]
	};
	var apr = {
		mname:"April",
		celebrants:[
		"test 2 = 9",
		"test 2 = 10"
		]
	};
	var may = {
		mname:"May",
		celebrants:[
		"May test 2 = 12",
		"Automation Test = 13"
		]
	};
	var jun = {
		mname:"June",
		celebrants:[
		]
	};
	var jul = {
		mname:"July",
		celebrants:[
		]
	};
	var aug = {
		mname:"August",
		celebrants:[
		]
	};
	var sep = {
		mname:"September",
		celebrants:[
		]
	};
	var oct = {
		mname:"October",
		celebrants:[
		]
	};
	var nov = {
		mname:"November",
		celebrants:[
		]
	};
	var dec = {
		mname:"December",
		celebrants:[
		]
	};
	var currDatRanomizer = Date.now();
	//var totalHours = currDatRanomizer.getHours();
	var getRand = Math.floor(Math.random())+currDatRanomizer;
	var urlRefresh = "http://jermanation.com/monitor/announcements.js"+"?rand="+getRand.toString();
	$.ajax({
		url: urlRefresh,
		method:"GET",
		dataType:"script",
		success:function(data){
			$("ul#tickerAnnouncements").innerHTML = "";
			eval(data);
			birthdays = [jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];
			alertNear(birthdays);
			showAnnouncements(announcements);
			//$("ul#tickerAnnouncements").liScroll();
			$("#newsTicker").newsTicker();
		}
	});
	function alertNear(bdays){
		var currDate = new Date();
		var currYear = currDate.getFullYear();
		var currentMonth = currDate.getMonth();
		//console.log(currYear);
		$("ul#tickerAnnouncements").innerHTML = "";
		bdays.forEach(function(i,v){
			var currMonth = v;
			var monthly = i.celebrants;
			//console.log(v);
			monthly.forEach(function(b){
				var c = b.toString();
				var celeb = c.split(" = ");
				var name = celeb[0];
				var dateFormat = Date.parse();
				var bDate = new Date(dateFormat);
				var bDay = celeb[1].split(" ")[0];
				var bDateFull = (currMonth+1)+"/"+bDay+"/"+currYear;
				//console.log(b=celeb[0]+", "+((currMonth+1)+"/"+bDay+"/"+currYear));
				//console.log(bDateFull);
				//console.log(name);
				//console.log(bDay);
				var gap = getGap(bDateFull,"12:00 AM");
				//console.log("BDAY GAP: "+gap);
				if(gap <= 120 && gap > 0){
					greeting = "<span class='redText'>It's "+celeb[0]+"'s DAY</span>this "+i.mname+" "+bDay+"!!! ";
					annLine += '<li class="ti_news"><div><span class="blueText">:: CELEBRATING:</span> '+greeting+'::</div></li>';
				}
			});
		});
		//console.log(annLine);
		$("ul#tickerAnnouncements").append(annLine);
	}
	function showAnnouncements(ann){
		var announce = "";
		//console.log(ann);
		ann.forEach(function(a){
			announce += '<li class="ti_news"><div><span class="blueText">::ATT::</span>'+a+'::</div></li>';
		});
		$("ul#tickerAnnouncements").append(announce);
	}
}
