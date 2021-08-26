// get day difference between now and a datetime
var getDateTimeDiff = function(startDate, endDate) {
	diff = (endDate - startDate)/msInDay;
	return [
		Math.floor(diff),
		msToHMS((diff-Math.floor(diff))*msInDay)
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
	hideElem(elemSelector("#result"));
	hideElem(elemSelector("#title"));
}

// get nowTime
var getNow = function() {
	var date = new Date();
	return [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
}

// add leading zero if number is single-digit
var displayTime = function(ts) {
	disp = [ts[0],ts[1],ts[2]];
	for(i=0; i<disp.length; i+=1) {
		if ((disp[i]).toString().length == 2) { continue; }
		if (disp[i] < 10) { disp[i] = "0"+disp[i]; }
		else { disp[i] = disp[i].toString(); }
	};
	return disp;
};

// refresh timer
var refresh = setInterval(function(ids) {
	now = getNow();
	nowTime = displayTime([now[3], now[4], now[5]]);
	elemSelector("#nowDate").innerText = now[0]+"/"+now[1]+"/"+now[2];
	elemSelector("#nowTime").innerText = "["+nowTime[0]+":"+nowTime[1]+":"+nowTime[2]+"]";
	if (nowStart) { startDateTime = new Date(); }
	dtDiffDisplay();
}, 1000);

// display datetime difference
var dtDiffDisplay = function() {
	dtDiff = getDateTimeDiff(startDateTime, endDateTime);
	dtDiffTime = displayTime(dtDiff[1]);
	if (dtDiff[0] >= 0) {
		elemSelector("#timerPassed").style.display = "none";
		elemSelector("#timer").style.display = "block";
		elemSelector("#resultStart").innerText = startDateTime;
		timerText = dtDiff[0] + "日 - [" + dtDiffTime[0] + ":" + dtDiffTime[1] + ":"+ dtDiffTime[2] + "]";
		elemSelector("#timerFull").innerText = timerText;
		elemSelector("#timerFullTitle").innerText = timerText;
		if (!nowStart) { roundCustom(dtDiff, dtDiffTime); return; };
	} else {
		elemSelector("#timerFullTitle").innerHTML = "日期时间 " + endDateTime + " 完了";
		elemSelector("#timerPassed").style.display = "block";
		elemSelector("#timer").style.display = "none";
	}
};

// estimate difference between custom dates
var roundCustom = function(dtDiff, dtDiffTime) {
	dHMS = [dtDiff[0], dtDiffTime[0], dtDiffTime[1], dtDiffTime[2]];
	if (dHMS[3] >= 59) {
		dHMS[2] = parseInt(dtDiffTime[1])+1;
		dHMS[3] = 0;
	}
	if (dHMS[2] == 60) {
		dHMS[1] = parseInt(dtDiffTime[0])+1;
		dHMS[2] = 0;
	}
	if (dHMS[1] == 24) {
		dHMS[0] = parseInt(dtDiff[0])+1;
		dHMS[1] = 0;
	}
	hms = displayTime(dHMS.slice(1));
	timerText = dHMS[0] + "日 - [" + hms[0] + ":" + hms[1] + ":"+ hms[2] + "]";
	elemSelector("#timerFull").innerText = timerText;
	elemSelector("#timerFullTitle").innerText = timerText;
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
		if (elemSelector("#startDateCustom").value == "") { errors.push(" 错误 [自定的开始日期无效] "); };
		if (elemSelector("#startTimeCustom").value == "") { errors.push(" 错误 [自定的开始时间无效] "); };
	}
	if (elemSelector("#endDate").value == "") { errors.push(" 错误 [结束日期无效] "); };
	if (elemSelector("#endTime").value == "") { errors.push(" 错误 [结束时间无效] "); };

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
		if (isTitleDisplay) { hideElem(elemSelector("#title")); }
		elemSelector("#result").style.display = "block";
		if (!nowStart) {
			startDateTime = new Date(elemSelector("#startDateCustom").value+"T"+elemSelector("#startTimeCustom").value);
		};
		endDateTime = new Date(elemSelector("#endDate").value+"T"+elemSelector("#endTime").value);
		dateDiff = endDateTime - startDateTime;
		dtDiffDisplay();
		elemSelector("#resultStart").innerText = startDateTime;
		elemSelector("#resultEnd").innerText = endDateTime;
		elemSelector("#resultEndPassed").innerText = endDateTime;
		generateURLquery();
	} else {
		return;
	}
};

// initialize form elems
var msInDay = 1000*60*60*24;
var msInHr = 1000*60*60;
var url = "https://datetime-timer.com/zh/?";
var nowStart = true;
var timerCompleted = false;

var startDateTime = null;
var endDateTime = null;
var dateDiff = null;
var urlEndDateTime = null;
var urlStartDateTime = null;
var dtDiff = null;
var timerH = null;
var timerM = null;
var timerS = null;
var dtDiffTime=[];
var disp=[];
var query=[];
var hms=[];
var dHMS=[];
var timerText = "";

var now = getNow();
var nowTime = displayTime([now[3], now[4], now[5]]);
elemSelector("#nowDate").innerText = now[0]+"/"+now[1]+"/"+now[2];
elemSelector("#nowTime").innerText = "["+nowTime[0]+":"+(nowTime[1])+":"+nowTime[2]+"]";
setDefaultValues();