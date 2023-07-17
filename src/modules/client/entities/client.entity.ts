import { ObjectType, Field } from '@nestjs/graphql'
import { Sale } from 'src/modules/sale/entities/sale.entity'

@ObjectType()
export class Client {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  telephone: string

  @Field(() => String)
  address: string

  @Field(() => Date)
  created_at: Date

  @Field(() => [Sale])
  sales: Sale[]
}
