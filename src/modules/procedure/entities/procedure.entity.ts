import { ObjectType, Field } from '@nestjs/graphql'
import { Session } from 'src/modules/session/entities/session.entity'

@ObjectType()
export class Procedure {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => Number)
  price: number

  @Field(() => Number)
  sessionsNum: number

  @Field(() => [Session])
  sessions: Session[]
}
