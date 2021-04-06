// get day difference between now and a datetime
var getDateTimeDiff = function(startDate, isNow) {
	diff = date - d;
	msInDay = 1000*60*60*24;
	if (isNow) {
		let d = Date.now();
	} else {
		let d = getElemSelect("datetimeStart").value;
	}
	return [
		Math.floor(diff/msInDay),
		diff/msInDay - Math.floor(diff/msInDay)
	];
};

// get time difference between now and a datetime
var msToHMS = function(time) {
	msInHr = 1000*60*60*24;
	timerH = Math.floor(time/msInHr);
	timerM = Math.floor((time/msInHr - timerH)*60);
	timerS = Math.floor((((time/msInHr-timerH)*60)-timerM)*60);
	return [timerH, timerM, timerS];
};


// get nowTime
var getNow = function() {
	var date = new Date();
	return [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
}

var displayNow = function(ts) {
	var disp = [ts[0],ts[1]];
	for(i=0; i<disp.length; i+=1) { if (disp[i] < 10) { disp[i] = "0"+disp[i]; } };
	return disp;
};

// refresh timer
var refresh = setInterval(function() {
	// set nowtime
	now = getNow();
	nowTime = displayNow([now[3], now[4]]);
	elemSelector("#nowDate").innerText = now[0]+"/"+now[1]+"/"+now[2];
	elemSelector("#nowTime").innerText = "["+nowTime[0]+":"+nowTime[1]+"]";
	// update timer
}, 500);

// initialize form elems
var nowStart = true;
var now = getNow();
var nowTime = displayNow([now[3], now[4]]);
elemSelector("#nowDate").innerText = now[0]+"/"+now[1]+"/"+now[2];
elemSelector("#nowTime").innerText = "["+nowTime[0]+":"+nowTime[1]+"]";