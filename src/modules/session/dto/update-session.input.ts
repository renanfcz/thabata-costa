import { CreateSessionInput } from './create-session.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSessionInput extends PartialType(CreateSessionInput) {
  @Field(() => String)
  id: string

  @Field(() => Date)
  initDate: Date

  @Field(() => Date)
  finalDate: Date

  @Field(() => String)
  obs?: string

  @Field(() => String)
  procedureId?: string

  @Field(() => String)
  procedureName?: string

  @Field(() => String)
  saleItemId?: string
}
