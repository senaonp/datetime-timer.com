// get day difference between now and a datetime
var getDateTimeDiff = function(startDate, endDate) {
	diff = endDate - startDate;
	if (nowStart) {
		let d = new Date();
	} else {
		let d = new Date(elemSelector("#startDateCustom").value+"T"+elemSelector("#startTimeCustom").value);
	}
	return [
		Math.floor(diff/msInDay),
		msToHMS(((diff/msInDay)-Math.floor(diff/msInDay))*msInDay)
	];
};

// turn milliseconds to [hours, minutes, seconds]
var msToHMS = function(time) {
	timerH = Math.floor(time/msInHr);
	timerM = Math.floor((time/msInHr - timerH)*60);
	timerS = Math.floor((((time/msInHr-timerH)*60)-timerM)*60);
	return [timerH, timerM, timerS];
};

// evaluate start date-time options
var evalOpt = function(bool) {
	nowStart = bool;
	if (bool) {
		uncheckInput(elemSelector('#customOpt')); 
	} else {
		uncheckInput(elemSelector('#nowOpt')); 
	};
	elemSelector("#result").style.display = "none";
}

// get nowTime
var getNow = function() {
	var date = new Date();
	return [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
}
var displayTime = function(ts) {
	disp = [ts[0],ts[1],ts[2]];
	for(i=0; i<disp.length; i+=1) { if (disp[i] < 10) { disp[i] = "0"+disp[i]; } };
	return disp;
};

// refresh timer
var refresh = setInterval(function(ids) {
	// set nowtime
	now = getNow();
	nowTime = displayTime([now[3], now[4], now[5]]);
	elemSelector("#nowDate").innerText = now[0]+"/"+now[1]+"/"+now[2];
	elemSelector("#nowTime").innerText = "["+nowTime[0]+":"+nowTime[1]+"]";
	// update timer
	if (nowStart) {
		startDateTime = new Date();
	} else {
		startDateTime = new Date(elemSelector("#startDateCustom").value+"T"+elemSelector("#startTimeCustom").value);
	};
	dtDiffDisplay();
}, 500);

// display datetime difference
var dtDiffDisplay = function() {
	dtDiff = getDateTimeDiff(startDateTime, endDateTime);
	dtDiffTime = displayTime(dtDiff[1]);
	if (dtDiff[0] >= 0) {
		elemSelector("#timerPassed").style.display = "none";
		elemSelector("#timer").style.display = "block";
		elemSelector("#resultStart").innerText = startDateTime;
		elemSelector("#days").innerText = dtDiff[0];
		elemSelector("#hours").innerText = dtDiffTime[0];
		elemSelector("#minutes").innerText = dtDiffTime[1];
		elemSelector("#seconds").innerText = dtDiffTime[2];
	} else {
		elemSelector("#timerPassed").style.display = "block";
		elemSelector("#timer").style.display = "none";
	}
};

// returns Datetime of inputfields
var parseDatetime = function(date, time) {
	return new Date(date.value, time.value);
};

// set defaultFieldValues
var setDefaultValues = function() {
	var d = new Date();
	elemSelector("#startTimeCustom").value = "00:00";
	elemSelector("#endTime").value = "00:00";
}

// validate fields
var validateFields = function() {
	var errors = [];
	if (!nowStart) {
		if (elemSelector("#startDateCustom").value == "") { errors.push(" error [custom start date is not valid] "); };
		if (elemSelector("#startTimeCustom").value == "") { errors.push(" error [custom start time is not valid] "); };
	}
	if (elemSelector("#endDate").value == "") { errors.push(" error [end date is not valid] "); };
	if (elemSelector("#endTime").value == "") { errors.push(" error [end time is not valid] "); };

	if (errors.length > 0) { 
		elemSelector("#errors").style.display = "block";
		elemSelector("#errors").innerText = errors;
		return false;
	} else {
		elemSelector("#errors").style.display = "none";
		return true;
	};
};

// submit form
var submitTimer = function() {
	isValid = validateFields();
	if (isValid) {
		elemSelector("#result").style.display = "block";
		endDateTime = new Date(elemSelector("#endDate").value+"T"+elemSelector("#endTime").value);
		urlEndDatetime = endDateTime;
		dateDiff = endDateTime - startDateTime;
		dtDiffDisplay();
		elemSelector("#resultStart").innerText = startDateTime;
		elemSelector("#resultEnd").innerText = endDateTime;
		elemSelector("#resultEndPassed").innerText = endDateTime;
	} else {
		return;
	}
};

// generate URL
var generateURL = function() {
	elemSelector("#generatedURL").style.display = "block";
	var url = "https://datetime-timer.com";

	elemSelector("#datetimeURL").innerText = url;
};

// initialize form elems
var msInDay = 1000*60*60*24;
var msInHr = 1000*60*60;

var startDateTime = null;
var endDateTime = null;
var dateDiff = null;
var urlEndDatetime = null;
var dtDiff = null;
var dtDiffTime=[];
var disp=[];
var nowStart = true;

var now = getNow();
var nowTime = displayTime([now[3], now[4], now[5]]);
elemSelector("#nowDate").innerText = now[0]+"/"+now[1]+"/"+now[2];
elemSelector("#nowTime").innerText = "["+nowTime[0]+":"+(nowTime[1])+"]";
setDefaultValues();