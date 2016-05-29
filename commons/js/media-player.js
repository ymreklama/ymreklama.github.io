$(function() {
  if(versionIE() > 8 || versionIE() == false || isNaN(versionIE())) {
    $('video').mediaelementplayer();
  }
});

function versionIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
  else                 // If another browser, return 0
    return false;

  return false;
}