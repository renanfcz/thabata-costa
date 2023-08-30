import { Indication } from './../../indication/entities/indication.entity'
import { ObjectType, Field } from '@nestjs/graphql'
import { Sale } from 'src/modules/sale/entities/sale.entity'

@ObjectType()
export class Client {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  cpf: string

  @Field(() => Date)
  dateBirth: Date

  @Field(() => String)
  celphone: string

  @Field(() => String)
  state: string

  @Field(() => String)
  city: string

  @Field(() => String)
  street: string

  @Field(() => Number)
  number: number

  @Field(() => String)
  complement: string

  @Field(() => [Indication])
  indications: Indication[]

  @Field(() => Date)
  createdAt: Date

  @Field(() => String)
  knowUs: string

  @Field(() => String)
  socialMediaId: string

  @Field(() => String)
  socialMedia: string

  @Field(() => [Sale])
  sales: Sale[]

  @Field(() => String)
  clientStatus: string
}
