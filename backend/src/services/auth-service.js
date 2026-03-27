import { UserRepository } from '../repositories/user-repository.js';
import { comparePassword, hashPassword, signToken } from '../utils/security.js';

const userRepository = new UserRepository();

export class AuthService {
  async login(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw { statusCode: 401, message: 'Credenciales inválidas' };
    }

    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      throw { statusCode: 401, message: 'Credenciales inválidas' };
    }

    const token = signToken({ id: user.id, role: user.role, email: user.email });
    return {
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role
      }
    };
  }

  async register(payload) {
    const existingUser = await userRepository.findByEmail(payload.email);
    if (existingUser) {
      throw { statusCode: 409, message: 'El correo ya está registrado' };
    }

    const passwordHash = await hashPassword(payload.password);

    const newUser = await userRepository.create({
      full_name: payload.fullName,
      email: payload.email,
      password_hash: passwordHash,
      role: payload.role
    });

    return {
      id: newUser.id,
      fullName: newUser.full_name,
      email: newUser.email,
      role: newUser.role
    };
  }
}
