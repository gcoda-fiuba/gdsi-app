const passwordSecurity = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@!#$%&()¿?¡!*+_|¬°]{8,}$/;
  return passwordRegex.test(password);
};

export default passwordSecurity;
