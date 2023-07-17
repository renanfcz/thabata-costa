import { Module } from '@nestjs/common'
import { SaleService } from './sale.service'
import { SaleResolver } from './sale.resolver'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  providers: [SaleResolver, SaleService, PrismaService],
})
export class SaleModule {}
