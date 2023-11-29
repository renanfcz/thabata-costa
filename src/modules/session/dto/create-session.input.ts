import { InputType, Field } from '@nestjs/graphql'
@InputType()
export class CreateSessionInput {
  @Field(() => Date)
  initDate: Date

  @Field(() => Date)
  finalDate: Date

  @Field(() => String)
  obs?: string

  @Field(() => String)
  clientId: string

  @Field(() => String)
  procedureId: string
}
