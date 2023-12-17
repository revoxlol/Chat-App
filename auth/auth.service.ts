// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.userId };
    return this.jwtService.sign(payload); 
  }

  async register(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    
    const existingUser = await this.userService.findUserByUsername(username);
    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser(username, hashedPassword);

    const { password: _, ...result } = user;
    return result;
  }
}
