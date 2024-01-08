import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateSessionInput } from './dto/create-session.input'
import { UpdateSessionInput } from './dto/update-session.input'

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateSessionInput) {
    const existsSession = await this.existsSession(
      input.initDate,
      input.finalDate,
    )

    if (existsSession) {
      throw new HttpException(
        'Já existe uma sessão maracada para o dia e horário ',
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      const sessionSaved = await this.prisma.session.create({
        data: {
          initDate: input.initDate,
          finalDate: input.finalDate,
          saleItem: { connect: { id: input.saleItemId } },
          obs: input.obs,
        },
        include: {
          saleItem: {
            include: {
              procedure: true,
            },
          },
        },
      })
      return sessionSaved
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    return await this.prisma.session.findMany({
      include: {
        saleItem: {
          include: {
            procedure: true,
            protocol: {
              include: {
                sale: {
                  include: {
                    client: true,
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
    return await this.prisma.session.findFirst({
      where: { id },
      include: { saleItem: true },
    })
  }

  async update(id: string, input: UpdateSessionInput) {
    const existsSession = await this.existsSessionForUpdate(
      id,
      input.initDate,
      input.finalDate,
    )

    if (existsSession) {
      throw new HttpException(
        'Já existe uma sessão maracada para o dia e horário ',
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      const saleItem = await this.prisma.saleItem.findFirst({
        where: {
          id: input.saleItemId,
        },
      })
      return await this.prisma.session.update({
        where: { id },
        data: {
          initDate: input.initDate,
          finalDate: input.finalDate,
          saleItem: { connect: { id: saleItem.id } },
        },
        include: {
          saleItem: {
            include: {
              procedure: true,
            },
          },
        },
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prisma.session.deleteMany({
        where: { id },
      })
      return result.count
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  private async existsSession(initDate: Date, finalDate: Date) {
    return await this.prisma.session.findFirst({
      where: {
        OR: [
          {
            initDate: {
              gte: initDate,
              lte: finalDate,
            },
          },
          {
            finalDate: {
              gte: initDate,
              lte: finalDate,
            },
          },
        ],
      },
    })
  }

  private async existsSessionForUpdate(
    id: string,
    initDate: Date,
    finalDate: Date,
  ) {
    return await this.prisma.session.findFirst({
      where: {
        NOT: {
          id,
        },
        AND: [
          {
            initDate: {
              gte: initDate,
            },
            finalDate: {
              lte: finalDate,
            },
          },
          {
            OR: [
              {
                initDate: {
                  lte: finalDate,
                },
              },
              {
                finalDate: {
                  gte: initDate,
                },
              },
            ],
          },
        ],
      },
    })
  }
}
