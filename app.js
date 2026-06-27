// Live Date & Time
function updateTime() {
    const now = new Date();

    document.getElementById("date").innerHTML =
        now.toLocaleDateString("en-PK", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    document.getElementById("time").innerHTML =
        now.toLocaleTimeString("en-PK");
}

// Smart Greeting
function updateGreeting() {
    const hour = new Date().getHours();
    let message = "";

    if (hour < 12) {
        message = "🌅 Good Morning, Imran";
    } else if (hour < 17) {
        message = "☀️ Good Afternoon, Imran";
    } else if (hour < 20) {
        message = "🌇 Good Evening, Imran";
    } else {
        message = "🌙 Good Night, Imran";
    }

    document.getElementById("greeting").innerHTML = message;
    document.getElementById("updated").innerHTML =
        new Date().toLocaleTimeString("en-PK");
}

// Prayer Times
async function loadPrayerTimes() {
    try {
        const response = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Sakesar&country=Pakistan&method=2");
        const data = await response.json();
        const t = data.data.timings;

        document.getElementById("prayer").innerHTML =
            `🌅 Fajr: ${t.Fajr}<br>
             ☀️ Dhuhr: ${t.Dhuhr}<br>
             🌇 Asr: ${t.Asr}<br>
             🌆 Maghrib: ${t.Maghrib}<br>
             🌙 Isha: ${t.Isha}`;
    } catch (e) {
        document.getElementById("prayer").innerHTML =
            "Unable to load prayer times.";
    }
}

// Live USD / PKR
async function loadDollar() {

    try {

        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();

        const rate = data.rates.PKR;

        document.getElementById("usd").innerHTML =
            "💵 USD/PKR: " + rate.toFixed(2);

    } catch (e) {

        document.getElementById("usd").innerHTML =
            "Unable to load exchange rate.";

    }

}

loadDollar();
async function loadHijriDate() {

    try {

        const response = await fetch(
        "https://api.aladhan.com/v1/gToH");

        const data = await response.json();

        document.getElementById("hijri").innerHTML =
            "🌙 " + data.data.hijri.day + " " +
            data.data.hijri.month.en + " " +
            data.data.hijri.year + " AH";

    } catch {

        document.getElementById("hijri").innerHTML =
            "Hijri date unavailable";

    }

}

loadHijriDate();
// Hijri Date
async function loadHijri() {
    try {
        const response = await fetch("https://api.aladhan.com/v1/gToH");
        const data = await response.json();

        document.getElementById("hijri").innerHTML =
            "🌙 " +
            data.data.hijri.day + " " +
            data.data.hijri.month.en + " " +
            data.data.hijri.year + " AH";
    } catch {
        document.getElementById("hijri").innerHTML = "Unavailable";
    }
}

// Gold (temporary)
function loadGold() {
    document.getElementById("gold").innerHTML =
    "🇵🇰 Pakistan: Rs. 364,000 / tola<br>🌍 International: $3,330 / oz";
}

// Refresh
function refreshDashboard(){

    updateTime();
    updateGreeting();
    loadPrayerTimes();
    loadHijri();
    loadDollar();
    loadGold();

    document.getElementById("updated").innerHTML =
    new Date().toLocaleTimeString("en-PK");

}

// Start
loadHijri();
loadGold();
refreshDashboard();