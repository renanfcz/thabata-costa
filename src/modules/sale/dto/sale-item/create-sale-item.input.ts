import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateSaleItemInput {
  @Field(() => String)
  id: string

  @Field(() => Number)
  value: number

  @Field(() => Number)
  discount: number

  @Field(() => String)
  procedureId: string
}
