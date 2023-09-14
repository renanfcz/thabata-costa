import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateSessionInput } from './dto/create-session.input'
import { UpdateSessionInput } from './dto/update-session.input'

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateSessionInput) {
    const existsSession = await this.prisma.session.findFirst({
      where: {
        OR: [
          {
            initDate: {
              gte: input.initDate,
              lte: input.finalDate,
            },
          },
          {
            finalDate: {
              gte: input.initDate,
              lte: input.finalDate,
            },
          },
        ],
      },
    })

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
            include: { procedure: true },
          },
        },
      })
      return sessionSaved
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    return await this.prisma.session.findMany({
      include: {
        saleItem: {
          include: { procedure: true },
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
    const existsSession = await this.prisma.session.findFirst({
      where: {
        NOT: {
          id,
        },
        AND: [
          {
            initDate: {
              gte: input.initDate,
            },
            finalDate: {
              lte: input.finalDate,
            },
          },
          {
            OR: [
              {
                initDate: {
                  lte: input.finalDate,
                },
              },
              {
                finalDate: {
                  gte: input.initDate,
                },
              },
            ],
          },
        ],
      },
    })
    console.log(existsSession)
    console.log(input)
    if (existsSession) {
      throw new HttpException(
        'Já existe uma sessão maracada para o dia e horário ',
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      const procedure = await this.prisma.procedure.findFirst({
        where: {
          name: input.procedureName,
        },
      })
      await this.prisma.saleItem.update({
        where: {
          id: input.saleItemId,
        },
        data: {
          procedureId: procedure.id,
        },
      })
      return await this.prisma.session.update({
        where: { id },
        data: {
          initDate: input.initDate,
          finalDate: input.finalDate,
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
      return await this.prisma.session.delete({
        where: { id },
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
