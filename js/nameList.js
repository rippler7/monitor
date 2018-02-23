var xmlDoc, parser, xmlhttp, renderNum, xmlLength, openDiv, listNamesDiv;
var isAPACOpen = true
var isEMEAOpen = true;
var isNAMCebuOpenWest = true;
var isNAMCebuOpenEast = true;
var isNAMOpenEast = true;
var isNAMOpenWest = true;
var isNamProgrammatic = true;
var isInteractiveDesigner = true;
var isApacTabStat, isEmeaTabStat, isNamEastCebuTabStat, isNamWestCebuTabStat, isNamEastTabStat, isNamWestTabStat, isNamProgrammaticStat, isInteractiveDesignerStat;
var cnt = 0;
var numCnt = 0;
var isOpen = false;
var nameList = [];
var linkList = [];
var numList = [];
var PRTracker = [];
var FBCTracker = [];
var PRNum = 0;
var FBCNum = 0;
var shiftList = ["APAC", "EMEA", "NAM East - Cebu", "NAM Programmatic", "NAM West - Cebu", "NAM in-Market", "Interactive Designer"]
var nickNames = ["","Khackie","Rey", "Ed", "Gab", "Paski",  "", "Nixon", "Stephen", "Ciano", "Master Ivan",  "Boboi", "Christian", "","Del","JR", "Niko", "Boss","Byakuks", "Sirs", "John", "", "PJ", "Mikee", "Jollie", "Mary", "Erick", "Levin", "Beth", "", "Jeremy" , "Sexy Meng", "Josh", "", "Olivia", "Vince", "Jonathan", "Buttons", "Zach", "Heajin", "Alex", "","James", "Mau"];
var PRColors = [];
var FBCColors = [];

function fetchXML(creative_url) {
    //console.log("parsing");
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.async = false;
    xmlhttp.open("GET", creative_url, false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
    readXML();
    checkTracker();
}

function checkTracker() {
    for (var i = 0; i < nameList.length; i++) {
        PRNum = 0;
        FBCNum = 0;
        for (var j = 0; j < PRData.length; j++) {
            //console.log("Campaign Name: " + PRData[j]["Campaign Name"]);
            if (nameList[i].toLowerCase() === PRData[j]["Developer"].toLowerCase()) {
                PRNum++;
                if (PRData[j]["Production Request Status"] === "Assigned to Developer" || PRData[j]["Production Request Status"] === "Development Work In Progress" || PRData[j]["Production Request Status"] === "Feedback Submitted" || PRData[j]["Production Request Status"] === "Assigned to Designer"|| PRData[j]["Production Request Status"] === "5: Developer Assigned"|| PRData[j]["Production Request Status"] === "7: Developer In-Progress"|| PRData[j]["Production Request Status"] === "6: Developer Confirmed Request") {
                    var ampm;
                    if (PRData[j]["Due Time (EST)"].indexOf("am") > 0) {
                        ampm = "AM"
                    } else {
                        ampm = "PM"
                    }
                    var dates = PRData[j]["Due Date"].split('-');
                    var times = PRData[j]["Due Time (EST)"].split(":");
                    var PRdate = new Date(dates[2], dates[0] - 1, dates[1], (ampm === "AM") ? times[0] : Number(times[0]) + 12, String(times[1]).substr(0, 2), "00");
                    var curdate = calcTime('-4');
                    var nutc = PRdate.getTime() + (d.getTimezoneOffset());
                    var nnd = new Date(nutc);
                    var dDiff = (nnd.getTime() - curdate) / 86400000
                    if (dDiff < 0 && PRData[j]["Campaign Name"] != "Cebu Training Campaign" && PRData[j]["Campaign Name"] != "Creative Dev Best Practices Training Prep" && PRData[j]["Campaign Name"] != "Fake Demo Campaign") {
                        PRColors[i] = "red"
                    } else if (dDiff > 0 && dDiff < 1 && PRColors[i] != "red") {
                        PRColors[i] = "green"
                    } else if (PRColors[i] != "red") {
                        PRColors[i] = "white"
                    }
                }

            }
        }
        for (var k = 0; k < FBCData.length; k++) {
            if (nameList[i].toLowerCase() === FBCData[k]["Assigned To"].toLowerCase()) {
                FBCNum++;
                if (FBCData[k]["Status"] === "In Progress" || FBCData[k]["Status"] === "Assigned" || FBCData[k]["Status"] === "2: Developer Assigned" || FBCData[k]["Status"] === "3: Developer In-Progress") {
                    var ampm;
                    if (FBCData[k]["Due Time (EST)"].indexOf("am") > 0) {
                        ampm = "AM"
                    } else {
                        ampm = "PM"
                    }
                    var dates = FBCData[k]["Due Date"].split('-');
                    var times = FBCData[k]["Due Time (EST)"].split(":");
                    var PRdate = new Date(dates[2], dates[0] - 1, dates[1], (ampm === "AM") ? times[0] : Number(times[0]) + 12, String(times[1]).substr(0, 2), "00");
                    var curdate = calcTime('-4');
                    var nutc = PRdate.getTime() + (d.getTimezoneOffset());
                    var nnd = new Date(nutc);
                    var dDiff = (nnd.getTime() - curdate) / 86400000
                    if (dDiff < 0) {
                        FBCColors[i] = "red"
                    } else if (dDiff > 0 && dDiff < 1 && FBCColors[i] != "red") {
                        FBCColors[i] = "green"
                    } else if (FBCColors[i] != "red") {
                        FBCColors[i] = "white"
                    }
                }
            }
        }
        PRTracker.push(PRNum);
        FBCTracker.push(FBCNum);
    }
}
function createCheckBox(name,cont) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = "cb_"+name;   
    checkbox.value = "value";
    cont.appendChild(checkbox);
    checkbox.onchange = testClick;
    //document.getElementById("cb_"+name).addEventListener("change",testClick); 
}
function testClick() {
    console.log("test");
    //ev.preventDefault();
   // ev.stopPropagation();
}
function calcTime(offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (3600000 * offset));
    return nd.getTime();
}

