import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ClientService } from './client.service'
import { Client } from './entities/client.entity'
import { CreateClientInput } from './dto/create-client.input'
import { UpdateClientInput } from './dto/update-client.input'

@Resolver(() => Client)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Mutation(() => Client)
  createClient(
    @Args('createClientInput') createClientInput: CreateClientInput,
  ) {
    return this.clientService.create(createClientInput)
  }

  @Query(() => [Client])
  findAllClients() {
    return this.clientService.findAll()
  }

  @Query(() => Client)
  findOneClient(@Args('id', { type: () => String }) id: string) {
    return this.clientService.findOne(id)
  }

  @Query(() => Client)
  findClientByName(@Args('name', { type: () => String }) name: string) {
    return this.clientService.findByName(name)
  }

  @Mutation(() => Client)
  updateClient(
    @Args('clientId', { type: () => String }) clientId: string,
    @Args('updateClientInput') updateClientInput: UpdateClientInput,
  ) {
    return this.clientService.update(clientId, updateClientInput)
  }

  @Mutation(() => Client)
  removeClient(@Args('id', { type: () => String }) id: string) {
    return this.clientService.remove(id)
  }
}
