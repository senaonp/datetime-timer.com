// initialize vars
var urlname = null;
var fullUrl = null;
var isNameValid = null;
var urlNameField = null;
var isTitleDisplay = false;

// generate URL query
var generateURLquery = function() {
	elemSelector("#generatedURL").style.display = "none";
	query = [];
	if (nowStart) {
		query.push("now");
	} else {
		query.push(parseDtToQuery(startDateTime));
	};
	query.push(parseDtToQuery(endDateTime));
	return query;
}

var validateURLname = function() {
	if (urlNameField.search(/[-_]/) != -1) { 
		elemSelector("#urlnameError").style.display = "block";
		elemSelector("#generatedURL").style.display = "none";
		elemSelector("#urlnameError").innerText = "error: the URL name cannot contain either dash '-' \
		and/or underscore '_' characters due to how the URLs are parsed; please specify a name that does not \
		include these characters and try again";
		return false;
	};
	elemSelector("#urlnameError").style.display = "none";
	return true;
};

// generate URL
var generateURL = function() {
	query = query.slice(0,2);
	urlNameField = elemSelector("#URLname").value.trim();
	if (urlNameField != "") {
		isNameValid = validateURLname();
		if (isNameValid) {
			urlname = urlNameField.replaceAll(" ", "_");
        	query.push(urlname);
		} else {
			return false;
		};
	};
    fullUrl = url+query.join("-");
	elemSelector("#datetimeURL").innerText = fullUrl;
    elemSelector("#datetimeURL").href = fullUrl;
	elemSelector("#generatedURL").style.display = "block";
};

// parse datetime to query form
var parseDtToQuery = function(date) {
	var pts = [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes()];
	var r = [];
	pts.forEach(function(pt) {
		if (pt < 10) { r.push("0"+pt); }
		else { r.push(pt); }
	});
	return r.join("_");
};

// parse query form to datetime
var parseQueryToDt = function(query) {
	var pts = query.split("_");
	return new Date(pts[0], pts[1], pts[2], pts[3], pts[4]);
};

// URL workflow
var URLworkflow = function() {
	var urlQuery = window.location.search;
	var urlQueryParsed = urlQuery.slice(1).split("-");
	var start = urlQueryParsed[0];
	var end = urlQueryParsed[1];
	if (urlQueryParsed[2]) {
		var name = decodeURIComponent(urlQueryParsed[2]);
	} else {
	 	var name = null;
	}

	// fill out start date-time fields
	if (start === "now") {
		startDateTime = new Date();
		elemSelector('#nowOpt').click();
	} else {
		var startPts = start.split("_");
		startDateTime = parseQueryToDt(start);
		elemSelector('#customOpt').click();
		elemSelector('#startDateCustom').value = startPts[0]+"-"+startPts[1]+"-"+startPts[2];
		elemSelector('#startTimeCustom').value = startPts[3]+":"+startPts[4];
	}

	// display banner
	if (name) {
		elemSelector("#title").innerHTML = name.replaceAll("_", " ") +
		"<br><br><span id='timerFullTitle'>{{time}}</span>";
		elemSelector("#title").style.display = "block";
	}

	// fill out end date-time fields
	var endPts = end.split("_");
	endDateTime = parseQueryToDt(end);
	elemSelector('#endDate').value = endPts[0]+"-"+endPts[1]+"-"+endPts[2];
	elemSelector('#endTime').value = endPts[3]+":"+endPts[4];

	// submit the form
	elemSelector("#submit").click();
	isTitleDisplay = true;
};

// do URL workflow if there is a query
if (window.location.search.length > 0) {
	URLworkflow();
}