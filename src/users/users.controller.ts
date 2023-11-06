import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../../../react/full_next-nest-cloud-storage/backend/src/auth/guards/jwt-auth.guard';
import { UserId } from '../../../../react/full_next-nest-cloud-storage/backend/src/auth/decorators/user-id.decorator';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getMe(@UserId() id: number) {
    const user = await this.usersService.findById(id);
    const { password, ...result } = user;
    return result;
  }
}
