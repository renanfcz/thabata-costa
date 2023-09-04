import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateSaleItemInput {
  @Field(() => Number)
  value: number

  @Field(() => Number)
  discount: number

  @Field(() => String)
  procedureId: string
}
