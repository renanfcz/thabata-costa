import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { PaymentType } from '@prisma/client'
import { Client } from 'src/modules/client/entities/client.entity'
import { Protocol } from './protocol.entity'

@ObjectType()
export class Sale {
  @Field(() => String)
  id: string

  @Field(() => [Protocol], { nullable: true })
  protocols: Protocol[]

  @Field(() => Date)
  createdAt: Date

  @Field(() => Client)
  client: Client

  @Field(() => PaymentType)
  paymentType: PaymentType
}

registerEnumType(PaymentType, {
  name: 'PaymentType',
})
