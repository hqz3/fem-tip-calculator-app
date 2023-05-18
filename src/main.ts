let bill: number = 0;
let people: number = 0;
let tipPercent: number = 0;

let tipPerPerson: number = 0;
let totalPerPerson: number = 0;

const billInput = document.querySelector(".bill__input") as HTMLInputElement;

const tipButtons = document.querySelectorAll(
  ".tip__percent"
) as NodeListOf<HTMLInputElement>;

const tipCustomInput = document.querySelector(
  ".tip__custom"
) as HTMLInputElement;

const peopleInput = document.querySelector(
  ".people__input"
) as HTMLInputElement;

const tipCalculationPriceEl = document.querySelector(
  ".calculation__tip .calculation__price"
) as HTMLElement;
const totalCalculationPriceEl = document.querySelector(
  ".calculation__total .calculation__price"
) as HTMLElement;

const billZeroErrorEl = billInput
  .closest("label")
  ?.querySelector(".zero") as HTMLElement;

const peopleZeroErrorEl = peopleInput
  .closest("label")
  ?.querySelector(".zero") as HTMLElement;

function calculate() {
  // Show error if either bill or people is zero
  if (!bill) {
    billInput.classList.add("error");
    billZeroErrorEl.classList.add("show");
    return;
  } else {
    billInput.classList.remove("error");
    billZeroErrorEl.classList.remove("show");
  }
  if (!people) {
    peopleInput.classList.add("error");
    peopleZeroErrorEl.classList.add("show");
    return;
  } else {
    peopleInput.classList.remove("error");
    peopleZeroErrorEl.classList.remove("show");
  }

  // Calculate the tip per person and total per person
  const totalPerPersonBeforeTip = bill / people;
  tipPerPerson = totalPerPersonBeforeTip * (tipPercent / 100);
  totalPerPerson = totalPerPersonBeforeTip + tipPerPerson;
  renderCalculation();
}

function renderCalculation() {
  tipCalculationPriceEl.innerHTML = `$${tipPerPerson.toFixed(2)}`;
  totalCalculationPriceEl.innerHTML = `$${totalPerPerson.toFixed(2)}`;
}

function clearTips() {
  tipButtons.forEach((button) => button.classList.remove("active"));
}

function clearCustomTip() {
  tipCustomInput.value = "";
}

tipButtons.forEach((button) => {
  button.addEventListener("click", (e: Event) => {
    clearTips();
    clearCustomTip();
    tipPercent = parseInt((e.currentTarget as HTMLInputElement).value);
    button.classList.add("active");
    calculate();
  });
});

tipCustomInput?.addEventListener("input", (e: Event) => {
  clearTips();
  tipPercent = parseFloat((e.currentTarget as HTMLInputElement).value) || 0;
  calculate();
});

[billInput, peopleInput].forEach((input, index) => {
  input.addEventListener("input", (e: Event) => {
    let val = (e.currentTarget as HTMLInputElement).value;
    if (index === 0) bill = parseFloat(val);
    else people = parseInt(val);
    calculate();
  });
});

// Reset
const resetButton = document.querySelector(
  ".calculation__reset"
) as HTMLButtonElement;

resetButton?.addEventListener("click", () => {
  bill = 0;
  people = 0;
  tipPercent = 0;
  tipPerPerson = 0;
  totalPerPerson = 0;

  clearTips();
  clearCustomTip();

  billInput.value = "";
  peopleInput.value = "";
  tipCalculationPriceEl.innerHTML = "$0.00";
  totalCalculationPriceEl.innerHTML = "$0.00";
});
