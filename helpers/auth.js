import { hash } from "bcryptjs";

const hashPassword = async (password) => {
  const hashedPassword = hash(password, 12);

  return hashedPassword;
};

export { hashPassword };
