import { AuthenticateInput } from './dto/authenticate.input'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/database/prisma.service'

import { CreateUserInput } from './dto/create-user.input'
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async createUser(createAuthInput: CreateUserInput) {
    const existsUser = await this.prisma.user.findFirst({
      where: {
        email: createAuthInput.email,
      },
    })

    if (existsUser) {
      throw new HttpException(
        'O usuário com o email ' +
          createAuthInput.email +
          ' já consta no banco de dados.',
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      const data = {
        ...createAuthInput,
        password: await bcrypt.hash(createAuthInput.password, 10),
      }
      const userSaved = await this.prisma.user.create({
        data,
      })
      return userSaved
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async authenticate(authInput: AuthenticateInput) {
    const user = await this.validateUser(authInput)

    if (user == null) {
      throw new Error('Credenciais inválidas')
    }

    const payload = { nickname: user.nickname, id: user.id }

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '60s',
    })

    if (accessToken == null) {
      throw new Error('Erro na geração do token')
    }

    return { user, token: accessToken }
  }

  private async validateUser(data: AuthenticateInput): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { nickname: data.nickname },
    })

    if (!user) {
      return null
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password)

    if (!passwordMatch) {
      return null
    }

    return user
  }
}
