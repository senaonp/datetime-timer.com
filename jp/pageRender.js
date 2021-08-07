elemSelector("#navbar").innerHTML = `
    <img src="../assets/logo.png" />
    <ul>
        <li onclick="navi('https://github.com/senaonp/datetime-timer.com')"><a href="https://github.com/senaonp/datetime-timer.com">Githubレポジトリ</a></li>
        <li onclick="toggleBanner()">「日時タイマー」について</li>
    </ul>
    <div id="banner" style="display:none">
        <p id="datetimeTimerDescription"></p>
        <button onclick="hideElem(elemSelector('#banner'))">閉じる</button>
    </div>`;

elemSelector("#datetimeTimerDescription").innerHTML = `
    私は暇中で「日時タイマー」をプログラムします。<a target="_blank" href="https://github.com/senaonp/datetime-timer.com">GitHub</a>では「日時タイマー」のソースコードがあります。<br>ウェブサイトを使用するのビデオが<a target='_blank' href='https://fbacarisas.xyz/video/#datetime_timer'>こちら</a>です。
	<br><hr><br>「日時タイマー」の特徴は<br>
	<span class="feature">今から終了日時までの期間を表示する「日、時間、分、秒」</span>
	<span class="feature">2つ日時の間の期間を計算する</span>
	<span class="feature">「日時タイマー」URLを生成できます</span>
	<span class="feature">レスポンシブスタイリング</span>
	<br>
	私の他のプロジェクトが<a target="_blank" href="https://fbacarisas.xyz/video/#programming_playlist">かちら</a>で見られます
	<br><br>`;

elemSelector("#content").innerHTML = `
    <div id="titleDiv"><h1 id="title" style="display:none">{{URL title}}<br><span id="timerFullTitle">{{time}}</span></h1></div>
	
	<div id="langElem">
		<a class="lang" href="./../">en</a> | 
		<a class="lang" href="./../zh/">中文</a> | 
		<a class="lang" href="./">日本語</a>
	</div>

    <div id="startDateTime">
        <h1>開始日時</h1>
        <div id="startNow">
            <input id="nowOpt" type="radio" checked=true oninput="evalOpt(true)"></input>
            <p class="bottomBorder">今</p>
            <small>今から終了日時までの期間の秒読みをします</small>
            <p>日付 - <span id="nowDate"></span></p>
            <p>時間 - <span id="nowTime"></span></p>
        </div>
        <div id="startCustom">
            <input id="customOpt" type="radio" oninput="evalOpt(false)"></input>
            <p class="bottomBorder">自定</p>
            <small>2つ日時の間の期間を計算します</small>
            <div class="field"><label>日付 </label><input id="startDateCustom" type="date"></input></div>
            <div class="field"><label>時間 </label><input id="startTimeCustom" type="time"></input></div>
        </div>
    </div>

    <div id="endDateTime">
        <h1>終了日時</h1>
        <div class="field"><label>日付 </label><input id="endDate" type="date"></input></div>
        <div class="field"><label>時間 </label><input id="endTime" type="time"></input></div>
    </div>

    <div class="center"><p id="errors" style="display:none"></p></div>
    <div class="center"><button class="button" id="submit" onclick="submitTimer();">提出します</button></div>

    <div id="result" style="display:none">
        <div id="timerPassed">
            <h1>the datetime <span id="resultEndPassed">{{endDatetime}}</span> has passed</h1>
        </div>
        <div id="timer">
            <h1 id="timerFull">{{days}}日 - [{{hours}}:{{minutes}}:{{seconds}}]</h1>
            <h3 id="resultDesc"><span id="resultStart">{{startDatetime}}</span> から <span id="resultEnd">{{endDatetime}}</span>　まで期間です。</h3>
        </div>
        <hr>
        <div id="generateURLelem">
            <div class="field bottomSpacing"><p>下のボタンで「日時タイマー」URLを生成できます</p></div>
            <div class="field"><label>URL名 （オプショナル） </label> <input id="URLname" type="text"></input><br><small>注意: URL名はハイフン字「-」とアンダースコア字「_」が含でありますん</small></div>
            <div class="center"><p id="urlnameError" style="display:none"></p></div>
            <div class="field"><button class="button" id="getLink" onclick="generateURL()">このタイマーのURLを生成します</button></div>
            <div id="generatedURL" style="display:none">日時URL: <a id="datetimeURL" target="_blank">https://datetime-timer.com/jp/?{{start}}-{{end}}-{{url_title}}</a></div>
        </div>
    </div>`;

elemSelector("#footer").innerHTML = `
    <span>senaonpが作りました</span>
    <br><br>
    <span><a target="_blank" href="https://github.com/senaonp/datetime-timer.com">GitHub</a>では「日時タイマー」のソースコードがあります (･‿･✿)</span>
    <br><br>
    <span>電子メール： <a href="mailto:dev@greentea.moe">dev@greentea.moe</a></span>`;
