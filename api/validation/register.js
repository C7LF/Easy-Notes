const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};
    
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Please enter a name";
    }
    
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Please enter an email address";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Please enter a valid email address";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "A password is required, obviously";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Please confirm your password";
    }
    if (!Validator.isLength(data.password, { min: 5, max: 30 })) {
        errors.password = "Password must be at least 5 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
  };
};