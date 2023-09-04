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
  saleItemId: string
}
