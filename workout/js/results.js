// Define UI variables
let newRowButton = document.querySelector("#new-row");
let resultsButton = document.querySelector("#results");
let resultsTable = document.querySelector(".results-table");

loadEventListeners();

// load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getResults);
  document.addEventListener("DOMContentLoaded", getDate);
  // add new row event
  newRowButton.addEventListener("click", addRow);
  // add results to local storage
  resultsButton.addEventListener("click", addResult);
  //add date to local storage
  resultsButton.addEventListener("click", addDate);
}

// get results from local storage
function getResults() {
  // want to loop through the local storage and apply the values to each td
  let results;
  if (localStorage.getItem("results") === null) {
    results = [];
  } else {
    results = JSON.parse(localStorage.getItem("results"));

    // loop through the results array taken from local storage
    for (let h = 0; h <= results.length; h++) {
      // counter variable for while loop
      let i = 0;
      let rows = [];

      // create tr element to hold tds for row values
      const tr = document.createElement("tr");
      resultsTable.appendChild(tr);

      // use while loop and shift() to repeatedly push the first three result values into empty rows array
      while (i < 3) {
        rows.push(results.shift());
        i++;
      }

      // create a td inside the above tr for every value in rows (so three tds per tr)
      for (let k = 0; k < rows.length; k++) {
        let td = document.createElement("td");
        td.innerText = rows[k];
        tr.appendChild(td);
      }

      // set counter variable back to 0 and empty rows array
      i = 0;
      rows = [];
    }
  }
}

// get date from local storage
function getDate() {
  let dates;
  if (localStorage.getItem("dates") === null) {
    dates = [];
  } else {
    dates = JSON.parse(localStorage.getItem("dates"));

    const liftDate = document.querySelector(".date");

    for (let i = 0; i < dates.length; i++) {
      liftDate.innerText = dates[i];
    }
  }
}

// add new row to spreadsheet
function addRow(e) {
  // create tr element
  const tr = document.createElement("tr");
  // add tr html
  tr.innerHTML =
    "<td><input class='result-input' type='text'></td><td><input class='result-input' type='text'></td><td><input class='result-input' type='text'></td>";
  // append tr to tbody parent
  resultsTable.appendChild(tr);

  e.preventDefault();
}

// Add results to local storage
function addResult(e) {
  // create variable for input values
  const inputs = document.querySelectorAll('.result-input');
  // store in local storage
  for (let i = 0; i < inputs.length; i++) {
    storeResultInLocalStorage(inputs[i].value);
  }

  e.preventDefault();
}

// store results from workout in local storage
function storeResultInLocalStorage(result) {
  let results;
  if (localStorage.getItem("results") === null) {
    results = [];
  } else {
    results = JSON.parse(localStorage.getItem("results"));
  }

  results.push(result);

  localStorage.setItem("results", JSON.stringify(results));
}

// add date and put it in local storage
function addDate(e) {
  // create variable for date value
  const liftDate = document.querySelector("input[type='date']");
  saveDateInLocalStorage(liftDate.value);

  e.preventDefault();
}

// save the date of the workout in local storage
function saveDateInLocalStorage(date) {
  let dates;
  if (localStorage.getItem("dates") === null) {
    dates = [];
  } else {
    dates = JSON.parse(localStorage.getitem("dates"));
  }

  dates.push(date);

  localStorage.setItem("dates", JSON.stringify(dates));
}
