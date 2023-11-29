import { CreateSaleItemInput } from './../sale-item/create-sale-item.input'
import { InputType, Field } from '@nestjs/graphql'
import { PaymentType } from '@prisma/client'

@InputType()
export class CreateSaleInput {
  @Field(() => String)
  protocolName: string

  @Field(() => String)
  protocolDesc: string

  @Field(() => String)
  clientId: string

  @Field(() => [CreateSaleItemInput])
  saleItems: CreateSaleItemInput[]

  @Field(() => PaymentType)
  paymentType: PaymentType
}