function readXML() {
    for (var j = 1; j < (xmlDoc.documentElement.children.length) * 2; j++) {
        if (j % 2 != 0) {
            nameList.push(shiftList[cnt]);
            linkList.push("");
            numCnt = 0;
            xmlLength = (xmlDoc.documentElement.childNodes[j].children.length) * 2;
            for (var i = -1; i < xmlLength - 2; i++) {
                if (i % 2 != 0) {
                    numCnt++;
                    nameList.push(xmlDoc.documentElement.childNodes[j].childNodes[i + 2].childNodes[1].childNodes[0].nodeValue);
                    linkList.push(xmlDoc.documentElement.childNodes[j].childNodes[i + 2].childNodes[3].childNodes[0].nodeValue);
                }
            }
            numList.push(numCnt);
            cnt++;
        }
    }
}

function renderXML() {
    //console.log(numList);
    for (var i = 0; i < nameList.length; i++) {
        window["name" + i] = document.createElement("button");
        document.getElementById("listNames").appendChild(window["name" + i]);
        if (nameList[i] == "APAC" || nameList[i] == "EMEA" || nameList[i] == "NAM East - Cebu" || nameList[i] == "NAM West - Cebu" || nameList[i] == "NAM in-Market" || nameList[i] == "NAM Programmatic" || nameList[i] == "Interactive Designer") {
            window["name" + i].innerHTML = nameList[i];
            window["name" + i].style.fontWeight = "Bold";
            window["name" + i].style.backgroundColor = "#091f38";
            window["name" + i].addEventListener("click", collapseExpandList);
            window["name" + i].style.color = "white";
        } else {
            //createCheckBox(nickNames[i],window["name" + i])
            window["name" + i].innerHTML += " [<span style='color:" + PRColors[i] + "'> " + PRTracker[i] + "</span>  /  <span style='color:" + FBCColors[i] + "'>" + FBCTracker[i] + "</span> ]"
            window["name" + i].innerHTML += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + nameList[i];
            if (nickNames[i] != "") {
                window["name" + i].innerHTML += " - " + nickNames[i];
            }
            window["name" + i].addEventListener("click", openIndividualPage);
            window["name" + i].style.backgroundColor = "#0d3364";
            window["name" + i].style.color = "white";
        }
        window["name" + i].style.fontFamily = "theFont";
        //window["name" + i].style.fontSize = "13px";
        window["name" + i].style.border = "1px solid #3a5f91";
        window["name" + i].style.cursor = "pointer";
        window["name" + i].style.width = "299px";
        window["name" + i].style.textAlign = "left";
        window["name" + i].style.zIndex = 100 - i;
        window["name" + i].style.position = "absolute";
        window["name" + i].style.top = (i * 23) + "px";
        window["name" + i].id = "name" + i;
    }
    listNamesDiv.style.height = (detectBrowserDimension().height - 70) + "px";
    var isNameListOpenVariable = getCookie("isNameListOpen");
    isApacTabStat = getCookie("ApacTabStat");
    isEmeaTabStat = getCookie("EmeaTabStat");
    isNamEastCebuTabStat = getCookie("NamEastCebuTabStat");
    isNamWestCebuTabStat = getCookie("NamWestCebuTabStat");
    isNamEastTabStat = getCookie("NamEastTabStat");
    isNamWestTabStat = getCookie("NamWestTabStat");
    isNamProgrammaticStat = getCookie("NamProgrammaticStat");
    //console.log(getCookie("NamProgrammaticStat"))
    isInteractiveDesignerStat = getCookie("InteractiveDesignerStat");
    checkTabStat();
    document.getElementById("legendDiv").style.bottom = "0px";
    document.getElementById("legendDiv").style.left = "0px";
    document.getElementById("legendDiv").style.width = listNamesDiv.style.width;
    document.getElementById("legendDiv").style.height = "20px";
    document.getElementById("legendDiv").style.borderRight = "9px solid #3a5f91";
    document.getElementById("legendDiv").style.display = "block";
    //console.log(isNameListOpenVariable);
    if (isNameListOpenVariable == "close") {
        isOpen = false;
        openDiv.style.backgroundImage = "url('Images/open.png')"
        openDiv.style.left = "0px"
        listNamesDiv.style.left = "-300px";
        document.getElementById("legendDiv").style.left = "-300px";
    } else if (isNameListOpenVariable == "open") {
        openDiv.style.backgroundImage = "url('Images/close.png')"
        openDiv.style.left = "298px"
        listNamesDiv.style.left = "0px";
        document.getElementById("legendDiv").style.left = "-0px";
        isOpen = true;
    } else {
        openDiv.style.backgroundImage = "url('Images/open.png')"
        openDiv.style.left = "0px"
        listNamesDiv.style.left = "-300px";
        document.getElementById("legendDiv").style.left = "-300px";
        isOpen = false;
    }

}

