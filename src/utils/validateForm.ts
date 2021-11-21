interface FormValues {
  name: string;
  password: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  password?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const validate = (values: FormValues) => {
  let errors: FormErrors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const { name, password, email, subject, message } = values;
  if (!name) {
    errors.name = "Name cannot be blank";
  } else if (name.length < 4 || name.length > 20) {
    errors.name = "Name must be between 4-20 characters";
  }
  if (!email) {
    errors.email = "Email cannot be blank";
  } else if (!regex.test(email)) {
    errors.email = "Invalid email format";
  }
  if (!password) {
    errors.password = "Password cannot be blank";
  } else if (password.length < 4 || password.length > 24) {
    errors.password = "Password must be between 4-24 characters";
  }
  if (!subject) {
    errors.subject = "Subject cannot be blank";
  } else if (subject.length < 4 || subject.length > 24) {
    errors.subject = "Subject must be between 6-40 characters";
  }
  if (!message) {
    errors.message = "Message cannot be blank";
  } else if (message.length < 6 || message.length > 150) {
    errors.message = "Message must be between 6-150 characters";
  }

  return errors;
};
