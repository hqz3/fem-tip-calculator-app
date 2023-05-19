export function showZeroError(inputEl: HTMLInputElement) {
  const zeroErrorEl = inputEl
    .closest("div")
    ?.parentNode?.querySelector(".zero") as HTMLElement;

  inputEl.classList.add("error");
  zeroErrorEl.classList.add("show");
}

export function hideZeroError(inputEl: HTMLInputElement) {
  const zeroErrorEl = inputEl
    .closest("div")
    ?.parentNode?.querySelector(".zero") as HTMLElement;

  inputEl.classList.remove("error");
  zeroErrorEl.classList.remove("show");
}
