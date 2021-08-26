var saveTimer = function(elem) {
	elemSelector("#savedTimerVerify").style.color = "rgb(0,0,0)";
	var storage = window.localStorage;
	var counter = 1;
	if (storage.getItem('counter')) {
		counter = storage.getItem('counter');
	}
	var start = "now";
	if (!nowStart) {
		start = startDateTime;
	};
	var timerName = "timer_" + counter;
	if (elem.value.length > 0) {
		if (!validateTimerName(elem.value)) {
			return;
		}
		timerName = elem.value;
	}
	storage.setItem(counter.toString(), [timerName, start, endDateTime]);
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
var dtDiffDisplayTimers = function(elem, attrs) {
	if (elem == null) {
		return;
	}
	var startDateTime = null;
	var endDateTime = new Date(attrs[2]);
	if (attrs[1] === "now") {
		startDateTime = new Date();
	} else {
		startDateTime = new Date(attrs[1]);
	}
	var dtDiff = getDateTimeDiff(startDateTime, endDateTime);
	var dtDiffTime = displayTime(dtDiff[1]);
	if (dtDiff[0] >= 0) {
		timerText = dtDiff[0] + "d - [" + dtDiffTime[0] + ":" + dtDiffTime[1] + ":"+ dtDiffTime[2] + "]";
		elem.innerText = timerText;
		if (attrs[1] != "now") { roundCustom(dtDiff, dtDiffTime); return; };
	} else {
		elem.innerHTML = "timer has passed - " + attrs[2];
	}
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