import { CreateProcedureInput } from './create-procedure.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateProcedureInput extends PartialType(CreateProcedureInput) {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string
}
