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

// generate URL
var generateURL = function() {
	elemSelector("#generatedURL").style.display = "block";
	if (elemSelector("#URLname").value.trim() != "") {
		var name = elemSelector("#URLname").value;
        name = name.replaceAll(" ", "_");
        query.push(name);
	}
    var fullUrl = url+query.join("-");
	elemSelector("#datetimeURL").innerText = fullUrl;
    elemSelector("#datetimeURL").href = fullUrl;
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
	var name = (urlQueryParsed[2]) ? urlQueryParsed[2].replaceAll("_", " ") : null;

	// display banner
	elemSelector("#title").innerText = name;
	if (name) { elemSelector("#title").style.display = "block"; }

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

	// fill out end date-time fields
	var endPts = end.split("_");
	endDateTime = parseQueryToDt(end);
	elemSelector('#endDate').value = endPts[0]+"-"+endPts[1]+"-"+endPts[2];
	elemSelector('#endTime').value = endPts[3]+":"+endPts[4];

	// submit the form
	elemSelector("#submit").click();
};

// do URL workflow if there is a query
if (window.location.search.length > 0) {
	URLworkflow();
}