import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SaleService } from './sale.service'
import { Sale } from './entities/sale.entity'
import { CreateSaleInput } from './dto/sale/create-sale.input'

@Resolver(() => Sale)
export class SaleResolver {
  constructor(private readonly saleService: SaleService) {}

  @Mutation(() => Sale)
  createSale(@Args('createSaleInput') createSaleInput: CreateSaleInput) {
    return this.saleService.create(createSaleInput)
  }

  @Query(() => [Sale])
  findAllSales() {
    return this.saleService.findAll()
  }

  @Query(() => Sale)
  findOneSale(@Args('id', { type: () => String }) id: string) {
    return this.saleService.findOne(id)
  }

  @Mutation(() => Sale)
  removeSale(@Args('id', { type: () => String }) id: string) {
    return this.saleService.remove(id)
  }
}
