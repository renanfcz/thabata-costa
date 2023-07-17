import { ObjectType, Field } from '@nestjs/graphql'
import { Client } from 'src/modules/client/entities/client.entity'
import { SaleItem } from './sale-item.entity'

@ObjectType()
export class Sale {
  @Field(() => String)
  id: string

  @Field(() => Number)
  discount: number

  @Field(() => Date)
  created_at: Date

  @Field(() => [SaleItem])
  saleItems: SaleItem[]

  @Field(() => Client)
  client: Client
}
