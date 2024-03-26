import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { AnamnesisService } from './anamnesis.service'
import { CreateAnamnesisInput } from './dto/create-anamnesis.input'
import { UpdateAnamnesisInput } from './dto/update-anamnesis.input'
import { Anamnesis } from './entities/anamnesis.entity'

@Resolver(() => Anamnesis)
export class AnamnesisResolver {
  constructor(private readonly anamnesisService: AnamnesisService) {}

  @Mutation(() => Anamnesis)
  createAnamnesis(
    @Args('createAnamnesisInput') createAnamnesisInput: CreateAnamnesisInput,
  ) {
    return this.anamnesisService.create(createAnamnesisInput)
  }

  @Query(() => [Anamnesis])
  findAllAnamnesis() {
    return this.anamnesisService.findAll()
  }

  @Query(() => Anamnesis)
  findOneAnamnesis(@Args('id') id: string) {
    return this.anamnesisService.findOne(id)
  }

  @Query(() => Anamnesis)
  findAllAnamnesisByClient(@Args('id') id: string) {
    return this.anamnesisService.findAllAnamnesisByClient(id)
  }

  @Mutation(() => Anamnesis)
  updateAnamnesis(
    @Args('updateAnamnesisInput') updateAnamnesisInput: UpdateAnamnesisInput,
  ) {
    return this.anamnesisService.update(
      updateAnamnesisInput.id,
      updateAnamnesisInput,
    )
  }

  @Mutation(() => Anamnesis)
  signAnamnesis(@Args('input') input: UpdateAnamnesisInput) {
    return this.anamnesisService.signAnamnesis(input.id, input)
  }
}
