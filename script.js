// Your script.js content

const selects = document.querySelectorAll(".Currency");
const input = document.getElementById("input");
const output = document.getElementById("output");
const errdisp = document.getElementById("errmsg");
const convertButton = document.getElementById("Button");

convertButton.addEventListener("click", getValue);

fetch("https://api.frankfurter.app/currencies")
  .then((result) => result.json())
  .then((res) => dropDown(res))
  .catch((err) => console.error("Error fetching currencies:", err));

function dropDown(res) {
  let curr2D = Object.entries(res);
  for (let i = 0; i < curr2D.length; i++) {
    let option = `<option value="${curr2D[i][0]}">${curr2D[i][0]}</option>`;
    selects[0].innerHTML += option;
    selects[1].innerHTML += option;
  }
}

function getValue() {
  let opt1 = selects[0].value;
  let opt2 = selects[1].value;
  let inputval = input.value.trim();

  errdisp.textContent = "";

  if (!inputval || isNaN(inputval)) {
    errdisp.textContent = "Please enter a valid number.";
    return;
  }

  if (opt1 === opt2) {
    errdisp.textContent = "*Select different currencies";
    return;
  }

  currencyConvert(opt1, opt2, inputval);
}

function currencyConvert(opt1, opt2, inputval) {
  const host = "api.frankfurter.app";

  fetch(`https://${host}/latest?amount=${inputval}&from=${opt1}&to=${opt2}`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      return resp.json();
    })
    .then((data) => {
      output.value = Object.values(data.rates)[0];
    })
    .catch((err) => {
      console.error("Error converting currency:", err);
      errdisp.textContent =
        "Error converting currency. Please try again later.";
    });
}
