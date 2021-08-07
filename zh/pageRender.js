elemSelector("#navbar").innerHTML = `
    <img src="../assets/logo.png" />
    <ul>
        <li onclick="navi('https://github.com/senaonp/datetime-timer.com')"><a href="https://github.com/senaonp/datetime-timer.com">Github存储库</a></li>
        <li onclick="toggleBanner()">关于</li>
    </ul>
    <div id="banner" style="display:none">
        <p id="datetimeTimerDescription"></p>
        <button onclick="hideElem(elemSelector('#banner'))">关闭</button>
    </div>`;

elemSelector("#datetimeTimerDescription").innerHTML = `
    我空闲时间里从事于这个网站；都更新在Github存储库<br>使用网站的视频示可以在<a target='_blank' href='https://fbacarisas.xyz/video/#datetime_timer'>这里</a>看
	<br><hr><br>datetime-timer【日期时间的计时器】的特征是<br>
	<span class="feature">展示日，小时，分钟，和秒的现在和结束日期之间的时间。</span>
	<span class="feature">计算两个日期时间之间的差值</span>
	<span class="feature">为了保存还是分享，你能生成网址</span>
	<span class="feature">响应式设计</span>
	<br>
	我的其他编程项目在<a target="_blank" href="https://fbacarisas.xyz/video/#programming_playlist">这里</a>
	<br><br>`;

elemSelector("#content").innerHTML = `
    <div id="titleDiv"><h1 id="title" style="display:none">{{URL title}}<br><span id="timerFullTitle">{{time}}</span></h1></div>
	
	<div id="langElem">
		<a class="lang" href="./../">en</a> | 
		<a class="lang" href="./zh/">中文</a>
	</div>

    <div id="startDateTime">
        <h1>开始日期时间</h1>
        <div id="startNow">
            <input id="nowOpt" type="radio" checked=true oninput="evalOpt(true)"></input>
            <p class="bottomBorder">现在</p>
            <small>倒数现在和结束日期之间的时间</small>
            <p>日期 - <span id="nowDate"></span></p>
            <p>时间 - <span id="nowTime"></span></p>
        </div>
        <div id="startCustom">
            <input id="customOpt" type="radio" oninput="evalOpt(false)"></input>
            <p class="bottomBorder">自定</p>
            <small>计算两个日期时间之间的差值</small>
            <div class="field"><label>日期 </label><input id="startDateCustom" type="date"></input></div>
            <div class="field"><label>时间 </label><input id="startTimeCustom" type="time"></input></div>
        </div>
    </div>

    <div id="endDateTime">
        <h1>结束日期时间</h1>
        <div class="field"><label>日期 </label><input id="endDate" type="date"></input></div>
        <div class="field"><label>时间 </label><input id="endTime" type="time"></input></div>
    </div>

    <div class="center"><p id="errors" style="display:none"></p></div>
    <div class="center"><button class="button" id="submit" onclick="submitTimer();">提交</button></div>

    <div id="result" style="display:none">
        <div id="timerPassed">
            <h1>日期时间 <span id="resultEndPassed">{{endDatetime}}</span> 完了</h1>
        </div>
        <div id="timer">
            <h1 id="timerFull">日{{days}} - [{{hours}}:{{minutes}}:{{seconds}}]</h1>
            <h3 id="resultDesc"> 从 <span id="resultStart">{{startDatetime}}</span> 到 <span id="resultEnd">{{endDatetime}}</span></h3>
        </div>
        <hr>
        <div id="generateURLelem">
            <div class="field bottomSpacing"><p>使用下面的按钮，你能生成网址</p></div>
            <div class="field"><label>网址的名（可选的）</label> <input id="URLname" type="text"></input><br><small>注意：名不能有连字符字 “-” 还是划线字 “_” </small></div>
            <div class="center"><p id="urlnameError" style="display:none"></p></div>
            <div class="field"><button class="button" id="getLink" onclick="generateURL()">生成网址</button></div>
            <div id="generatedURL" style="display:none">【日期时间的计时器】网址: <a id="datetimeURL" target="_blank">https://datetime-timer.com?{{start}}-{{end}}-{{url_title}}</a></div>
        </div>
    </div>`;

elemSelector("#footer").innerHTML = `
    <span>senaonp制作</span>
    <br><br>
    <span>datetime-timer【日期时间的计时器】源代码在<a target="_blank" href="https://github.com/senaonp/datetime-timer.com">GitHub</a> (･‿･✿)</span>
    <br><br>
    <span>电子邮件：（<a href="mailto:dev@greentea.moe">dev@greentea.moe</a>）</span>`;
