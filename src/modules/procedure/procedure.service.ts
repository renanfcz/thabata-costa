import { PrismaService } from './../../database/prisma.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateProcedureInput } from './dto/create-procedure.input'
import { UpdateProcedureInput } from './dto/update-procedure.input'

@Injectable()
export class ProcedureService {
  constructor(private prisma: PrismaService) {}

  async create(createProcedureInput: CreateProcedureInput) {
    const existsProcedure = await this.prisma.procedure.findFirst({
      where: {
        name: createProcedureInput.name,
      },
    })

    if (existsProcedure) {
      throw new HttpException(
        'O procedimento com o nome "' +
          createProcedureInput.name +
          '" já consta no banco de dados.',
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      const procedureSaved = await this.prisma.procedure.create({
        data: createProcedureInput,
      })
      return procedureSaved
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    return await this.prisma.procedure.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.procedure.findFirst({
      where: { id },
    })
  }

  async update(id: string, updateProcedureInput: UpdateProcedureInput) {
    const existsProcedure = await this.prisma.procedure.findFirst({
      where: {
        name: updateProcedureInput.name,
      },
    })
    if (existsProcedure) {
      throw new HttpException(
        'O procedimento com o nome ' +
          updateProcedureInput.name +
          ' já consta no banco de dados.',
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      return await this.prisma.procedure.update({
        where: { id },
        data: {
          name: updateProcedureInput.name,
        },
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.procedure.delete({
        where: { id },
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
