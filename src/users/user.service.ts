import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/user.entity';
import { UpdateUserDto } from '@/users/dtos/user.dto';
import { Cron } from '@nestjs/schedule';
import { isNumber, IsNumber } from 'class-validator';


@Injectable()
export class UserService {

  private queue: Record<string, number> = {}

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async topup(user: UpdateUserDto) {
    const found = this.queue[user.userId]

    if(!found){
      this.queue[user.userId] = user.amount
    } else {
      this.queue[user.userId] += user.amount
    }

    return {
      status: 'success',
      userId: user.userId,
      balance: this.queue[user.userId],
    };

  }

  async withdraw(user: UpdateUserDto) {
    const found = this.queue[user.userId]

    if(!found && !isNumber(found)) {
      return {
        status: 'error',
        message: 'No user with given id',
      };
    }

    if(found < user.amount) {
      return {
        status: 'error',
        message: 'Insufficient balance',
      };
    }

    this.queue[user.userId] -= user.amount

    return {
      status: 'success',
      userId: user.userId,
      balance: this.queue[user.userId],
    };
  }

  @Cron('*/1 * * * *') // Every minute
  async processQueue() {
    await this.userRepository.manager.transaction(async (entityManager: EntityManager) => {
      for (const [userId, balance] of Object.entries(this.queue)) {
        await entityManager
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({ userId, balance })
          .orUpdate(['balance'], ['userId'])
          .execute();
      }
    });
    this.queue = {};

    
  }
}
