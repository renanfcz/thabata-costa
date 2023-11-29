import { Indication } from './../../indication/entities/indication.entity'
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { Sale } from 'src/modules/sale/entities/sale.entity'
import { ClientStatus, KnowUs } from '@prisma/client'

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

  @Field(() => String, { nullable: true })
  street: string

  @Field(() => Number, { nullable: true })
  number: number

  @Field(() => String, { nullable: true })
  complement: string

  @Field(() => [Indication])
  indications: Indication[]

  @Field(() => Date)
  createdAt: Date

  @Field(() => KnowUs, { nullable: true })
  knowUs?: KnowUs

  @Field(() => String, { nullable: true })
  recommendedBy: string

  @Field(() => String, { nullable: true })
  socialMediaId: string

  @Field(() => String, { nullable: true })
  socialMedia: string

  @Field(() => [Sale])
  sales: Sale[]

  @Field(() => ClientStatus)
  clientStatus: ClientStatus
}

registerEnumType(ClientStatus, {
  name: 'ClientStatus',
})

registerEnumType(KnowUs, {
  name: 'KnowUs',
})
