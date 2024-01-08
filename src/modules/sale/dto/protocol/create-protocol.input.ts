import { CreateSaleItemInput } from '../sale-item/create-sale-item.input'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateProtocolInput {
  @Field(() => String)
  protocolName: string

  @Field(() => String)
  protocolDesc: string

  @Field(() => String, { nullable: true })
  saleId: string

  @Field(() => [CreateSaleItemInput])
  saleItems: CreateSaleItemInput[]
}
