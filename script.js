import {
  handleFullNameError,
  handleAddressError,
  handlePhoneError,
  hearAboutUsHandle,
  emailHandle,
} from "./utils.js"; // Error handling functions. Probably should've been written easier or not as separate functions, but why not?
//may be written using a single function with parameters, but I wanted to keep it simple
// and readable, so I wrote them separately.

document.addEventListener("DOMContentLoaded", function () {
  const select = document.querySelector("select[required]");
  const otherDiv = document.querySelector(".flex.other");
  const form = document.querySelector("form");
  if (select && otherDiv) {
    select.addEventListener("change", function () {
      if (select.value === "Other(Please Specify...)") {
        otherDiv.style.display = "flex";
      } else {
        otherDiv.style.display = "none";
      }
    });
    otherDiv.style.display =
      select.value === "Other(Please Specify...)" ? "flex" : "none";
  }

  form.addEventListener("submit", function (e) {
    let hasError = false;
    let firstInvalid = null;
    //Checking whether or not Full Name has errors
    if (
      handleFullNameError(form, (el) => {
        if (!firstInvalid) firstInvalid = el;
      })
    )
      hasError = true;
    //Checking whether or not Address has errors
    if (
      handleAddressError(form, (el) => {
        if (!firstInvalid) firstInvalid = el;
      })
    )
      hasError = true;
    //Checking whether or not Phone has errors
    if (
      handlePhoneError(form, (el) => {
        if (!firstInvalid) firstInvalid = el;
      })
    )
      hasError = true;
    //Checking whether or not Hear About Us has errors
    if (
      hearAboutUsHandle(form, (el) => {
        if (!firstInvalid) firstInvalid = el;
      })
    )
      hasError = true;

    if (
      emailHandle(form, (el) => {
        if (!firstInvalid) firstInvalid = el;
      })
    )
      hasError = true;
    if (hasError) {
      e.preventDefault();
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });
});
