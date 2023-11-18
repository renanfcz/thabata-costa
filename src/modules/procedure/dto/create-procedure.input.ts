import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateProcedureInput {
  @Field(() => String)
  name: string

  @Field(() => Number)
  price: number

  @Field(() => String)
  color: string
}
