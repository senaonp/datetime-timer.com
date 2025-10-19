var saveTimer = function(elem) {
	elemSelector("#savedTimerVerify").style.color = "rgb(0,0,0)";
	var storage = window.localStorage;
	var counter = 1;
	if (storage.getItem('counter')) {
		counter = storage.getItem('counter');
	}
	var start = "now";
	if (!nowStart) {
		start = new Date(elemSelector("#startDateCustom").value+"T"+elemSelector("#startTimeCustom").value);
	};
	var timerName = "日期和时间计时器_" + counter;
	if (elem.value.length > 0) {
		if (!validateTimerName(elem.value)) {
			return;
		}
		timerName = elem.value;
	}
	storage.setItem(counter.toString(), [timerName, start, endDateTimes]);
	elemSelector('#savedTimerVerify').style.display = "block";
	elemSelector('#savedTimerVerify').innerHTML = "<span>保存计时器： <span id='savedTimerName'>" + timerName + "</span></span>";
	counter = parseInt(counter) + 1;
	storage.setItem('counter', parseInt(counter));
};

var validateTimerName = function(name) {
	if ((elemSelector("#timerName").value.search(/[,`]/) != -1) || (name === "counter")) { 
		elemSelector("#savedTimerVerify").style.display = "block";
		elemSelector("#savedTimerVerify").style.color = "red";
		if (name === "counter") {
			elemSelector("#savedTimerVerify").innerText = "错误： 网址的名不能是 “counter” ；请指定不同的名，然后再试一次";
		} else {
			elemSelector("#savedTimerVerify").innerText = "错误： 网址的名不能有逗号 “,” 还是反引号 “`” ；请指定名没有这些字，然后再试一次";
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
		timersText = dtDiff[0] + "日 - [" + dtDiffTime[0] + ":" + dtDiffTime[1] + ":"+ dtDiffTime[2] + "]";
		if (attrs[1] !== "now") { 
			timersText = roundCustomTimes(dtDiff, dtDiffTime);
		};
		elem.innerText = timersText;
	} else {
		elem.innerHTML = "日期时间 - " + attrs[2] + " 完了";
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
	var customTimerText = dHMS[0] + "日 - [" + hms[0] + ":" + hms[1] + ":"+ hms[2] + "]";
	return customTimerText;
};

var timerItems = [];
var timerItem = [];
var renderTimers = function() {
	var storage = window.localStorage;
	var storageKeys = Object.keys(storage);
	var savedTimers = "<h1>日期和时间计时器: <button id='renderCodeButton' onclick='renderCode()'>得到浏览器的代码</button></h1><p id='quickSetup' style='display:none'></p>";
	if (storageKeys.length == 1 && storageKeys[0] == "counter") {
		elemSelector("#savedTimers").innerHTML = "";
		return;
	}
	for (var x=0; x<storageKeys.length; x+=1) {
		if (storageKeys[x] === "counter") { continue; }
		timerItem = localStorage.getItem(storageKeys[x]).split(",");
		savedTimers += "<p><span class='storedTimerName'>" + timerItem[0] + "</span> <span class='storedTimerTime' id='storedTimer" + storageKeys[x] + "'></span>" + " <span class='storedTimerFullDateTime'>" + timerItem[2] + "</span>" + "<button class='deleteTimerButton' onclick='removeStoredTimer(`" + storageKeys[x] + "`)'>删除</button></p>";
		timerItems.push([timerItem, "storedTimer"+storageKeys[x]]);
	}
	elemSelector("#savedTimers").style.display = "block";
	elemSelector("#savedTimers").innerHTML = savedTimers;
	for (var y=0; y<timerItems.length; y+=1) {
		dtDiffDisplayTimers(elemSelector("#"+timerItems[y][1]), timerItems[y][0]);
	}
}

var renderCode = function() {
	elemSelector("#renderCodeButton").innerHTML = "隐藏浏览器的代码";
	if (elemSelector("#quickSetup").style.display == "block") {
		elemSelector("#renderCodeButton").innerHTML = "得到浏览器的代码";
		elemSelector("#quickSetup").style.display = "none";
		return;
	};
	var code = "为了设置浏览器的计时器，你在浏览器的开发者控制台可以运行这个代码（F12键盘键）； <br>这是有用的备份（如果浏览器的缓存被删除还是计时器被意外删除）； <br>你可以给他人代码； 但是，请注意这个代码覆盖浏览器的计时器都<br><br>浏览器的代码:<br><span id='timerCode'>timerStorage = window.localStorage; timerStorage.clear(); ";
	var storage = window.localStorage;
	var storageKeys = Object.keys(storage);
	for (var x=0; x<storageKeys.length; x+=1) {
		code += "timerStorage.setItem(`" + storageKeys[x] + "`, `" + storage[storageKeys[x]] + "`); ";
	}
	elemSelector("#quickSetup").innerHTML = code + " location.reload();</span><br><br>";
	elemSelector("#quickSetup").style.display = "block";
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
	if (Object.keys(window.localStorage).length == 1 && (Object.keys(window.localStorage)[0] === "counter") || Object.keys(window.localStorage).length == 0) {
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
