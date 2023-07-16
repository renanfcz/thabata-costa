import { Module } from '@nestjs/common'
import { SessionService } from './session.service'
import { SessionResolver } from './session.resolver'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  controllers: [],
  providers: [SessionResolver, SessionService, PrismaService],
})
export class SessionModule {}
