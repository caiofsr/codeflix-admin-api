import { EntityValidationError } from '../../shared/domain/validators/validation.error'
import { Uuid } from '../../shared/value-objects/uuid.vo'
import { Category } from './category.entity'

describe('Category Unit Tests', () => {
  let validateSpy: any

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate")
  })

  describe('constructor', () => {
    test('should create a category with default values', () => {
      const category = new Category({
        name: 'Movie'
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.isActive).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
    })

    test('should create a category with all values', () => {
      const createdAt = new Date()
      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
        isActive: false,
        createdAt
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.isActive).toBeFalsy()
      expect(category.createdAt).toBe(createdAt)
    })

    test('should create a category with name and description', () => {
      const category = new Category({
        name: 'Movie',
        description: 'Movie description'
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.isActive).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
    })
  })

  describe('create command', () => {
    test('should create a category', () => {
      const category = Category.create({
        name: 'Movie'
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.isActive).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    test('should create a category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description'
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.isActive).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    test('should create a category with isActive', () => {
      const category = Category.create({
        name: 'Movie',
        isActive: false
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.isActive).toBeFalsy()
      expect(category.createdAt).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('category_id field', () => {
    const arrange = [
      { categoryId: null }, { categoryId: undefined }, { categoryId: new Uuid() }
    ]

    test.each(arrange)('id = %o', ({ categoryId }) => {
      const category =  new Category({
        name: 'Movie',
        categoryId: categoryId as any
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      if (categoryId instanceof Uuid) {
        expect(category.categoryId).toBe(categoryId)
      }
    })
  })

  test('should change name', () => {
    const category = new Category({
      name: 'Movie'
    })

    category.changeName('Other name')

    expect(category.name).toBe('Other name')
  })

  test('should change description', () => {
    const category = new Category({
      name: 'Movie'
    })

    category.changeDescription('Some description')

    expect(category.description).toBe('Some description')
  })

  test('should activate a category', () => {
    const category = new Category({
      name: 'Movie',
      isActive: false
    })

    category.activate()

    expect(category.isActive).toBeTruthy()
  })

  test('should deactivate a category', () => {
    const category = new Category({
      name: 'Movie',
    })

    category.deactivate()

    expect(category.isActive).toBeFalsy()
  })
})

describe('Category Validator', () => {
  describe('create command', () => {
    test('should invalid category if name property is not correct', () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => Category.create({ name: '' })).containsErrorMessages({
        name: [
          'name should not be empty'
        ]
      })

      expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => Category.create({ name: 't'.repeat(256) })).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      })
    })

    it('should invalid category if description property is not correct', () => {
      expect(() => Category.create({ description: 5 } as any)).containsErrorMessages({
        description: ['description must be a string']
      })
    })

    it('should invalid category if isActive is not correct', () => {
      expect(() => Category.create({ isActive: 2 } as any)).containsErrorMessages({
        isActive: ['isActive must be a boolean value']
      })
    })
  })

  describe('changeName method', () => {
    it('should invalid category if name property is not correct', () => {
      const category = Category.create({ name: 'Movie' })

      expect(() => category.changeName(null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => category.changeName('')).containsErrorMessages({
        name: [
          'name should not be empty'
        ]
      })

      expect(() => category.changeName(5 as any)).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => category.changeName('t'.repeat(256))).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      })
    })
  })

  describe('changeDescription method', () => {
    it('should invalid category if description property is not correct', () => {
      const category = Category.create({ name: 'Movie' })

      expect(() => category.changeDescription(1 as any)).containsErrorMessages({
        description: ['description must be a string']
      })
    })
  })
})
