import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateSaleInput } from './dto/sale/create-sale.input'

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleInput: CreateSaleInput) {
    return this.prisma.sale.create({
      data: {
        clientId: createSaleInput.clientId,
        protocolName: createSaleInput.protocolName,
        protocolDesc: createSaleInput.protocolDesc,
        saleItems: {
          createMany: { data: createSaleInput.saleItems },
        },
      },
      include: { saleItems: true, client: true },
    })
  }

  async findAll() {
    return this.prisma.sale.findMany({
      include: {
        client: true,
        saleItems: {
          include: {
            procedure: true,
          },
        },
      },
    })
  }

  async findOne(id: string) {
    return this.prisma.sale.findFirst({
      where: { id },
      include: {
        client: true,
        saleItems: true,
      },
    })
  }

  async remove(id: string) {
    try {
      return await this.prisma.sale.delete({
        where: { id },
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
