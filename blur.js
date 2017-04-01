// Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
window.addEventListener("scroll", myFunction);
var maxBlurEms = 2;
var scale = 1.3;
myFunction();

function myFunction() {
    var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    var ems = maxBlurEms - (scrollpercent * maxBlurEms);
    var newCSS = "body:before { -webkit-transform: scale(" + scale + "); filter: blur(" + ems + "em);}";
    document.getElementById('blurrer').innerHTML /*style.filter*/ = newCSS;
    //console.log(newCSS);
}