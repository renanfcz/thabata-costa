import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ProcedureService } from './procedure.service'
import { Procedure } from './entities/procedure.entity'
import { CreateProcedureInput } from './dto/create-procedure.input'
import { UpdateProcedureInput } from './dto/update-procedure.input'

@Resolver(() => Procedure)
export class ProcedureResolver {
  constructor(private readonly procedureService: ProcedureService) {}

  @Mutation(() => Procedure)
  createProcedure(
    @Args('createProcedureInput') createProcedureInput: CreateProcedureInput,
  ) {
    return this.procedureService.create(createProcedureInput)
  }

  @Query(() => [Procedure], { name: 'procedures' })
  findAll() {
    return this.procedureService.findAll()
  }

  @Query(() => Procedure, { name: 'procedure' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.procedureService.findOne(id)
  }

  @Mutation(() => Procedure)
  updateProcedure(
    @Args('updateProcedureInput') updateProcedureInput: UpdateProcedureInput,
  ) {
    return this.procedureService.update(
      updateProcedureInput.id,
      updateProcedureInput,
    )
  }

  @Mutation(() => Procedure)
  removeProcedure(@Args('id', { type: () => String }) id: string) {
    return this.procedureService.remove(id)
  }
}
