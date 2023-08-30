import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { IndicationService } from './indication.service'
import { Indication } from './entities/indication.entity'
import { CreateIndicationInput } from './dto/create-indication.input'

@Resolver(() => Indication)
export class IndicationResolver {
  constructor(private readonly indicationService: IndicationService) {}

  @Mutation(() => Indication)
  createIndication(
    @Args('createIndicationInput') createIndicationInput: CreateIndicationInput,
  ) {
    return this.indicationService.create(createIndicationInput)
  }

  @Query(() => [Indication])
  findAllIndications() {
    return this.indicationService.findAll()
  }

  @Query(() => Indication)
  findOneIndication(@Args('id', { type: () => String }) id: string) {
    return this.indicationService.findOne(id)
  }

  @Mutation(() => Indication)
  removeIndication(@Args('id', { type: () => String }) id: string) {
    return this.indicationService.remove(id)
  }
}
