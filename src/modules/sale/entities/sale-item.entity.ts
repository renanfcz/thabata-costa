import { ObjectType, Field } from '@nestjs/graphql'
import { Procedure } from 'src/modules/procedure/entities/procedure.entity'
import { Session } from 'src/modules/session/entities/session.entity'
import { Protocol } from './protocol.entity'

@ObjectType()
export class SaleItem {
  @Field(() => String)
  id: string

  @Field(() => Number)
  value: number

  @Field(() => Number)
  discount: number

  @Field(() => Procedure)
  procedure?: Procedure

  @Field(() => [Session])
  sessions?: Session[]

  @Field(() => Number)
  sessionsNum: number

  @Field(() => Protocol)
  protocol?: Protocol
}
