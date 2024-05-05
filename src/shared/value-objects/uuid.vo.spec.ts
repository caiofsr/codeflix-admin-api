import { v4 } from "uuid"
import { InvalidUuidError, Uuid } from "./uuid.vo"

describe('Uuid Unit Tests', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate')

  test('should throw when uuid is invalid', () => {
    expect(() => {
      new Uuid('invalid-uuid')
    }).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('should create a valid uuid', () => {
    const uuid = new Uuid()

    expect(uuid.id).toBeDefined()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('should accept a valid Uuid', () => {
    const uuid = v4()
    const uuidVo = new Uuid(uuid)

    expect(uuidVo.id).toBe(uuid)
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })
})
