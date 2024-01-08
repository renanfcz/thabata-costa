import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateSaleInput } from './dto/sale/create-sale.input'
@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleInput: CreateSaleInput) {
    const saleSaved = await this.prisma.sale.create({
      data: {
        client: { connect: { id: createSaleInput.clientId } },
        paymentType: createSaleInput.paymentType,
      },
    })
    createSaleInput.protocols.forEach(async (p) => {
      const protocol = await this.prisma.protocol.create({
        data: {
          protocolName: p.protocolName,
          protocolDesc: p.protocolDesc,
          sale: { connect: { id: saleSaved.id } },
        },
      })

      p.saleItems.forEach(async (s) => {
        await this.prisma.saleItem.create({
          data: {
            procedure: { connect: { id: s.procedureId } },
            protocol: { connect: { id: protocol.id } },
            value: s.value,
            discount: s.discount,
            sessionsNum: s.sessionsNum,
          },
        })
      })
    })

    return this.findOne(saleSaved.id)
  }

  async findAll() {
    return this.prisma.sale.findMany({
      include: {
        client: true,
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
    })
  }

  async findOne(id: string) {
    return this.prisma.sale.findFirst({
      where: { id },
      include: {
        client: true,
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

  // async update(id: string, sale: UpdateSaleInput) {
  //   try {
  //     return await this.prisma.sale.update({
  //       where: { id },
  //       data: {
  //         protocols: sale.protocols,
  //         protocolDesc: sale.protocolDesc,
  //       },
  //       include: {
  //         saleItems: {
  //           include: {
  //             sessions: {
  //               include: {
  //                 saleItem: {
  //                   include: {
  //                     procedure: true,
  //                   },
  //                 },
  //               },
  //             },
  //             procedure: true,
  //           },
  //         },
  //       },
  //     })
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }
}
