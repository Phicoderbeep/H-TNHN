import { registerSchema, loginSchema } from '../src/utils/validation';

describe('Validation Schemas', () => {
  describe('registerSchema', () => {
    it('should validate correct input', () => {
      const valid = {
        name: 'Nguyễn Văn A',
        email: 'test@example.com',
        password: 'password123',
        role: 'STUDENT',
      };
      expect(registerSchema.parse(valid)).toEqual(valid);
    });

    it('should reject short name', () => {
      const input = {
        name: 'A',
        email: 'test@example.com',
        password: 'password123',
        role: 'STUDENT',
      };
      expect(() => registerSchema.parse(input)).toThrow();
    });

    it('should reject invalid email', () => {
      const input = {
        name: 'Nguyễn Văn A',
        email: 'invalid-email',
        password: 'password123',
        role: 'STUDENT',
      };
      expect(() => registerSchema.parse(input)).toThrow();
    });

    it('should reject short password', () => {
      const input = {
        name: 'Nguyễn Văn A',
        email: 'test@example.com',
        password: '12345',
        role: 'STUDENT',
      };
      expect(() => registerSchema.parse(input)).toThrow();
    });

    it('should reject invalid role', () => {
      const input = {
        name: 'Nguyễn Văn A',
        email: 'test@example.com',
        password: 'password123',
        role: 'ADMIN',
      };
      expect(() => registerSchema.parse(input)).toThrow();
    });
  });

  describe('loginSchema', () => {
    it('should validate correct input', () => {
      const valid = {
        email: 'test@example.com',
        password: 'password123',
      };
      expect(loginSchema.parse(valid)).toEqual(valid);
    });

    it('should reject empty password', () => {
      const input = {
        email: 'test@example.com',
        password: '',
      };
      expect(() => loginSchema.parse(input)).toThrow();
    });

    it('should reject invalid email', () => {
      const input = {
        email: 'not-an-email',
        password: 'password123',
      };
      expect(() => loginSchema.parse(input)).toThrow();
    });
  });
});
