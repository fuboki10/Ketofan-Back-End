import bcrypt from 'bcryptjs';

const checkPassword = async (password : string, hashedPassword : string) : Promise<boolean> => {
  const isPasswordMatch : boolean = await bcrypt.compare(password, hashedPassword);
  return isPasswordMatch;
};

export default checkPassword;
