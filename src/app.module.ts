import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

import { AuthModule } from './modules/auth/auth.module'
import { ClientModule } from './modules/client/client.module'
import { IndicationModule } from './modules/indication/indication.module'
import { ProcedureModule } from './modules/procedure/procedure.module'
import { SaleModule } from './modules/sale/sale.module'
import { SessionModule } from './modules/session/session.module'
import { AnamnesisModule } from './modules/anamnesis/anamnesis.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    SessionModule,
    ClientModule,
    ProcedureModule,
    SaleModule,
    IndicationModule,
    AuthModule,
    AnamnesisModule,
  ],
})
export class AppModule {}
