const bcrypt = require("bcrypt");
async function hashPW(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePW(password, hashedPassword) {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
}
module.exports = { hashPW, comparePW };
