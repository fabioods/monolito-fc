import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from './product.model'
import { Product } from '../domain/product.entity'
import { Id } from '../../@shared/domain/value-object/id.value-object'
import { ProductRepository } from './product.repository'

describe('ProductRepository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      sync: { force: true }
    })
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const productProps = {
      id: new Id('1'),
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10
    }
    const product = new Product(productProps)
    await productRepository.add(product)

    const productDB = await productRepository.find(productProps.id.value)

    expect(productDB).not.toBeNull()
    expect(productDB?.id.value).toBe(productProps.id.value)
    expect(productDB?.name).toBe(productProps.name)
    expect(productDB?.description).toBe(productProps.description)
    expect(productDB?.purchasePrice).toBe(productProps.purchasePrice)
    expect(productDB?.stock).toBe(productProps.stock)
  })

  it('should not find a product', async () => {
    const productRepository = new ProductRepository()
    await expect(productRepository.find('1')).rejects.toThrowError('Product not found')
  })
})
