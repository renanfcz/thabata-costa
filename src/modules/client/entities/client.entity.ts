import { ObjectType, Field } from '@nestjs/graphql'
import { Session } from 'src/modules/session/entities/session.entity'

@ObjectType()
export class Client {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  telephone: string

  @Field(() => String)
  address: string

  @Field(() => Date)
  created_at: Date

  @Field(() => [Session])
  sessions: Session[]
}
