import { Request, Post, UseGuards, Controller, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../../../../learning-dashboard/backend/src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
