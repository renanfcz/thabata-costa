import { ObjectType, Field } from '@nestjs/graphql'
import { SaleItem } from 'src/modules/sale/entities/sale-item.entity'

@ObjectType()
export class Session {
  @Field(() => String)
  id: string

  @Field(() => Date)
  initDate: Date

  @Field(() => Date)
  finalDate: Date

  @Field(() => SaleItem)
  saleItem: SaleItem

  @Field(() => String)
  obs?: string
}
