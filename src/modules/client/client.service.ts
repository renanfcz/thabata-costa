import { PrismaService } from './../../database/prisma.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateClientInput } from './dto/create-client.input'
import { UpdateClientInput } from './dto/update-client.input'

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(createClientInput: CreateClientInput) {
    const existsClient = await this.prisma.client.findFirst({
      where: {
        name: createClientInput.name,
      },
    })

    if (existsClient) {
      throw new HttpException(
        'O cliente com o nome ' +
          createClientInput.name +
          ' já consta no banco de dados.',
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      const clientSaved = await this.prisma.client.create({
        data: createClientInput,
      })
      return clientSaved
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    return await this.prisma.client.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.client.findFirst({
      where: { id },
    })
  }

  async update(id: string, updateClientInput: UpdateClientInput) {
    const existsClient = await this.prisma.client.findFirst({
      where: {
        name: updateClientInput.name,
      },
    })
    if (existsClient) {
      throw new HttpException(
        'O cliente com o nome ' +
          updateClientInput.name +
          ' já consta no banco de dados.',
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      return await this.prisma.client.update({
        where: { id },
        data: updateClientInput,
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.client.delete({
        where: { id },
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
