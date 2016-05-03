

globals = {};
globals.test = 'globals test text';
globals.showNote = function(text) {
  alert(text);
};

globals = globals || {};


$(document).ready(function() {
  globals.showNote("Test alert from boot.js file with globals.js value: " + globals.test);
});