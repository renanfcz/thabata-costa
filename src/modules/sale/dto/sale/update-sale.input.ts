import { CreateSaleInput } from './create-sale.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSaleInput extends PartialType(CreateSaleInput) {
  @Field(() => String)
  protocolDesc: string
}
