const result = document.getElementById("result");
const historyList = document.getElementById("historyList");
const angleToggle = document.getElementById("angleToggle");
const themeToggle = document.getElementById("themeToggle");
const sciToggle = document.getElementById("sciToggle");

function appendFunction(value) {
  result.value += value;
}

function clearDisplay() {
  result.value = "";
}

function deleteLast() {
  result.value = result.value.slice(0, -1);
}

function calculate() {
  let expression = result.value;

  try {
    // Replace ^ with ** for exponentiation
    expression = expression.replace(/\^/g, "");

    // Handle trigonometric functions
    expression = expression.replace(/sin\(([^)]+)\)/g, function (_, val) {
      return "Math.sin(" + convertToRadians(eval(val)) + ")";
    });

    expression = expression.replace(/cos\(([^)]+)\)/g, function (_, val) {
      return "Math.cos(" + convertToRadians(eval(val)) + ")";
    });

    expression = expression.replace(/tan\(([^)]+)\)/g, function (_, val) {
      return "Math.tan(" + convertToRadians(eval(val)) + ")";
    });

    // Evaluate the final expression
    let evalResult = Function('"use strict"; return (' + expression + ')')();

    // Format result
    if (sciToggle.checked) {
      result.value = Number(evalResult).toExponential(5);
    } else {
      result.value = roundOutput(evalResult);
    }

    addToHistory(result.value, expression);
  } catch (e) {
    result.value = "Error";
  }
}

function convertToRadians(deg) {
  return angleToggle.checked ? deg : (deg * Math.PI) / 180;
}

function roundOutput(num) {
  return Math.round(num * 1e8) / 1e8;
}

function addToHistory(resultVal, expression) {
  const li = document.createElement("li");
  li.textContent = expression.replace(/\\/g, '^') + " = " + resultVal;
  historyList.prepend(li);
}

// Light/Dark mode toggle
themeToggle.addEventListener("change", function () {
  document.body.classList.toggle("light", !themeToggle.checked);
});