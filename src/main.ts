import { hideZeroError, showZeroError } from "./handleZeroError";

let bill: number = 0;
let people: number = 0;
let tipPercent: number = 0;

let tipPerPerson: number = 0;
let totalPerPerson: number = 0;
let totalAmount: number = 0;

const billInput = document.querySelector(".bill__input") as HTMLInputElement;
const peopleInput = document.querySelector(
  ".people__input"
) as HTMLInputElement;

const tipButtons = document.querySelectorAll(
  ".tip__percent"
) as NodeListOf<HTMLInputElement>;

const tipCustomInput = document.querySelector(
  ".tip__custom"
) as HTMLInputElement;

const tipPerEl = document.querySelector(
  ".calculation__tipPer .calculation__price"
) as HTMLElement;
const totalPerEl = document.querySelector(
  ".calculation__totalPer .calculation__price"
) as HTMLElement;
const totalAmountEl = document.querySelector(
  ".calculation__total .calculation__price"
) as HTMLElement;

function calculate() {
  // Show error if either bill or people is zero
  if (!bill) return showZeroError(billInput);
  else hideZeroError(billInput);
  if (!people) return showZeroError(peopleInput);
  else hideZeroError(peopleInput);

  // Calculate the tip per person and total per person
  const totalPerPersonBeforeTip = bill / people;
  tipPerPerson = totalPerPersonBeforeTip * (tipPercent / 100);
  totalPerPerson = totalPerPersonBeforeTip + tipPerPerson;
  totalAmount = totalPerPerson * people;
  renderCalculation();
}

function renderCalculation() {
  tipPerEl.innerHTML = `$${tipPerPerson.toFixed(2)}`;
  totalPerEl.innerHTML = `$${totalPerPerson.toFixed(2)}`;
  totalAmountEl.innerHTML = `$${totalAmount.toFixed(2)}`;
}

[billInput, peopleInput].forEach((input, index) => {
  input.addEventListener("input", (e: Event) => {
    let val = (e.currentTarget as HTMLInputElement).value;
    if (index === 0) bill = parseFloat(val);
    else people = parseInt(val);
    calculate();
  });
});

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
  totalAmount = 0;

  clearTips();
  clearCustomTip();

  billInput.value = "";
  peopleInput.value = "";
  tipPerEl.innerHTML = "$0.00";
  totalPerEl.innerHTML = "$0.00";
  totalAmountEl.innerHTML = "$0.00";
});
