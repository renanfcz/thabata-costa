import { ObjectType, Field } from '@nestjs/graphql'
import { Procedure } from 'src/modules/procedure/entities/procedure.entity'
import { Session } from 'src/modules/session/entities/session.entity'
import { Sale } from './sale.entity'

@ObjectType()
export class SaleItem {
  @Field(() => String)
  id: string

  @Field(() => Number)
  value: number

  @Field(() => Number)
  discount: number

  @Field(() => Procedure)
  procedure: Procedure

  @Field(() => Sale)
  sale: Sale

  @Field(() => [Sale])
  sessions: Session[]
}
