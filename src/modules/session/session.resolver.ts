import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SessionService } from './session.service'
import { Session } from './entities/session.entity'
import { CreateSessionInput } from './dto/create-session.input'
import { UpdateSessionInput } from './dto/update-session.input'

@Resolver(() => Session)
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => Session)
  createSession(
    @Args('createSessionInput') createSessionInput: CreateSessionInput,
  ) {
    return this.sessionService.create(createSessionInput)
  }

  @Query(() => [Session])
  findAllSessions() {
    return this.sessionService.findAll()
  }

  @Query(() => [Session])
  findAllSessionsByProtocol(
    @Args('protocolId', { type: () => String }) protocolId: string,
  ) {
    return this.sessionService.findAllSessionsByProtocol(protocolId)
  }

  @Query(() => Session)
  findOneSession(@Args('id', { type: () => String }) id: string) {
    return this.sessionService.findOne(id)
  }

  @Mutation(() => Session)
  updateSession(
    @Args('updateSessionInput') updateSessionInput: UpdateSessionInput,
  ) {
    return this.sessionService.update(updateSessionInput.id, updateSessionInput)
  }

  @Mutation(() => Number)
  removeSession(@Args('id', { type: () => String }) id: string) {
    return this.sessionService.remove(id)
  }
}
