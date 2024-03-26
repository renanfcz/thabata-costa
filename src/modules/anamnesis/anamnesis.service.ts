import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateAnamnesisInput } from './dto/create-anamnesis.input'
import { UpdateAnamnesisInput } from './dto/update-anamnesis.input'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class AnamnesisService {
  constructor(private prisma: PrismaService) {}

  async create(createAnamnesisInput: CreateAnamnesisInput) {
    const existsAnamnesis = await this.findByProtocolType(
      createAnamnesisInput.protocolType,
    )
    if (existsAnamnesis) {
      throw new HttpException(
        'Já existe uma anamnese válida para o protocolo ' +
          createAnamnesisInput.protocolType,
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      const anamnesisSaved = this.prisma.anamnesis.create({
        data: createAnamnesisInput,
      })
      return anamnesisSaved
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    return await this.prisma.anamnesis.findMany({
      include: {
        client: true,
      },
    })
  }

  async findOne(id: string) {
    return await this.prisma.anamnesis.findFirst({
      where: { id },
      include: {
        client: true,
      },
    })
  }

  async findAllAnamnesisByClient(id: string) {
    return await this.prisma.anamnesis.findFirst({
      where: { clientId: id },
      include: {
        client: true,
      },
    })
  }

  async findByProtocolType(protocolType: string) {
    const today = new Date()
    return await this.prisma.anamnesis.findFirst({
      where: { protocolType, AND: [{ expriresIn: { not: null, gt: today } }] },
      include: {
        client: true,
      },
    })
  }

  async update(id: string, updateAnamnesisInput: UpdateAnamnesisInput) {
    try {
      return await this.prisma.anamnesis.update({
        where: { id },
        data: {
          protocolType: updateAnamnesisInput.protocolType,
          signedIn: updateAnamnesisInput.signedIn,
          data: updateAnamnesisInput.data,
        },
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async signAnamnesis(id: string, input: UpdateAnamnesisInput) {
    try {
      const expirationDate = new Date()
      expirationDate.setFullYear(expirationDate.getFullYear() + 5)

      return await this.prisma.anamnesis.update({
        where: { id },
        data: {
          signature: input.signature,
          signedIn: new Date(),
          expriresIn: expirationDate,
        },
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
