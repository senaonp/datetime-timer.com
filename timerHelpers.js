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
	if (nowStart) { startDateTime = new Date(); }
	else { startDateTime = new Date(elemSelector("#startDateCustom").value+"T"+elemSelector("#startTimeCustom").value); };
}, 500);

// returns Datetime of inputfields
var parseDatetime = function(date, time) {
	return new Date(date.value, time.value);
};

// submit form
var submitTimer = function() {
	isValid = validateFields();
	if (isValid) {
		elemSelector("#result").style.display = "block";
		endDateTime = new Date(elemSelector("#endDate").value+"T"+elemSelector("#endTime").value);
		urlEndDatetime = endDateTime;
		dateDiff = endDateTime - startDateTime;
		elemSelector("#resultStart").innerText = startDateTime;
		elemSelector("#resultEnd").innerText = endDateTime;
	} else {
		return;
	}
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
	console.log(elemSelector("#startDateCustom").value);
	console.log(elemSelector("#startTimeCustom").value);
	console.log(elemSelector("#endDate").value);
	console.log(elemSelector("#endTime").value);

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

// generate URL
var generateURL = function() {
	elemSelector("#generatedURL").style.display = "block";
	var url = "https://datetime-timer.com";

	elemSelector("#datetimeURL").innerText = url;
};

// initialize form elems
var startDateTime = null;
var endDateTime = null;
var dateDiff = null;
var urlEndDatetime = null;
var nowStart = true;

var now = getNow();
var nowTime = displayNow([now[3], now[4]]);
elemSelector("#nowDate").innerText = now[0]+"/"+now[1]+"/"+now[2];
elemSelector("#nowTime").innerText = "["+nowTime[0]+":"+nowTime[1]+"]";
setDefaultValues();