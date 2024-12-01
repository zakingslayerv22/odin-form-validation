import "./index.css";

class ValidateForm {
  constructor() {
    this.form = document.querySelector("form");
    this.countrySelectField = document.querySelector("#country");
    this.zipcodeInputField = document.querySelector("#zipcode");

    // For each country, defines the pattern that the postal code has to follow
    this.constraints = {
      ch: [
        "^(CH-)?\\d{4}$",
        "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
      ],
      fr: [
        "^(F-)?\\d{5}$",
        "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
      ],
      de: [
        "^(D-)?\\d{5}$",
        "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
      ],
      nl: [
        "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
      ],
    };

    this.currentConstraint = new RegExp(
      this.constraints[this.countrySelectField.value][0],
    );

    if (this.form) this.initialize();
  }

  initialize() {
    this.validateEmail();
  }

  validateEmail() {
    const emailInput = document.querySelector("#email");

    const emailRegExp = /^[a-zA-Z0-9]{4}@thecompany\.com$/;

    emailInput.addEventListener("focusout", () => {
      const isEmpty = emailInput.value.length === 0;
      const isValid = emailRegExp.test(emailInput.value);

      if (isEmpty) {
        emailInput.setCustomValidity("Email field cannot be empty");
      } else if (!isValid) {
        emailInput.setCustomValidity(
          "Email must have 4 letters/numbers before @thecompany.com",
        );
      } else {
        emailInput.setCustomValidity("");
      }

      emailInput.reportValidity();
    });
  }

  validateCountryAndZipCondition() {
    const matchesPattern = this.currentConstraint.test(
      this.zipcodeInputField.value,
    );

    if (matchesPattern) {
      this.zipcodeInputField.setCustomValidity("");
    } else {
      this.zipcodeInputField.setCustomValidity(
        `${this.constraints[this.countrySelectField.value][1]}`,
      );
    }

    return matchesPattern;
  }
}

new ValidateForm();
