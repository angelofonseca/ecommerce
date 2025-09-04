export const validateEmail = (email: string) => {
  const validRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return validRegex.test(email);
};
