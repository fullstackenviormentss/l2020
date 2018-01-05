var degres = 0;
var hRot = 0;
var mRot = 0;
var sRot = 0;
window.onload = function() {
    Resize();
    var secondes = document.getElementById('secondes');
    var minutes = document.getElementById('minutes');
    var heures = document.getElementById('heures');
    var day = document.getElementById('day');
    secondes.count = 0;
    minutes.count = 0;
    heures.count = 0;
    function wtii() {
        date = new Date();
        var heure = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var miliSec = date.getMilliseconds();
        min = 30;
        var secRot = (sec * 360) / 60;
        var miliSecToSecRot = (miliSec * 360) / 60000;
        sRot = secRot + miliSecToSecRot;

        var minRot = (min * 360) / 60;
        var secToMinRot = (sec * 360) / 3600;
        mRot = minRot + secToMinRot;

        var heurRot = (heure * 360) / 12;
        var minToHeurRot = (min * 360) / 720;
        hRot = heurRot + minToHeurRot;
        var Day = date.getDate();
        day.innerHTML = Day;
        if (Day < 10) {
            day.style.fontSize = "18px";
        }
        trace(min);
        degres++;
        heures.style.msTransform = "rotate(" + (hRot + heures.count) + "deg)";
        minutes.style.msTransform = "rotate(" + (mRot + minutes.count) + "deg)";
        secondes.style.msTransform = "rotate(" + (sRot + secondes.count) + "deg)";
        heures.style.mozTransform = "rotate(" + (hRot + heures.count) + "deg)";
        minutes.style.mozTransform = "rotate(" + (mRot + minutes.count) + "deg)";
        secondes.style.mozTransform = "rotate(" + (sRot + secondes.count) + "deg)";
        heures.style.webkitTransform = "rotate(" + (hRot + heures.count) + "deg)";
        minutes.style.webkitTransform = "rotate(" + (mRot + minutes.count) + "deg)";
        secondes.style.webkitTransform = "rotate(" + (sRot + secondes.count) + "deg)";
        setTimeout(wtii, 10);
    }
    wtii();
    var tweenS = TweenLite.to(secondes, 1, { count: 360, ease: Power3.easeInOut });
    var tweenM = TweenLite.to(minutes, 1, { delay: 0.3, count: 360, ease: Power3.easeInOut });
    var tweenH = TweenLite.to(heures, 1, { delay: 0.6, count: 360, ease: Power3.easeInOut });
}
function Resize() {
    console.log("resize");
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || document.body.offsetWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || document.body.offsetHeight;
    var sizeFixed = 640;
    var banner = document.getElementById("container");
    var bannerW = document.getElementById("container").clientWidth,
        bannerH = document.getElementById("container").clientHeight;
    var scaleW = ((bannerW * 100) / sizeFixed) / 100,
        scaleH = ((bannerH * 100) / sizeFixed) / 100;
    if (w > h) {
        if (h >= sizeFixed) {
            document.getElementById("aiguilles").style.transform = "scale(1)";
            document.getElementById("aiguilles").style.webkitTransform  = "scale(1)";
            document.getElementById("aiguilles").style.MozTransform  = "scale(1)";
            document.getElementById("aiguilles").style.msTransform  = "scale(1)";
            document.getElementById("aiguilles").style.OTransform   = "scale(1)";
            banner.style.width = sizeFixed + 'px';
            banner.style.height = sizeFixed + 'px';
        } else {
            banner.style.width = h + 'px';
            banner.style.height = h + 'px';
            scaleW = ((bannerH * 100) / sizeFixed) / 100;
            scaleH = ((bannerH * 100) / sizeFixed) / 100;
            document.getElementById("aiguilles").style.transform = "scale(" + scaleW + ")";
            document.getElementById("aiguilles").style.webkitTransform  = "scale(" + scaleW + ")";
            document.getElementById("aiguilles").style.MozTransform  = "scale(" + scaleW + ")";
            document.getElementById("aiguilles").style.msTransform  = "scale(" + scaleW + ")";
            document.getElementById("aiguilles").style.OTransform  = "scale(" + scaleW + ")";
        }
    } else {
        if (w >= sizeFixed) {
            document.getElementById("aiguilles").style.transform = "scale(1)";
            document.getElementById("aiguilles").style.webkitTransform  = "scale(1)";
            document.getElementById("aiguilles").style.MozTransform  = "scale(1)";
            document.getElementById("aiguilles").style.msTransform  = "scale(1)";
            document.getElementById("aiguilles").style.OTransform   = "scale(1)";
            banner.style.width = sizeFixed + 'px';
            banner.style.height = sizeFixed + 'px';
        } else {
            banner.style.width = w + 'px';
            banner.style.height = w + 'px';
            scaleW = ((bannerW * 100) / sizeFixed) / 100;
            scaleH = ((bannerW * 100) / sizeFixed) / 100;
            document.getElementById("aiguilles").style.transform = "scale(" + scaleH + ")";
            document.getElementById("aiguilles").style.webkitTransform  = "scale(" + scaleH + ")";
            document.getElementById("aiguilles").style.MozTransform  = "scale(" + scaleH + ")";
            document.getElementById("aiguilles").style.msTransform  = "scale(" + scaleH + ")";
            document.getElementById("aiguilles").style.OTransform  = "scale(" + scaleH + ")";
        }
    }
};
function onResize() {
    Resize();
};
window.addEventListener("resize", onResize);
