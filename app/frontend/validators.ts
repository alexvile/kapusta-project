export const validateEmailFE = (email: string): string | undefined => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.length || !validRegex.test(email)) {
    return "Please enter a valid email address";
  }
  // if (!email.length) return `Please enter a value`;
};

export const validatePasswordFE = (password: string): string | undefined => {
  if (password.length < 5) {
    return "Please enter a password that is at least 5 characters long";
  }
};

export const validateNameFE = (name: string): string | undefined => {
  if (!name.length) return `Please enter a value`;
};
