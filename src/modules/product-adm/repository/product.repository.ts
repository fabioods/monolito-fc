import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Product } from '../domain/product.entity'
import { ProductGateway } from '../gateway/product.gateway'
import { ProductModel } from './product.model'

export class ProductRepository implements ProductGateway {
  async add (product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.value,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  async find (id: string): Promise<Product> {
    const productDB = await ProductModel.findOne({
      where: { id }
    })

    if (!productDB) {
      throw new Error('Product not found')
    }

    const productProps = {
      id: new Id(productDB.id),
      name: productDB.name,
      description: productDB.description,
      purchasePrice: productDB.purchasePrice,
      stock: productDB.stock
    }
    const product = new Product(productProps)
    return product
  }
}
