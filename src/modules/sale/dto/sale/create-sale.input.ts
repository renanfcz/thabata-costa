import { CreateSaleItemInput } from './../sale-item/create-sale-item.input'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateSaleInput {
  @Field(() => Number)
  discount: number

  @Field(() => String)
  clientId: string

  @Field(() => [CreateSaleItemInput])
  saleItems: CreateSaleItemInput[]
}
