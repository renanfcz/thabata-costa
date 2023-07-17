import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateSessionInput {
  @Field(() => Date)
  appointment: Date

  @Field(() => String)
  saleItemId: string
}
