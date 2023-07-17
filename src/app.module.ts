import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ClientModule } from './modules/client/client.module'
import { ProcedureModule } from './modules/procedure/procedure.module'
import { SessionModule } from './modules/session/session.module'
import { SaleModule } from './modules/sale/sale.module'

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
  ],
})
export class AppModule {}
