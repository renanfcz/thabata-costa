import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateSessionInput } from './dto/create-session.input'
import { UpdateSessionInput } from './dto/update-session.input'

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async create(createSessionInput: CreateSessionInput) {
    const existsSession = await this.prisma.session.findFirst({
      where: {
        appointment: createSessionInput.appointment,
      },
    })

    if (existsSession) {
      throw new HttpException(
        'Já existe uma sessão maracada para o dia e horário ' +
          createSessionInput.appointment,
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      const sessionSaved = await this.prisma.session.create({
        data: {
          appointment: createSessionInput.appointment,
          saleItem: { connect: { id: createSessionInput.saleItemId } },
        },
        include: { saleItem: true },
      })
      return sessionSaved
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    return await this.prisma.session.findMany({
      include: { saleItem: true },
    })
  }

  async findOne(id: string) {
    return await this.prisma.session.findFirst({
      where: { id },
      include: { saleItem: true },
    })
  }

  async update(id: string, updateSessionInput: UpdateSessionInput) {
    const existsSession = await this.prisma.session.findFirst({
      where: {
        appointment: updateSessionInput.appointment,
      },
    })
    if (existsSession) {
      throw new HttpException(
        'Já existe uma sessão maracada para o dia e horário ' +
          updateSessionInput.appointment,
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      return await this.prisma.session.update({
        where: { id },
        data: {
          appointment: updateSessionInput.appointment,
        },
        include: { saleItem: true },
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
