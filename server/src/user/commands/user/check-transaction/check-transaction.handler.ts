import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CheckTransactionCommand } from './check-transaction.command';
import { BadRequestException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserTransactionEntity } from 'src/user/entities/transaction.entity';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UserEntity } from 'src/user/entities';
import { OkResponse } from 'libs/models/responses';

@CommandHandler(CheckTransactionCommand)
export class CheckTransactionCommandHandler
  implements ICommandHandler<CheckTransactionCommand>
{
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    readonly transactionRepository: Repository<UserTransactionEntity>,
    @Inject('UserEntity_REPOSITORY')
    readonly userRepository: Repository<UserEntity>,
    readonly httpService: HttpService,
  ) {}
  async execute(command: CheckTransactionCommand): Promise<any> {
    const existedUser = await this.userRepository.findOne({
      where: { id: command.user_id },
    });

    if (!existedUser) {
      throw new BadRequestException('User does not exist');
    }

    const response = await firstValueFrom(
      this.httpService.post(
        'https://momosv3.apimienphi.com/api/getTransHistory',
        {
          access_token: command.dto.access_token,
          phone: '0335886430',
          limit: 10,
          offset: 0,
        },
      ),
    );

    const transactions = response.data.data.filter((transaction) =>
      transaction.partnerId === existedUser.phoneNumber &&
      command.dto.transaction_type == 'SILVER'
        ? transaction.amount === '100'
        : transaction.amount === '200',
    );

    let newTransaction = null;
    for (let i = 0; i < transactions.length; i++) {
      const existedTrans = await this.transactionRepository.findOne({
        where: { transaction_id: transactions[i].id },
      });

      if (!existedTrans) {
        newTransaction = transactions[i];
      }
    }

    if (newTransaction === null) {
      throw new BadRequestException('Transaction does not found');
    }

    const newTrans = this.transactionRepository.create({
      user_id: existedUser.id,
      transaction_id: newTransaction.id,
      transaction_date: newTransaction.clientTime,
      transaction_amount: parseInt(newTransaction.amount),
      transaction_status: 'SUCCESS',
      transaction_type: command.dto.transaction_type,
    });

    existedUser.userRank = command.dto.transaction_type;
    existedUser.isPromoted = true;
    existedUser.promotedExpiredAt = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1),
    );

    await newTrans.save();
    await existedUser.save();

    return new OkResponse(existedUser);
  }
}
