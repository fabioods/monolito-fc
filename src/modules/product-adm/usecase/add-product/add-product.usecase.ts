import { Id } from '../../../@shared/domain/value-object/id.value-object'
import { Product } from '../../domain/product.entity'
import { ProductGateway } from '../../gateway/product.gateway'
import { AddProductInputDTO, AddProductOutputDTO } from './add-product.dto'

export class AddProductUseCase {
  constructor (private readonly repository: ProductGateway) {}

  async execute (product: AddProductInputDTO): Promise<AddProductOutputDTO> {
    const props = {
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock
    }
    const productEntity = new Product(props)

    await this.repository.add(productEntity)

    const output: AddProductOutputDTO = {
      id: productEntity.id.value,
      name: productEntity.name,
      description: productEntity.description,
      purchasePrice: productEntity.purchasePrice,
      stock: productEntity.stock
    }
    return output
  }
}
