import { ObjectType, Field } from '@nestjs/graphql'
import { Client } from 'src/modules/client/entities/client.entity'
import { Procedure } from 'src/modules/procedure/entities/procedure.entity'

@ObjectType()
export class Session {
  @Field(() => String)
  id: string

  @Field(() => Date)
  appointment: Date

  @Field(() => Procedure)
  procedure: Procedure

  @Field(() => Client)
  client: Client
}
