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
	var timerName = "日時タイマー＿" + counter;
	if (elem.value.length > 0) {
		if (!validateTimerName(elem.value)) {
			return;
		}
		timerName = elem.value;
	}
	storage.setItem(counter.toString(), [timerName, start, endDateTimes]);
	elemSelector('#savedTimerVerify').style.display = "block";
	elemSelector('#savedTimerVerify').innerHTML = "<span>タイマーが保存されました： <span id='savedTimerName'>" + timerName + "</span><span>";
	counter = parseInt(counter) + 1;
	storage.setItem('counter', parseInt(counter));
};

var validateTimerName = function(name) {
	if ((elemSelector("#timerName").value.search(/[,`]/) != -1) || (name === "counter")) { 
		elemSelector("#savedTimerVerify").style.display = "block";
		elemSelector("#savedTimerVerify").style.color = "red";
		if (name === "counter") {
			elemSelector("#savedTimerVerify").innerText = "エラー: 'counter'の名が含めるべきではありません";
		} else {
			elemSelector("#savedTimerVerify").innerText = "エラー　URL名は「,」と「`」が含めるべきではありません。「,」と「`」 ありませんのURL名が入力します。次に再提出下さい。";
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
		elem.innerHTML = "タイマーが切れました - " + attrs[2];
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

var listToType = function(list, type) {
	var result = [];
	for (var a=0; a<list.length; a+=1) {
		if (type === "number") {
			result.push(parseInt(list[a]));
		} else if (type === "string") {
			result.push(list[a].toString());
		} else {
			result.push(list(a));
		}
	}
	return result;
}

var sortKeys = function(keyList) {
	if (keyList.indexOf("counter") != -1) {
		countIndex = keyList.indexOf("counter");
		keyList.splice(countIndex, 1);
	}
	keyList = listToType(keyList, "number");
	var x = 1;
	while (x == 1) {
		x = 0;
		for (var a=0; a<keyList.length; a+=1) {
			var temp = null;
			if (keyList[a] > keyList[a+1]) {
				temp = keyList[a];
				keyList[a] = keyList[a+1];
				keyList[a+1] = temp;
				x = 1;
			}
		}
	}
	keyList = listToType(keyList, "string");
	return keyList;
}

var timerItems = [];
var timerItem = [];
var renderTimers = function() {
	var storage = window.localStorage;
	var storageKeys = sortKeys(Object.keys(storage));
	var savedTimers = "<h1>日時タイマー： <button id='renderCodeButton' onclick='renderCode()'><small>タイマーのコードを得る </small></button></h1><small id='quickSetup' style='display:none'></small>";
	if (storageKeys.length == 1 && storageKeys[0] == "counter") {
		elemSelector("#savedTimers").innerHTML = "";
		return;
	}
	for (var x=0; x<storageKeys.length; x+=1) {
		timerItem = localStorage.getItem(storageKeys[x]).split(",");
		savedTimers += "<p><span class='storedTimerName'>" + timerItem[0] + "</span> <span class='storedTimerTime' id='storedTimer" + storageKeys[x] + "'></span>" + " <span class='storedTimerFullDateTime'>" + timerItem[2] + "</span>" + "<button class='deleteTimerButton' onclick='removeStoredTimer(`" + storageKeys[x] + "`)'>削除する</button></p>";
		timerItems.push([timerItem, "storedTimer"+storageKeys[x]]);
	}
	elemSelector("#savedTimers").style.display = "block";
	elemSelector("#savedTimers").innerHTML = savedTimers;
	for (var y=0; y<timerItems.length; y+=1) {
		dtDiffDisplayTimers(elemSelector("#"+timerItems[y][1]), timerItems[y][0]);
	}
}

var renderCode = function() {
	elemSelector("#renderCodeButton").innerHTML = "<small>タイマーのコードを隠す</small>";
	if (elemSelector("#quickSetup").style.display == "block") {
		elemSelector("#renderCodeButton").innerHTML = "<small>タイマーのコードを得る</small>";
		elemSelector("#quickSetup").style.display = "none";
		return;
	};
	var code = "このコードはウェブブラウザの開発コンソール「F12キーボードのキー」で日時タイマーを設定される; <br>これは便利バックアップができます（もしウェブブラウザのキャッシュが削除されましたことか、タイマーを誤って削除されましたことか）; <br>このコードが他の人に共有できます。しかし、ご注意ください： このコードがウェブサイトの日時タイマーを全部上書きします。<br><br>タイマーのコード：<br><span id='timerCode'>timerStorage = window.localStorage; timerStorage.clear(); ";
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
