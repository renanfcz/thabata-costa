import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ClientService } from './client.service'
import { Client } from './entities/client.entity'
import { CreateClientInput } from './dto/create-client.input'
import { UpdateClientInput } from './dto/update-client.input'

@Resolver(() => Client)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Mutation(() => Client)
  async createClient(
    @Args('createClientInput') createClientInput: CreateClientInput,
  ) {
    return await this.clientService.create(createClientInput)
  }

  @Query(() => [Client], { name: 'client' })
  async findAll() {
    return await this.clientService.findAll()
  }

  @Query(() => Client, { name: 'client' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.clientService.findOne(id)
  }

  @Mutation(() => Client)
  async updateClient(
    @Args('updateClientInput') updateClientInput: UpdateClientInput,
  ) {
    return await this.clientService.update(
      updateClientInput.id,
      updateClientInput,
    )
  }

  @Mutation(() => Client)
  async removeClient(@Args('id', { type: () => String }) id: string) {
    return await this.clientService.remove(id)
  }
}
