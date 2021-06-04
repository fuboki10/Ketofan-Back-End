import bcrypt from 'bcryptjs';
/**
 * Hash Password
 *
 * @function
 * @public
 * @author Abdelrahman Tarek
 * @param {String} Password Password to be hashed
 * @summary Hash Password
 * @returns {String} `hashedPassword`
 */
export default async (password : string) : Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};
