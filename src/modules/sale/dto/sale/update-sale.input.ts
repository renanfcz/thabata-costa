import { CreateSaleInput } from './create-sale.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { CreateSaleItemInput } from '../sale-item/create-sale-item.input'

@InputType()
export class UpdateSaleInput extends PartialType(CreateSaleInput) {
  @Field(() => String)
  id: string

  @Field(() => Number)
  discount: number

  @Field(() => [CreateSaleItemInput])
  saleItems: CreateSaleItemInput[]
}
