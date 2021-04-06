// generate URL query
var generateURLquery = function() {
	elemSelector("#generatedURL").style.display = "none";
	query = [];
	if (nowStart) {
		query.push("now");
	} else {
		query.push(startDateTime);
	};
	query.push(endDateTime);
	return query;
}

// generate URL
var generateURL = function() {
	elemSelector("#generatedURL").style.display = "block";
	if (elemSelector("#URLname").value.trim() != "") {
		var name = elemSelector("#URLname").value;
        name = name.replace(" ", "_");
        query.push(name);
	}
    var fullUrl = url+query.join("-");
	elemSelector("#datetimeURL").innerText = fullUrl;
    elemSelector("#datetimeURL").href = fullUrl;
};

