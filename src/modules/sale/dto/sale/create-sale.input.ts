import { InputType, Field } from '@nestjs/graphql'
import { PaymentType } from '@prisma/client'
import { CreateProtocolInput } from '../protocol/create-protocol.input'

@InputType()
export class CreateSaleInput {
  @Field(() => [CreateProtocolInput])
  protocols: CreateProtocolInput[]

  @Field(() => String)
  clientId: string

  @Field(() => PaymentType)
  paymentType: PaymentType
}
