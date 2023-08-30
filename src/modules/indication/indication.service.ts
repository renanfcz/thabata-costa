import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateIndicationInput } from './dto/create-indication.input'

@Injectable()
export class IndicationService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateIndicationInput) {
    const existsIndication = await this.prisma.indication.findFirst({
      where: {
        OR: [
          {
            name: input.name,
          },
          {
            celphone: input.celphone,
          },
          {
            socialMediaId: input.socialMediaId,
          },
        ],
      },
    })

    const existsClient = await this.prisma.client.findFirst({
      where: {
        OR: [
          {
            name: input.name,
          },
          {
            celphone: input.celphone,
          },
          {
            socialMediaId: input.socialMediaId,
          },
        ],
      },
    })

    if (existsIndication || existsClient) {
      throw new HttpException(
        'A indicação já consta no banco de dados, por favor indique outra pessoa.',
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      const indicationSaved = await this.prisma.indication.create({
        data: input,
      })
      return indicationSaved
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    return await this.prisma.indication.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.indication.findFirst({
      where: { id },
    })
  }

  async remove(id: string) {
    try {
      return await this.prisma.indication.delete({
        where: { id },
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
