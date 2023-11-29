import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { PaymentType } from '@prisma/client'
import { Client } from 'src/modules/client/entities/client.entity'
import { SaleItem } from './sale-item.entity'

@ObjectType()
export class Sale {
  @Field(() => String)
  id: string

  @Field(() => String)
  protocolName: string

  @Field(() => String)
  protocolDesc: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => [SaleItem])
  saleItems: SaleItem[]

  @Field(() => Client)
  client: Client

  @Field(() => PaymentType)
  paymentType: PaymentType
}

registerEnumType(PaymentType, {
  name: 'PaymentType',
})
