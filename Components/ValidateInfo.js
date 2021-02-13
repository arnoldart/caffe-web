export default function ValidateInfo(fields) {
  let errors = {}

  if (!fields.username) {
    errors.username = 'Username required';
  }

  if(!fields.email) {
    errors.email = "Email required"
  } else if(!/\S+@\S+\.\S+/.test(fields.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!fields.password) {
    errors.password = 'Password is required';
  } else if (fields.password.length < 3) {
    errors.password = 'Password needs to be 6 characters or more';
  }

  return errors
}