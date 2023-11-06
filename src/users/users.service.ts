import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOneBy({ email });
  }
  async findById(id: number): Promise<UserEntity> {
    return this.repository.findOneBy({ id });
  }
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.repository.save(createUserDto);
  }
}
