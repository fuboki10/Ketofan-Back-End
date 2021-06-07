import bcrypt from 'bcryptjs';

/**
 * Check if password is correct
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {String} password
 * @param {String} hashedPassword
 * @summary Check if password is correct
 * @returns {Boolean} `isPasswordMatch` is `true` the password is correct
 */
const checkPassword = async (password : string, hashedPassword : string) : Promise<boolean> => {
  const isPasswordMatch : boolean = await bcrypt.compare(password, hashedPassword);
  return isPasswordMatch;
};

export default checkPassword;
