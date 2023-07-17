import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateSaleInput } from './dto/sale/create-sale.input'
import { UpdateSaleInput } from './dto/sale/update-sale.input'

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleInput: CreateSaleInput) {
    return this.prisma.sale.create({
      data: {
        discount: createSaleInput.discount,
        client_id: createSaleInput.clientId,
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

  async update(id: string, updateSaleInput: UpdateSaleInput) {
    try {
      return await this.prisma.sale.update({
        where: { id },
        data: {
          discount: updateSaleInput.discount,
          saleItems: { set: updateSaleInput.saleItems },
        },
        include: { client: true, saleItems: true },
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
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
