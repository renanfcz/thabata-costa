import { CreateSaleInput } from './create-sale.input'
import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSaleInput extends PartialType(CreateSaleInput) {}
