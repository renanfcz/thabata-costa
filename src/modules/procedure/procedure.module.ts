import { PrismaService } from './../../database/prisma.service'
import { Module } from '@nestjs/common'
import { ProcedureService } from './procedure.service'
import { ProcedureResolver } from './procedure.resolver'

@Module({
  controllers: [],
  providers: [ProcedureResolver, ProcedureService, PrismaService],
})
export class ProcedureModule {}
