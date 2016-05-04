
globals = globals || {};


$(document).ready(function() {
  globals.showNote("Test alert from boot.js file with globals.js value: " + globals.test);
});