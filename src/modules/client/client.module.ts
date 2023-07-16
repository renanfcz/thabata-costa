import { PrismaService } from './../../database/prisma.service'
import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { ClientResolver } from './client.resolver'

@Module({
  controllers: [],
  providers: [ClientResolver, ClientService, PrismaService],
})
export class ClientModule {}
