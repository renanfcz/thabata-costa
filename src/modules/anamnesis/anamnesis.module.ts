import { Module } from '@nestjs/common'
import { AnamnesisService } from './anamnesis.service'
import { AnamnesisResolver } from './anamnesis.resolver'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  providers: [AnamnesisResolver, AnamnesisService, PrismaService],
})
export class AnamnesisModule {}
