import bcrypt from 'bcryptjs';
import hashPassword from '../../src/services/helpers/hashPassword';

describe('hashPassword', () => {
  it('should change the password', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).not.toStrictEqual(password);
  });

  it('compare old password and hashed password should be true', async () => {
    const password = 'password';
    const hashed = await hashPassword(password);
    const result = await bcrypt.compare(password, hashed);
    expect(result).toBeTruthy();
  });
});