function checkTabStat() {
    if (isApacTabStat == "close") {
        for (var i = 1; i < nameList.length; i++) {
            var temp = window["name" + i].style.top;
            var numTemp = temp.substring(0, temp.lastIndexOf("px"));
            window["name" + i].style.top = (numTemp - (numList[0] * 23)) + "px";

        }
        isAPACOpen = false;
    } else if (isApacTabStat == "open") {
        isAPACOpen = true;
    }
    if (isEmeaTabStat == "close") {
        for (var i = numList[0] + 2; i < nameList.length; i++) {
            var temp = window["name" + i].style.top;
            var numTemp = temp.substring(0, temp.lastIndexOf("px"));
            window["name" + i].style.top = (numTemp - (numList[1] * 23)) + "px";

        }
        isEMEAOpen = false;
    } else if (isEmeaTabStat == "open") {
        isEMEAOpen = true;
    }
    if (isNamEastCebuTabStat == "close") {
        for (var i = numList[0] + numList[1] + 3; i < nameList.length; i++) {
            var temp = window["name" + i].style.top;
            var numTemp = temp.substring(0, temp.lastIndexOf("px"));
            window["name" + i].style.top = (numTemp - (numList[2] * 23)) + "px";

        }
        isNAMCebuOpenEast = false;
    } else if (isNamEastCebuTabStat == "open") {
        isNAMCebuOpenEast = true;
    }
    if (isNamProgrammaticStat == "close") {
        for (var i = numList[0] + numList[1] + numList[2] + 4; i < nameList.length; i++) {
            var temp = window["name" + i].style.top;
            var numTemp = temp.substring(0, temp.lastIndexOf("px"));
            window["name" + i].style.top = (numTemp - (numList[3] * 23)) + "px";

        }
        isNamProgrammatic = false;
    } else if (isNamProgrammaticStat == "open") {
        isNamProgrammatic = true;
    }
    if (isNamWestCebuTabStat == "close") {
        for (var i = numList[0] + numList[1] + numList[2] + numList[3] + 5; i < nameList.length; i++) {
            var temp = window["name" + i].style.top;
            var numTemp = temp.substring(0, temp.lastIndexOf("px"));
            window["name" + i].style.top = (numTemp - (numList[4] * 23)) + "px";

        }
        isNAMCebuOpenWest = false;
    } else if (isNamWestCebuTabStat == "open") {
        isNAMCebuOpenWest = true;
    }
    if (isNamEastTabStat == "close") {
        for (var i = numList[0] + numList[1] + numList[2] + numList[3] + numList[4] + 6; i < nameList.length; i++) {
            var temp = window["name" + i].style.top;
            var numTemp = temp.substring(0, temp.lastIndexOf("px"));
            window["name" + i].style.top = (numTemp - (numList[5] * 23)) + "px";

        }
        isNAMOpenEast = false;

    } else if (isNamEastTabStat == "open") {
        isNAMOpenEast = true;
    }
    if (isInteractiveDesignerStat == "close") {
        for (var i = numList[0] + numList[1] + numList[2] + numList[3] + numList[4] + numList[5] + 7; i < nameList.length; i++) {
            var temp = window["name" + i].style.top;
            var numTemp = temp.substring(0, temp.lastIndexOf("px"));
            window["name" + i].style.top = (numTemp - (numList[6] * 23)) + "px";

        }
        isInteractiveDesigner = false;
    } else if (isNamWestTabStat == "open") {
        isInteractiveDesigner = true;
    }
}

