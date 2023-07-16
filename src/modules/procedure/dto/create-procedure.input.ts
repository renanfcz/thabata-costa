import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateProcedureInput {
  @Field(() => String)
  name: string
}