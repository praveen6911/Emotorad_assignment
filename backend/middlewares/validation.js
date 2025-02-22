const { body, validationResult } = require("express-validator");

exports.validateProfile = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("name").notEmpty().withMessage("Name is required"),
  body("phone").matches(/^\d{10}$/).withMessage("Phone number must be 10 digits"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];
