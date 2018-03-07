function showAlerts(){
	console.log("bday refresh!");
	var birthdays = [];
	var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	$.ajax({
		url:"http://jermanation.com/monitor/announcements.js",
		method:"GET",
		dataType:"script",
		success:function(data){
			eval(data);
			//console.log(jan);
			birthdays = [jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];
			alertNear(birthdays);
			showAnnouncements(announcements);
		}
	});
	function alertNear(bdays){
		var currDate = new Date();
		var currYear = currDate.getFullYear();
		var currentMonth = currDate.getMonth();
		console.log(currYear);
		var greeting = "";
		var annLine = "";
		bdays.forEach(function(i,v){
			var currMonth = v;
			console.log(v);
			i.forEach(function(b){
				var c = b.toString();
				var celeb = c.split("=");
				var name = celeb[0];
				var dateFormat = Date.parse();
				var bDate = new Date(dateFormat);
				var bDay = celeb[1].split(" ")[1];
				var bDateFull = (currMonth+1)+"/"+bDay+"/"+currYear;
				console.log(b=celeb[0]+", "+((currMonth+1)+"/"+bDay+"/"+currYear));
				console.log(bDateFull);
				var gap = getGap(bDateFull,"12:00 AM");
				console.log("BDAY GAP: "+gap);
				if(gap <= 120 && gap > 0){
					greeting = "<span class='redText'>HAPPY BIRTHDAY, "+celeb[0]+"</span>this "+monthNames[currMonth]+" "+bDay+"!!! ";
					annLine += '<div class="ti_news"><span class="blueText">:: BIRTHDAY:</span> '+greeting+'::</div>';
				}
			});
		});
		console.log(annLine);
		$("#tickerAnnouncements").html("");
		$("#tickerAnnouncements").html(annLine);
	}
	function showAnnouncements(ann){
		var announce = "";
		console.log(ann);
		ann.forEach(function(a){
			announce += '<div class="ti_news"><span class="blueText">::ATT::</span>'+a+'::</div>';
		});
		$("#tickerAnnouncements").append(announce);
	}
}
