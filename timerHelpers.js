// get day difference between now and a datetime
var getDateTimeDiff = function(date, isNow) {
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
