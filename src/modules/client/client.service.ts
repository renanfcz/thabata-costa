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
    return await this.prisma.client.findMany({
      include: {
        indications: true,
        sales: {
          include: {
            protocols: {
              include: {
                saleItems: {
                  include: {
                    procedure: true,
                    sessions: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  async findOne(id: string) {
    return await this.prisma.client.findFirst({
      where: { id },
      include: {
        indications: true,
        sales: {
          include: {
            protocols: {
              include: {
                saleItems: {
                  include: {
                    procedure: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  async findByName(name: string) {
    return await this.prisma.client.findFirst({
      where: { name },
      include: {
        indications: true,
        sales: {
          include: {
            protocols: {
              include: {
                saleItems: {
                  include: {
                    procedure: true,
                    sessions: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  async update(id: string, updateClientInput: UpdateClientInput) {
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