function openIndividualPage(e) {
    var trg = e.target.id;
    var numTrg = trg.substring(4, trg.length)
    window.open(linkList[numTrg], "_blank");
}

function collapseExpandList(e) {
    var trg = e.target.id;
    var numTrg = trg.substring(4, trg.length)
    switch (nameList[numTrg]) {
    case "APAC":
        if (isAPACOpen) {
            for (var i = 1; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                //console.log(numTemp);
                window["name" + i].style.top = (numTemp - (numList[0] * 23)) + "px";

            }
            setCookie("ApacTabStat", "close", 365);
        } else {
            for (var i = 1; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                var newTemp = (parseInt(numTemp) + parseInt(numList[0] * 23))
                window["name" + i].style.top = parseInt(newTemp) + "px";
            }
            setCookie("ApacTabStat", "open", 365);
        }
        isAPACOpen = !isAPACOpen;
        break;
    case "EMEA":
        if (isEMEAOpen) {
            for (var i = numList[0] + 2; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                window["name" + i].style.top = (numTemp - (numList[1] * 23)) + "px";

            }
            setCookie("EmeaTabStat", "close", 365);
        } else {
            for (var i = numList[0] + 2; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                var newTemp = (parseInt(numTemp) + parseInt(numList[1] * 23))
                window["name" + i].style.top = parseInt(newTemp) + "px";
            }
            setCookie("EmeaTabStat", "open", 365);
        }
        isEMEAOpen = !isEMEAOpen;
        break;
    case "NAM East - Cebu":
        if (isNAMCebuOpenEast) {
            for (var i = numList[0] + numList[1] + 3; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                window["name" + i].style.top = (numTemp - (numList[2] * 23)) + "px";

            }
            setCookie("NamEastCebuTabStat", "close", 365);
        } else {
            for (var i = numList[0] + numList[1] + 3; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                var newTemp = (parseInt(numTemp) + parseInt(numList[2] * 23))
                window["name" + i].style.top = parseInt(newTemp) + "px";
            }
            setCookie("NamEastCebuTabStat", "open", 365);
        }
        isNAMCebuOpenEast = !isNAMCebuOpenEast;
        break;
    case "NAM Programmatic":
        if (isNamProgrammatic) {
            for (var i = numList[0] + numList[1] + numList[2] + 4; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                window["name" + i].style.top = (numTemp - (numList[3] * 23)) + "px";

            }
            setCookie("NamProgrammaticStat", "close", 365);
        } else {
            for (var i = numList[0] + numList[1] + numList[2] + 4; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                var newTemp = (parseInt(numTemp) + parseInt(numList[3] * 23))
                window["name" + i].style.top = parseInt(newTemp) + "px";
            }
            setCookie("NamProgrammaticStat", "open", 365);
        }
        isNamProgrammatic = !isNamProgrammatic;
        break;
    case "NAM West - Cebu":
        if (isNAMCebuOpenWest) {
            for (var i = numList[0] + numList[1] + numList[2] + numList[3] + 5; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                window["name" + i].style.top = (numTemp - (numList[4] * 23)) + "px";

            }
            setCookie("NamWestCebuTabStat", "close", 365);
        } else {
            for (var i = numList[0] + numList[1] + numList[2] + numList[3] + 5; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                var newTemp = (parseInt(numTemp) + parseInt(numList[4] * 23))
                window["name" + i].style.top = parseInt(newTemp) + "px";
            }
            setCookie("NamWestCebuTabStat", "open", 365);
        }
        isNAMCebuOpenWest = !isNAMCebuOpenWest;
        break;
    case "NAM in-Market":
        if (isNAMOpenEast) {
            for (var i = numList[0] + numList[1] + numList[2] + numList[3] + numList[4] + 6; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                window["name" + i].style.top = (numTemp - (numList[5] * 23)) + "px";

            }
            setCookie("NamEastTabStat", "close", 365);
        } else {
            for (var i = numList[0] + numList[1] + numList[2] + numList[3] + numList[4] + 6; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                var newTemp = (parseInt(numTemp) + parseInt(numList[5] * 23))
                window["name" + i].style.top = parseInt(newTemp) + "px";
            }
            setCookie("NamEastTabStat", "open", 365);
        }
        isNAMOpenEast = !isNAMOpenEast;
        break;
    case "Interactive Designer":
            console.log("test");
        if (isInteractiveDesigner) {
            console.log("test if");
            for (var i = numList[0] + numList[1] + numList[2] + numList[3] + numList[4] + numList[5] +7; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                window["name" + i].style.top = (numTemp - (numList[6] * 23)) + "px";

            }
            setCookie("InteractiveDesignerStat", "close", 365);
        } else {
            console.log("test else");
            for (var i = numList[0] + numList[1] + numList[2] + numList[3] + numList[4] + numList[5] + 7; i < nameList.length; i++) {
                var temp = window["name" + i].style.top;
                var numTemp = temp.substring(0, temp.lastIndexOf("px"));
                var newTemp = (parseInt(numTemp) + parseInt(numList[6] * 23))
                window["name" + i].style.top = parseInt(newTemp) + "px";
            }
            setCookie("InteractiveDesignerStat", "open", 365);
        }
        isInteractiveDesigner = !isInteractiveDesigner;
        break;
    }
}

function initNameList() {
    openDiv = document.getElementById("openBtnDiv");
    listNamesDiv = document.getElementById("listNames");
    fetchXML("nameList.xml");
    openDiv.addEventListener("click", openNameList);
    renderXML();
}

function openNameList() {
    if (isOpen) {
        openDiv.style.backgroundImage = "url('Images/open.png')"
        openDiv.style.left = "0px"
        listNamesDiv.style.left = "-300px";
        document.getElementById("legendDiv").style.left = "-300px";
        setCookie("isNameListOpen", "close", 365);
    } else {
        openDiv.style.backgroundImage = "url('Images/close.png')"
        openDiv.style.left = "298px"
        listNamesDiv.style.left = "0px";
        document.getElementById("legendDiv").style.left = "0px";
        setCookie("isNameListOpen", "open", 365);
    }
    isOpen = !isOpen;
}
initNameList();