elemSelector("#navbar").innerHTML = `
    <img src="assets/logo.png" />
    <ul>
        <li onclick="navi('https://github.com/senaonp/datetime-timer.com')"><a href="https://github.com/senaonp/datetime-timer.com">Github Repo</a></li>
        <li onclick="toggleBanner()">About</li>
    </ul>
    <div id="banner" style="display:none">
        <p id="datetimeTimerDescription"></p>
        <button onclick="hideElem(elemSelector('#banner'))">close</button>
    </div>`;

elemSelector("#datetimeTimerDescription").innerHTML = `
    datetime timer is a development side project i'm currently working on during free time; any updates to the website will be added to the Github repository.<br>a video demonstration of using the website is also available <a target='_blank' href='https://fbacarisas.xyz/video/#datetime_timer'>(here)</a>
	<br><hr><br>the current features of datetime timer are<br>
	<span class="feature">display days, hours, minutes, and seconds from current time to specified end datetime</span>
	<span class="feature">display time information between two specified datetimes</span>
	<span class="feature">generate URL for saving and/or sharing results</span>
	<span class="feature">responsive styling for mobile devices</span>
	<br>
	my other programming projects can also be viewed here: (<a target="_blank" href="https://fbacarisas.xyz/video/#programming_playlist">fbacarisas.xyz/video/#programming_playlist</a>)
	<br><br>`;

elemSelector("#content").innerHTML = `
	<div id="savedTimers" style="display:none"></div>
	<div id="titleDiv"><h1 id="title" style="display:none">{{URL title}}<br><span id="timerFullTitle">{{time}}</span></h1></div>

	<div id="langElem">
		<a class="lang" href="./">en</a> | 
		<a class="lang" href="./zh/">中文</a> | 
		<a class="lang" href="./jp/">日本語</a>
	</div>

    <div id="startDateTime">
        <h1>Start date-time</h1>
        <div id="startNow">
            <input id="nowOpt" type="radio" checked=true oninput="evalOpt(true)"></input>
            <p class="bottomBorder">Now</p>
            <small>counts down from now to the end date-time</small>
            <p>date - <span id="nowDate"></span></p>
            <p>time - <span id="nowTime"></span></p>
        </div>
        <div id="startCustom">
            <input id="customOpt" type="radio" oninput="evalOpt(false)"></input>
            <p class="bottomBorder">Custom</p>
            <small>gets the difference between two date-times</small>
            <div class="field"><label>date </label><input id="startDateCustom" type="date"></input></div>
            <div class="field"><label>time </label><input id="startTimeCustom" type="time"></input></div>
        </div>
    </div>

    <div id="endDateTime">
        <h1>End date-time</h1>
        <div class="field"><label>date </label><input id="endDate" type="date"></input></div>
        <div class="field"><label>time </label><input id="endTime" type="time"></input></div>
    </div>

    <div class="center"><p id="errors" style="display:none"></p></div>
    <div class="center"><button class="button" id="submit" onclick="submitTimer();">Submit</button></div>

    <div id="result" style="display:none">
        <div id="timerPassed">
            <h1>the datetime <span id="resultEndPassed">{{endDatetime}}</span> has passed</h1>
        </div>
        <div id="timer">
            <h1 id="timerFull">{{days}}d - [{{hours}}:{{minutes}}:{{seconds}}]</h1>
            <h3 id="resultDesc">time from <span id="resultStart">{{startDatetime}}</span> to <span id="resultEnd">{{endDatetime}}</span></h3>
        </div>
		<div id="outputElements">
			<div id="saveTimerElem">
				<div class="field genField">
					<span class="detail">you can save the timer to the browser using the button below</span>
				</div>
				<div class="field">
					<label>name for timer (optional) </label><input id="timerName" type="text"></input><br>
					<small>note: names can include any characters except for comma [,] or [&#96] backtick characters</small><br> 
					<button class="button" id="saveTimerButton" onclick="saveTimer(elemSelector('#timerName')); initializeSavedTimers();">save the timer to the browser</button>
					<div id="savedTimerVerify" style="display:none"></div>
				</div>
			</div>
			<div id="generateURLelem">
				<div class="field genField">
					<span class="detail">you can generate a URL link for this result using the button below</span>
				</div>
				<div class="field">
					<label>name for URL (optional) </label> <input id="URLname" type="text"></input><br>
					<small>note: names can include any characters except for dash [-] or underscore [_] characters</small><br>
					<button class="button" id="getLinkButton" onclick="generateURL()">generate a link for this result</button>
				</div>
				<div class="center">
					<p id="urlnameError" style="display:none"></p>
				</div>
				<div id="generatedURL" style="display:none">
					datetime URL: <a id="datetimeURL" target="_blank">https://datetime-timer.com?{{start}}-{{end}}-{{url_title}}</a>
				</div>
			</div>
		</div>
    </div>`;

elemSelector("#footer").innerHTML = `
    <span>developed by senaonp</span>
    <br><br>
    <span>datetime-timer source code is available on <a target="_blank" href="https://github.com/senaonp/datetime-timer.com">GitHub</a> (･‿･✿)</span>
    <br><br>
    <span>email: <a href="mailto:dev@greentea.moe">dev@greentea.moe</a></span>`;
