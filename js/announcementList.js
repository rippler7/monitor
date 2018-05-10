function showAlerts(){
	var timeOutSet;
	var greeting = "";
	var annLine = "";
	var announce = "";
	var speed = 5;
	console.log("bday refresh!");
	var birthdays = [];
	var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var currDatRanomizer = Date.now();
	//var totalHours = currDatRanomizer.getHours();
	var getRand = Math.floor(Math.random())+currDatRanomizer;
	console.log("totalHours: "+getRand);
	var urlRefresh = "http://jermanation.com/monitor/announcements.js"+"?rand="+getRand.toString();
	console.log(urlRefresh);
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
			console.log($("ul#tickerAnnouncements li").length);
			for(var i = 0; i<$("ul#tickerAnnouncements li").length;i++){
				var currList = $("ul#tickerAnnouncements li")[i];
				console.log(currList);
				console.log(currList.getBoundingClientRect().left+currList.getBoundingClientRect().width);
			}
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
			//console.log(v);
			i.forEach(function(b){
				var c = b.toString();
				var celeb = c.split("=");
				var name = celeb[0];
				var dateFormat = Date.parse();
				var bDate = new Date(dateFormat);
				var bDay = celeb[1].split(" ")[1];
				var bDateFull = (currMonth+1)+"/"+bDay+"/"+currYear;
				//console.log(b=celeb[0]+", "+((currMonth+1)+"/"+bDay+"/"+currYear));
				//console.log(bDateFull);
				var gap = getGap(bDateFull,"12:00 AM");
				//console.log("BDAY GAP: "+gap);
				if(gap <= 120 && gap > 0){
					greeting = "<span class='redText'>It's "+celeb[0]+"'s DAY</span>this "+monthNames[currMonth]+" "+bDay+"!!! ";
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
