import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateSaleItemInput {
  @Field(() => String)
  procedureId: string

  @Field(() => Number)
  value: number

  @Field(() => Number)
  discount: number

  @Field(() => Number)
  sessionsNum: number

  @Field(() => String, { nullable: true })
  protocolId: string
}
