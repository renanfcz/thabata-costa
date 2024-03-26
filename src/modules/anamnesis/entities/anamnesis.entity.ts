import { Field, ObjectType } from '@nestjs/graphql'
import { Client } from 'src/modules/client/entities/client.entity'

@ObjectType()
export class Anamnesis {
  @Field(() => String)
  id: string

  @Field(() => String)
  protocolType: string

  @Field(() => Client)
  client: Client

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date, { nullable: true })
  signedIn?: Date

  @Field(() => String, { nullable: true })
  signature: string

  @Field(() => Date, { nullable: true })
  expriresIn?: Date

  @Field(() => String)
  data: string
}
