elemSelector("#navbar").innerHTML = `
    <img src="assets/logo.png" />
    <ul>
        <li onclick="confirmEvent(navi, 'this tab will redirect to the datetime-timer GitHub repository; continue to (https://github.com/Tofuni/abacus9)?', 'https://github.com/Tofuni/datetime-timer.com')">GitHub Repo</li>
        <li onclick="toggleBanner()">About</li>
    </ul>
    <div id="banner" style="display:none">
        <p id="datetimeTimerDescription"></p>
        <button onclick="hideElem(elemSelector('#banner'))">close</button>
    </div>`;

elemSelector("#datetimeTimerDescription").innerHTML = `
    datetime-timer is a development side project i'm currently working on during free time. any updates to the website will be added to the Github repository<br>
    please feel free to send any feedback to <a href="mailto:tofuni.dev@gmail.com">(tofuni.dev@gmail.com)</a> and let me know if the applet has been useful, thanks!
    <br><br>`;

elemSelector("#footer").innerHTML = `
    <span>developed by Tofuni</span>
    <br><br>
    <span>datetime-timer source code is available on <a target="_blank" href="https://github.com/Tofuni/datetime-timer.com">GitHub</a> (･‿･✿)</span>
    <br><br>
    <span>email: <a href="mailto:tofuni.dev@gmail.com">(tofuni.dev@gmail.com)</a></span>`;
