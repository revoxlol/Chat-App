// src/auth/user.controller.ts
import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';


@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<void> {
    try {
      const token = await this.authService.login(loginUserDto);
      
      res.setHeader('Content-Type', 'application/json');
      
      res.status(200).json({ access_token: token });
    } catch (error) {
      
      console.error('Authentication failed');

      res.status(401).json({ error: 'Authentication failed' });
    }
  }
}
