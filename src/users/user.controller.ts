import { UpdateUserDto } from '@/users/dtos/user.dto';
import { UserService } from '@/users/user.service';
import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('UserController')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post('topup')
  async topup(@Body() body: UpdateUserDto) {
    return this.userService.topup(body);
  }

  @Post('withdraw')
  async withdraw(@Body() body:UpdateUserDto) {
    return this.userService.withdraw(body);
  }
}
