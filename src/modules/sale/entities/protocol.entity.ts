import { ObjectType, Field } from '@nestjs/graphql'
import { SaleItem } from './sale-item.entity'
import { Sale } from './sale.entity'

@ObjectType()
export class Protocol {
  @Field(() => String)
  id: string

  @Field(() => String)
  protocolName: string

  @Field(() => String)
  protocolDesc: string

  @Field(() => Sale)
  sale?: Sale

  @Field(() => [SaleItem])
  saleItems: SaleItem[]
}
