import bcrypt from 'bcryptjs';
import { authService } from '../../src/services';

describe('AuthService', () => {
  describe('hashPassword', () => {
    it('should change the password', async () => {
      const password = 'password';
      const hashedPassword = await authService.hashPassword(password);
      expect(hashedPassword).not.toStrictEqual(password);
    });

    it('compare old password and hashed password should be true', async () => {
      const password = 'password';
      const hashed = await authService.hashPassword(password);
      const result = await bcrypt.compare(password, hashed);
      expect(result).toBeTruthy();
    });
  });
});
