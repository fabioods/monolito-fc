import { AddProductInputDTO } from './add-product.dto'
import { AddProductUseCase } from './add-product.usecase'

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('Add Product Use Case unit test', () => {
  it('should add a product', async () => {
    // Arrange
    const productRepositoryMock = MockRepository()
    const addProductUseCase = new AddProductUseCase(productRepositoryMock)
    const product: AddProductInputDTO = {
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10
    }
    // Act
    const output = await addProductUseCase.execute(product)
    // Assert
    expect(productRepositoryMock.add).toBeCalled()
    expect(output).toEqual({
      id: expect.any(String),
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock
    })
  })
})
