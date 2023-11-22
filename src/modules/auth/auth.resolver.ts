import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthenticateInput } from './dto/authenticate.input'
import { CreateUserInput } from './dto/create-user.input'
import { Auth } from './entities/auth.entity'
import { User } from './entities/user.entity'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.createUser(createUserInput)
  }

  @Query(() => Auth)
  authenticate(@Args('authInput') authInput: AuthenticateInput) {
    return this.authService.authenticate(authInput)
  }
}
