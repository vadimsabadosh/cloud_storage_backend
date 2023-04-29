import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ default: 'john' })
  firstName: string;

  @ApiProperty({ default: 'Doe' })
  lastName: string;

  @ApiProperty({ default: '12313123' })
  password: string;
}
