import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]*$/, "username must contain only charecters"),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
      "Minimum 5 characters, one letter, one number and one special character"
    ),
});

export const signupSchema = yup.object({
  username: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]*$/, "username must contain only charecters"),
  email: yup
    .string()
    .required()
    .matches(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      "please enter valid email"
    ),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
      "Minimum 5 characters, one letter, one number and one special character"
    ),
});
