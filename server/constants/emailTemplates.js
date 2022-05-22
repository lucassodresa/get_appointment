const generateEmailCompanySignUp = (name) => {
  const subject = `Request sign up validation in progress`;
  const message = `Hi ${name}, we are validating your sign up and you will receive a email alert when we finish it`;
  return { message, subject };
};
const generateEmailCompanySignUpAlertToAdmin = (name) => {
  const subject = `New Sign up request`;
  const message = `We received a new sign up request from company: ${name}`;
  return { message, subject };
};

module.exports = {
  generateEmailCompanySignUp,
  generateEmailCompanySignUpAlertToAdmin
};
