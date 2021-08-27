var saveTimer = function(elem) {
	elemSelector("#savedTimerVerify").style.color = "rgb(0,0,0)";
	var storage = window.localStorage;
	var counter = 1;
	var isCustom = false;
	if (storage.getItem('counter')) {
		counter = storage.getItem('counter');
	}
	var start = "now";
	if (!nowStart) {
		start = new Date(elemSelector("#startDateCustom").value+"T"+elemSelector("#startTimeCustom").value);
		isCustome = true;
	};
	var timerName = "timer_" + counter;
	if (elem.value.length > 0) {
		if (!validateTimerName(elem.value)) {
			return;
		}
		timerName = elem.value;
	}
	storage.setItem(counter.toString(), [timerName, start, endDateTimes, isCustom]);
	elemSelector('#savedTimerVerify').style.display = "block";
	elemSelector('#savedTimerVerify').innerHTML = "<span>saved timer: <span id='savedTimerName'>" + timerName + "</span> to web browser<span>";
	counter = parseInt(counter) + 1;
	storage.setItem('counter', parseInt(counter));
};

var validateTimerName = function(name) {
	if ((elemSelector("#timerName").value.search(/[,]/) != -1) || (name === "counter")) { 
		elemSelector("#savedTimerVerify").style.display = "block";
		elemSelector("#savedTimerVerify").style.color = "red";
		if (name === "counter") {
			elemSelector("#savedTimerVerify").innerText = "error: 'counter' cannot be used as a timer name as it is a reserved keyname; please use another timer name and try again";
		} else {
			elemSelector("#savedTimerVerify").innerText = "error: a timer name cannot include a comma ',' character; please use another timer name and try again";
		}
		return false;
	};
	elemSelector("#savedTimerVerify").style.display = "none";
	return true;
};

// display datetime difference for timers
var timersText = "";
var dtDiffDisplayTimers = function(elem, attrs) {
	if (elem == null) {
		return;
	}
	var endDateTimes = new Date(attrs[2]);
	if (attrs[1] === "now") {
		startDateTimes = new Date();
	} else {
		startDateTimes = new Date(attrs[1]);
	}
	var dtDiff = getDateTimeDiff(startDateTimes, endDateTimes);
	var dtDiffTime = displayTime(dtDiff[1]);
	if (dtDiff[0] >= 0) {
		timersText = dtDiff[0] + "d - [" + dtDiffTime[0] + ":" + dtDiffTime[1] + ":"+ dtDiffTime[2] + "]";
		if (attrs[3]) { 
			timersText = roundCustomTimes(dtDiff, dtDiffTime);
		};
		elem.innerText = timersText;
	} else {
		elem.innerHTML = "timer has passed - " + attrs[2];
	}
};

// estimate difference between custom dates
var roundCustomTimes = function(dtDiff, dtDiffTime) {
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
	var customTimerText = dHMS[0] + "d - [" + hms[0] + ":" + hms[1] + ":"+ hms[2] + "]";
	return customTimerText;
};

var timerItems = [];
var timerItem = [];
var renderTimers = function() {
	var storage = window.localStorage;
	var storageKeys = Object.keys(storage);
	var savedTimers = "<h1>timers: </h1>";
	if (storageKeys.length == 1 && storageKeys[0] == "counter") {
		elemSelector("#savedTimers").innerHTML = "";
		return;
	}
	for (var x=0; x<storageKeys.length; x+=1) {
		if (storageKeys[x] === "counter") {
			continue;
		}
		timerItem = localStorage.getItem(storageKeys[x]).split(",");
		savedTimers += "<p><span class='storedTimerName'>" + timerItem[0] + "</span> <span class='storedTimerTime' id='storedTimer" + storageKeys[x] + "'></span> <button class='deleteTimerButton' onclick='removeStoredTimer(`" + storageKeys[x] + "`)'>delete timer</button></p>";
		timerItems.push([timerItem, "storedTimer"+storageKeys[x]]);
	}
	elemSelector("#savedTimers").style.display = "block";
	elemSelector("#savedTimers").innerHTML = savedTimers;
	for (var y=0; y<timerItems.length; y+=1) {
		dtDiffDisplayTimers(elemSelector("#"+timerItems[y][1]), timerItems[y][0]);
	}
}

var setTimerInterval = function(elem) {
	savedTimerIntervals.push(
		setInterval(function() {
			dtDiffDisplayTimers(elemSelector("#"+elem[1]), elem[0]);
		}, 1000)
	);
}

var removeStoredTimer = function(id) {
	window.localStorage.removeItem(id);
	initializeSavedTimers();
}

var savedTimerIntervals = [];
var initializeSavedTimers = function() {
	for (var z = 0; z < savedTimerIntervals.length; z += 1) {
		clearInterval(savedTimerIntervals[z]);
	}
	if (Object.keys(window.localStorage).length == 1 && (Object.keys(window.localStorage)[0] === "counter")) {
		window.localStorage.setItem('counter', 1);
		elemSelector("#savedTimers").style.display = "none";
		return;
	}

	renderTimers();
	for (var y=0; y<timerItems.length; y+=1) {
		setTimerInterval(timerItems[y]);
	}
}

initializeSavedTimers();