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
          client: { connect: { id: createSessionInput.clientId } },
          procedure: { connect: { id: createSessionInput.procedureId } },
        },
      })
      return sessionSaved
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    return await this.prisma.session.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.session.findFirst({
      where: { id },
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
          procedure: {
            update: { data: updateSessionInput.procedureId },
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
