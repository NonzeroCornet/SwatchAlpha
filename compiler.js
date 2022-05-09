if (location.protocol != "https:") {
  location.href =
    "https:" + window.location.href.substring(window.location.protocol.length);
}
var input = document.getElementsByTagName("div")[1];
input.spellcheck = false;
input.focus();
input.blur();
var output = document.getElementsByTagName("p")[0];
var code = input.innerHTML;
var mobileBtnHandler = document.getElementById("mobileBtnHandler");

const ua = navigator.userAgent;
if (
  /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
  /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
    ua
  )
) {
  mobileBtnHandler.style.display = "block";
} else {
  mobileBtnHandler.style.display = "none";
}

function updateCode() {
  var inSplit = input.innerHTML.split("");
  var inSplitTwo = input.innerHTML.split("");
  for (let i = 0; i < inSplit.length; i++) {
    if (
      inSplit[i] != "+" &&
      inSplit[i] != "x" &&
      inSplit[i] != "t" &&
      inSplit[i] != "o" &&
      inSplit[i] != "u" &&
      inSplit[i] != " " &&
      inSplit[i] != "\n"
    ) {
      inSplit[i] = "";
    }
  }
  code = inSplit.join("");
  for (let i = 0; i < inSplitTwo.length; i++) {
    if (inSplitTwo[i] == "+") {
      inSplitTwo[i] = "<span class='b'>+</span>";
    } else if (inSplitTwo[i] == "x") {
      inSplitTwo[i] = "<span class='e'>x</span>";
    } else if (inSplitTwo[i] == "o") {
      inSplitTwo[i] = "<span class='h'>o</span>";
    } else if (inSplitTwo[i] == "u") {
      inSplitTwo[i] = "<span class='g'>u</span>";
    } else if (inSplitTwo[i] == "t") {
      inSplitTwo[i] = "<span class='w'>t</span>";
    }
  }
  input.innerHTML = inSplitTwo.join("");
  const selection = window.getSelection();
  const range = document.createRange();
  selection.removeAllRanges();
  range.selectNodeContents(input);
  range.collapse(false);
  selection.addRange(range);
  input.focus();
}

input.addEventListener("keydown", function (event) {
  var code = event.keyCode || event.which;
  if (code === 9) {
    event.preventDefault();
    if (document.selection) {
      input.focus();
      var sel = document.selection.createRange();
      sel.text = "&nbsp;&nbsp;&nbsp;&nbsp;";
    } else if (input.selectionStart || input.selectionStart == "0") {
      var startPos = input.selectionStart;
      var endPos = input.selectionEnd;
      input.innerHTML =
        input.innerHTML.substring(0, startPos) +
        "&nbsp;&nbsp;&nbsp;&nbsp;" +
        input.innerHTML.substring(endPos, input.innerHTML.length);
    } else {
      input.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
    }
  }
});

document.addEventListener("keydown", function (event) {
  var code = event.keyCode || event.which;
  if (code === 69) {
    toggleHide();
  } else if (code === 82) {
    run();
  } else if (code === 67) {
    output.innerHTML = "";
  }
});

input.addEventListener("keyup", function (event) {
  var code = event.keyCode || event.which;
  if (event.key === "+" || code === 88 || code === 79 || code === 85 || code === 84) {
    updateCode();
  }
});

function toggleHide() {
  if (input.style.visibility == "hidden") {
    input.style.visibility = "visible";
  } else {
    input.style.visibility = "hidden";
  }
}

var functions = [];
var bigNum = 0;
var codeFuncs = [];
var codes = [];
var smolNum = 0;
var hasPrinted = false;

function run() {
  hasPrinted = false;
  smolNum = 0;
  bigNum = 0;
  functions = [];
  codes = code.split("");
  for (let i = 0; i < codes.length; i++) {
    if (
      codes[i] != "+" &&
      codes[i] != "x" &&
      codes[i] != "t" &&
      codes[i] != "o" &&
      codes[i] != "u"
    ) {
      codes[i] = "";
    }
  }
  codeFuncs = codes.join("").split("o");
  for (let i = 0; i < codeFuncs.length - 1; i++) {
    functions.push(codeFuncs[i].split(""));
  }
  var index = 0;
  for (var i = 0; i < codeFuncs[codeFuncs.length - 1].length; i++) {
    if (codeFuncs[codeFuncs.length - 1].split("")[i] == "+") {
      smolNum == 9 ? (smolNum = -9) : smolNum++;
    } else if (codeFuncs[codeFuncs.length - 1].split("")[i] == "x") {
      execute(smolNum);
    } else if (codeFuncs[codeFuncs.length - 1].split("")[i] == "t") {
      bigNum += smolNum;
    } else if (codeFuncs[codeFuncs.length - 1].split("")[i] == "u") {
      output.innerHTML += String.fromCharCode(bigNum);
      hasPrinted = true;
    }
  }
  if (hasPrinted) {
    output.innerHTML += "<br>";
  }
}

var reExecutions = 0;

function execute(functionIndex) {
  for (var i = 0; i < functions[functionIndex].length; i++) {
    if (functions[functionIndex][i] == "+") {
      bigNum++;
    } else if (functions[functionIndex][i] == "t") {
      bigNum += smolNum;
    } else if (functions[functionIndex][i] == "u") {
      bigNum = prompt(
        "Taking Input... (Will only take in first character)"
      ).charCodeAt(0);
    } else if (functions[functionIndex][i] == "x") {
      execute(bigNum);
      reExecutions++;
      if (reExecutions == 5000) {
        alert("CALL STACK SIZE EXCEEDED! ABORTING!!!");
        reExecutions = 0;
        return;
      }
    }
  }
}
