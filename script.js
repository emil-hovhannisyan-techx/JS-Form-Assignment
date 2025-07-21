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
    //Checking email inputs
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
    } else {
      e.preventDefault();
      // Collect form data
      const formData = {};
      formData.firstName = form.querySelector("#firstName").value.trim();
      formData.lastName = form.querySelector("#lastName").value.trim();
      formData.streetAddress = form
        .querySelector("#streetAddress")
        .value.trim();
      formData.streetAddress2 = form
        .querySelector("#streetAddress2")
        .value.trim();
      formData.city = form.querySelector("#city").value.trim();
      formData.state = form.querySelector("#state").value.trim();
      formData.postalCode = form.querySelector("#postalCode").value.trim();
      formData.phone = form.querySelector(".phone-input").value.trim();
      formData.email = form.querySelector('input[type="email"]').value.trim();
      formData.hearAboutUs = form.querySelector("select[required]").value;
      formData.hearAboutUsOther = form
        .querySelector("#hearAboutUsOther")
        .value.trim();
      formData.feedback = form.querySelectorAll("textarea")[0].value.trim();
      formData.suggestions = form.querySelectorAll("textarea")[1].value.trim();
      // Checkbox values
      const recommendCheckboxes = form.querySelectorAll(
        '.checkboxes input[type="checkbox"]'
      );
      formData.recommend = Array.from(recommendCheckboxes)
        .map((cb, i) =>
          cb.checked ? cb.parentElement.textContent.trim() : null
        )
        .filter(Boolean);
      // Table data
      formData.references = [];
      const tableRows = form.querySelectorAll("table tbody tr");
      tableRows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        formData.references.push({
          fullName: cells[1].querySelector("input").value.trim(),
          address: cells[2].querySelector("input").value.trim(),
          contactNumber: cells[3].querySelector("input").value.trim(),
        });
      });
      console.log("Form Data:", formData);
      // Reset the form
      form.reset();
      // Hide 'Other' input if shown
      const otherDiv = document.querySelector(".flex.other");
      if (otherDiv) {
        otherDiv.style.display = "none";
      }
      // Show success modal
      showSuccessModal();
    }
  });
});
// Success modal logic
function showSuccessModal() {
  let modal = document.getElementById("success-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "success-modal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.5)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "9999";
    modal.innerHTML = ` 
      <div class="success-modal-content">
        <svg class="success-modal-check" width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="38" stroke="#18bd5b" stroke-width="4" fill="none" />
          <polyline points="24,42 36,54 56,30" style="fill:none;stroke:#18bd5b;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;" />
        </svg>
        <div class="success-modal-title">Thank You!</div>
        <div class="success-modal-message">Your submission has been received.</div>
      </div>
    `; //didn't find easier way to do this!
    document.body.appendChild(modal);
    setTimeout(() => {
      modal.remove();
    }, 2000);
  }
}
