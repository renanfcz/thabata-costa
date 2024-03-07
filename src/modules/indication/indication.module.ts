import { PrismaService } from 'src/database/prisma.service'
import { Module } from '@nestjs/common'
import { IndicationService } from './indication.service'
import { IndicationResolver } from './indication.resolver'

@Module({
  controllers: [],
  providers: [IndicationResolver, IndicationService, PrismaService],
})
export class IndicationModule {}
