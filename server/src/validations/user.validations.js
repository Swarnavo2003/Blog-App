import { body } from "express-validator";

export const userRegistrationValidator = () => {
  return [
    body("firstname")
      .trim()
      .notEmpty()
      .withMessage("First Name is required")
      .isLength({ min: 3 })
      .withMessage("First Name must be atleast 3 characters long")
      .isLength({ max: 20 })
      .withMessage("First Name must be atmost 15 characters long"),
    body("lastname")
      .trim()
      .notEmpty()
      .withMessage("Last Name is required")
      .isLength({ min: 3 })
      .withMessage("Last Name must be atleast 3 characters long")
      .isLength({ max: 20 })
      .withMessage("Last Name must be atmost 15 characters long"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be atleast 3 characters long")
      .isLength({ max: 20 })
      .withMessage("Username must be atmost 15 characters long"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 3 characters long")
      .isLength({ max: 15 })
      .withMessage("Password must be atmost 15 characters long")
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).+$/)
      .withMessage(
        "Password must contain atleast one uppercase letter and a special character",
      ),
  ];
};

export const userLoginValidator = () => {
  return [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be atleast 3 characters long")
      .isLength({ max: 20 })
      .withMessage("Username must be atmost 15 characters long"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 3 characters long")
      .isLength({ max: 15 })
      .withMessage("Password must be atmost 15 characters long")
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).+$/)
      .withMessage(
        "Password must contain atleast one uppercase letter and a special character",
      ),
  ];
};

export const userUpdateValidator = () => {
  return [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be atleast 3 characters long")
      .isLength({ max: 20 })
      .withMessage("Username must be atmost 15 characters long")
      .optional(),
    body("bio")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Username must be atleast 5 characters long")
      .isLength({ max: 200 })
      .withMessage("Username must be atmost 200 characters long")
      .optional(),
    body("twitter")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Username must be atleast 5 characters long")
      .isLength({ max: 200 })
      .withMessage("Username must be atmost 200 characters long")
      .optional(),
    body("github")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Username must be atleast 5 characters long")
      .isLength({ max: 200 })
      .withMessage("Username must be atmost 200 characters long")
      .optional(),
    body("website")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Username must be atleast 5 characters long")
      .isLength({ max: 200 })
      .withMessage("Username must be atmost 200 characters long")
      .optional(),
  ];
};
