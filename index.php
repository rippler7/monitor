<!DOCTYPE html>
<html>
<head>
	<title>Sizmek Creative Team Monitor Display</title>
	<script type="text/javascript" src="node_modules/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/jquery.tickerNews.js"></script>
	<!--<script type="text/javascript" src="./js/liScroll.js"></script>-->
	<script src="node_modules/moment/moment.js"></script>
	<script src="node_modules/moment-timezone/builds/moment-timezone-with-data.js"></script>
	<script src="./js/rotator.js"></script>
	<script src="./js/loading-bar.js"></script>
	<script src="./js/twitterFetcher_min.js"></script>
	<link rel="stylesheet" href="css/reset.css" />
	<link rel="stylesheet" type="text/css" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="node_modules/bootstrap/dist/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="css/flip-slider.css" />
	<link rel="stylesheet" href="css/loading-bar.css" />
	<link rel="stylesheet" href="css/style.css" />
</head>
<body>
	<div id="mainDiv" class="container">
		<div class="row">
			<div id="headerBox" class="container center">				
				<table id="navHead" class="table">
					<thead>
						<th id="logoBox" class="th">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 351.07 90"><defs><style>.a{fill:none;}.b{clip-path:url(#a);}.c{fill:#fff;}</style><clipPath id="a" transform="translate(0 0)"><rect class="a" width="351.07" height="90"/></clipPath></defs><title>logo</title><g class="b"><path class="c" d="M51.34.34H27C8,.34,1.28,14.15,1.28,27.08c0,23.32,27.88,26.69,31.51,27.79,6.85,2.07,8.25,4.72,8.12,9.71C40.67,74,33.1,74.75,27.73,75.11c-4.21.29-17.51-.5-27.73-1.31V89s15,1.17,31.6,1c18.88-.21,24.69-13.81,24.66-26.74,0-18.52-13.53-22.18-20.08-23.8C31.75,38.35,17.24,36.21,17,26.14c-.07-2.8-.36-10.41,10.82-11.08H50.56c6.45.3,8.91,2.21,9.92,4.44l15.28-2.36C73.3,6.4,61.64.73,51.34.34M61,89h15.2V23.7H61ZM319.95,23.7l-19.7,22.51h-2.06V0H283.24V89h14.95V61.16h1.71L319.59,89h18.15l-24.46-34.9,25.8-30.37H319.95Zm-57.6,25c-.07-8.16-3.23-11.35-11.2-11.35-9.08,0-10.59,7-10.65,11.35ZM277.3,49V62.71H240.71c.92,11,4.85,12,10.13,12,7.15,0,18.58-.95,18.69-1l6-.5V88l-5.2.36c-.59,0-14.43,1-19.65,1h0c-22.27-.16-25.13-17.29-25.13-32.2V49c0-15.45,10.53-26.25,25.6-26.25,16.37,0,26.14,9.81,26.14,26.25M197.8,22.73c-5.13,0-13.32,3.21-18.29,5.39a22.4,22.4,0,0,0-14-5.39c-3.66,0-8.93,1.65-13.36,3.33V23.7H137.24V89h14.94V41.69c5.45-2.29,11.39-4.35,13.36-4.35,4.51,0,6.11,4.63,6.11,8.6V89H186.6v-43a34.57,34.57,0,0,0-.29-4.78c5.15-2.17,10-3.82,11.49-3.82,3.48,0,7.19,3,7.19,8.6V89h14.94v-43c0-13.45-9.31-23.22-22.14-23.22m-115.54,1h49.47V34.65l-28.46,39.6h28.46V89H82.26V78.24L111,38.32H82.26Z" transform="translate(0 0)"/><path class="c" d="M344.59,29.22h1.21c.74,0,1-.3,1-1s-.41-1-1.27-1h-1Zm1.23,1h-1.21v2.17h-1.19V26.2h2.25c1.48,0,2.34.49,2.34,1.92A1.74,1.74,0,0,1,347,30l1.13,2.33h-1.25Zm-.16,3.73a4.65,4.65,0,1,0-4.49-4.64,4.5,4.5,0,0,0,4.49,4.64m0-10.17a5.35,5.35,0,0,1,5.41,5.53,5.32,5.32,0,0,1-5.41,5.53,5.37,5.37,0,0,1-5.39-5.53,5.34,5.34,0,0,1,5.39-5.53" transform="translate(0 0)"/></g></svg>
						</th>
						<th id="navBox" colspan="9">&nbsp;</th>
					</thead>
				</table>
				<hr />
			</div>
		</div>
		<div class="row">
			<div id="mainBody" class="container center">
				<div class="row">
					<div id="leftSide" class="col-sm-7">
						<div class="row">
							<div id="topLeft" class="">
								<div id="panelBoard">

									<div id="flipper" class="flip-slider">
										<div class="flip-frame">
											<div class="flip">
												<div id="prPending" class="slide">PENDING PRs: <span id="prPendingText" class="prText">0</span></div>
												<div id="prAssigned" class="slide">ASSIGNED PRs: <span id="prAssignedText" class="prText">0</span></div>
												<div id="fbcPending" class="slide">ASSIGNED FBCs: <span id="fbcPendingText" class="prTextt">0</span></div>
												<div id="prInternalReview" class="slide">Internal Review PR: <span id="prInternalReviewText" class="prText">0</span></div>
												<div id="fbcInternalReview" class="slide">Internal Review FBC: <span id="fbcInternalReviewText" class="prText">0</span></div>
											</div>
										</div>
										<div class="navFlip">
											<button class="prev">Previous</button>
											<button class="next">Next</button>
										</div>
									</div>

								</div>
							</div>
						</div>
						<div class="row">
							<div id="bottomLeft">
								<div id="graphs"  class="flip-slider">
									<div class="flip-frame">
											<div class="flip">
												<div id="hoursLogged" class="slide">
													<h1>TEAM ACTIVITY HOURS LOGGED (Current Week):</h1>
													<div class="row">
														<div id="apacDiv" class="col-sm-4 teamDiv">
															APAC
															<div id="apacLine" class="ldBar label-center">

															</div>
															<span class="teamHours">0</span>
														</div>
														<div id="emeaDiv" class="col-sm-4 teamDiv">
															EMEA
															<div id="emeaLine" class="ldBar label-center">
																
															</div>
															<span class="teamHours">0</span>
														</div>
														<div id="programmaticDiv" class="col-sm-4 teamDiv">
															Programmatic
															<div id="programmaticLine" class="ldBar label-center">
																
															</div>
															<span class="teamHours">0</span>
														</div>
													</div>
													<div class="row">
														<div id="namWestDiv" class="col-sm-4 teamDiv">
															NAM Non-Auto
															<div id="namWestLine" class="ldBar label-center">
																
															</div>
															<span class="teamHours">0</span>
														</div>
														<div id="namEastDiv" class="col-sm-4 teamDiv">
															NAM Auto
															<div id="namEastLine" class="ldBar label-center">
																
															</div>
															<span class="teamHours">0</span>
														</div>
														<div id="totalDiv" class="col-sm-4 teamDiv">
															Interactive Design
															<div id="totalLine" class="ldBar label-center">
																
															</div>
															<span class="teamHours">0</span>
														</div>
													</div>
												</div>
												<div id="billable" class="slide">
													<h1>TEAM NON-BILLABLE HOURS (2 weeks):</h1>
													<div class="row">
														<div class="row">
															<div id="apacBillDiv" class="col-sm-4 teamDiv">
																APAC
																<div id="apacBill" class="ldBar label-center">

																</div>
																<span class="billTeamHours">0</span>
															</div>
															<div id="emeaBillDiv" class="col-sm-4 teamDiv">
																EMEA
																<div id="emeaBill" class="ldBar label-center">

																</div>
																<span class="billTeamHours">0</span>
															</div>
															<div id="programmaticBillDiv" class="col-sm-4 teamDiv">
																Programmatic
																<div id="programmaticBill" class="ldBar label-center">

																</div>
																<span class="billTeamHours">0</span>
															</div>
														</div>
														<div class="row">
															<div id="westBillDiv" class="col-sm-4 teamDiv">
																NAM Non-Auto
																<div id="westBill" class="ldBar label-center">

																</div>
																<span class="billTeamHours">0</span>
															</div>
															<div id="eastBillDiv" class="col-sm-4 teamDiv">
																NAM Auto
																<div id="eastBill" class="ldBar label-center">

																</div>
																<span class="billTeamHours">0</span>
															</div>
															<div id="totalBillDiv" class="col-sm-4 teamDiv">
																Interactive Design
																<div id="totalBill" class="ldBar label-center">

																</div>
																<span class="billTeamHours">0</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="navFlip">
											<button class="prev">Previous</button>
											<button class="next">Next</button>
										</div>
								</div>
							</div>
						</div>
					</div>
					<div id="rightSide" class="col-sm-5">
						<table id="timeBox">
							<tbody>
						  <tr>
						    <td id="clockBox">
						    	<div class="row">
											<div id="bigDate" class="col-sm-12">16</div>
										</div>
										<div class="row">
											<div id="bigMonth" class="col-sm-12">Mar</div>
										</div>
										<div class="row">
											<div id="bigYear" class="col-sm-12">1982</div>
										</div>
								    </td>
								    <td>
						    	

						    	<div id="slideshow-wrapper">
								  <ul id="slideshow" >
								    <li><div id="mnl" class="timezone">MNL<br /><span id="mnlTime" class="globalTZone">00:00:00 AM</span></div></li>
								    <li><div id="est" class="timezone">EST<br /><span id="estTime" class="globalTZone">00:00:00 AM</span></div></li>
								    <li><div id="pst" class="timezone">PST<br /><span id="pstTime" class="globalTZone">00:00:00 AM</span></div></li>
								    <li><div id="gmt" class="timezone">GMT<br /><span id="gmtTime" class="globalTZone">00:00:00 AM</span></div></li>
								    <li><div id="aest" class="timezone">AEST<br /><span id="aestTime" class="globalTZone">00:00:00 AM</span></div></li>
								  </ul>
								</div>

						    </td>
						  </tr>
						  </tbody>
						</table>
						<div id="rightContent">
							<div id="photoSlide">
							<?php
								$dir = 'img/slideshow/*.*';
								$files = glob($dir);
								for($i=0;$i<count($files);$i++){
									echo("<div id='pic".$i."' class='slidepic'><img src='".$files[$i]."' /></div>");
								}
							?>
							<script type="text/javascript">
								var current = 0,
								    slides = document.getElementsByClassName("slidepic");
								setInterval(function() {
								  for (var i = 0; i < slides.length; i++) {
								  	var mainIDPic = $(slides[current]).attr('id');
									 var currPicDiv = new Image();
									 
									 currPicDiv.src = $("#"+mainIDPic+" img").attr('src');
									 var currPicDivHeight = currPicDiv.height;
									 var currPicDivWidth = currPicDiv.width;
									 var adjDivWidth = $('#photoSlide').width();
								 	var adjDivHeight = (currPicHeight * adjWidth)/currPicWidth;
								 	var divId = $(slides[i]).attr("id");
								 	if(currPicDivWidth >= currPicDivHeight){
								 		$("#"+divId+" img").css({"top":0+"px","width":"100%"});
								 	}else{
								 		$("#"+divId+" img").css({"top":0+"px","height":"100%"});
								 	}
								    //$("#"+divId+" img").css({"height":currPicDivHeight+"px"});
								    $("#"+divId+" img").css({"top":0+"px"});
								    //$("#"+divId+" img").css("{height:"+currPicDivHeight+"px}");
								 	
								    slides[i].style.opacity = 0;
								  }
								  current = (current != slides.length - 1) ? current + 1 : 0;
								  slides[current].style.opacity = 1;
								  
								 var mainID = $(slides[current]).attr('id');
								 var currPic = new Image();
								 currPic.src = $("#"+mainID+" img").attr('src');
								 var currPicHeight = currPic.height;
								 var currPicWidth = currPic.width;
								 var containerWidth = $("#"+mainID).width();
								 var containerHeight = $("#"+mainID).height();
								 var adjWidth = (currPicWidth * containerHeight)/currPicHeight;
								 var adjHeight = (currPicHeight * containerWidth)/currPicWidth;
								 console.log(currPicHeight+":"+currPicWidth+" "+adjHeight+":"+adjWidth);
								 if(currPicWidth >= currPicHeight){
								 		$("#"+mainID+" img").animate({
								 			"top":50+"%",
								 			"left":50+"%",
								 			"width":"100%",
								 			"position":"absolute",
								 			"height":adjHeight,
								 			"transform":"translate(-50%,-50%)"
								 		},1000);
								 		/*
								 		$("#"+mainID+" img").animate({
										 	"width":adjWidth+"px"
										 },1000);
										 */
								 	}else{
								 		$("#"+mainID+" img").animate({
								 			"top":50+"%",
								 			"left":50+"%",
								 			"height":"100%",
								 			"position":"absolute",
								 			"width":adjWidth,
								 			"transform":"translate(-50%,-50%)"
								 		},1000);
								 		/*
								 		$("#"+mainID+" img").animate({
										 	"height":adjHeight+"px"
										 },1000);
										 */
								 	}
								
								}, 3000);
							</script>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div id="newsTicker" class="TickerNews">
						<div class="ti_wrapper">
					        <div id="mainTickerWrap" class="ti_slide tickerContainer">
					            <ul id="tickerAnnouncements" class="ti_content">
					            	&nbsp;
					            </ul>
					        </div>
					    </div>
					</div>
				</div>
			</div>
		</div>
			<!-- Modal -->
<div class="modal fade" id="PRFBC_Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content ">
      <div class="modal-header">
        <h1 class="modal-title" id="exampleModalLabel">PRs and FBCs DUE SOON:</h1>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body"> 
        &nbsp;
      </div>
      <div class="modal-footer" style="display: none;">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
	</div>

	<script src="js/flipslide.js"></script>
	<script src="js/app.js"></script>
	<script type="text/javascript" src="js/announcementList.js"></script>
	<script type="text/javascript">
		showAlerts();
		var bdayTime = setTimeout(function(){
			location.reload();
			clearTimeout(bdayTime);
		},1.8e+6);
	</script>
</body>
</html>