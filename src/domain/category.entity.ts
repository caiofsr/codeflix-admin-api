import { Entity } from "../shared/domain/entity"
import { EntityValidationError } from "../shared/domain/validators/validation.error"
import { ValueObject } from "../shared/domain/value-object"
import { Uuid } from "../shared/value-objects/uuid.vo"
import { CategoryValidatorFactory } from "./category.validator"

export type CategoryProps = {
  categoryId?: Uuid
  name: string
  description?: string | null
  isActive?: boolean
  createdAt?: Date
}

export type CategoryCreateCommand = {
  name: string
  description?: string | null
  isActive?: boolean
}

export class Category extends Entity {
  categoryId: Uuid
  name: string
  description: string | null
  isActive: boolean
  createdAt: Date

  constructor(props: CategoryProps) {
    super()
    this.categoryId = props.categoryId ?? new Uuid()
    this.name = props.name
    this.description = props.description ?? null
    this.isActive = props.isActive ?? true
    this.createdAt = props.createdAt ?? new Date()
  }

  get entityId(): ValueObject {
    return this.categoryId
  }

  static create(props: CategoryCreateCommand) {
    const category = new Category(props)

    Category.validate(category)

    return category
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create()

    const isValid = validator.validate(entity)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }

  changeName(name: string): void {
    this.name = name

    Category.validate(this)
  }

  changeDescription(description: string) {
    this.description = description

    Category.validate(this)
  }

  activate() {
    this.isActive = true
  }

  deactivate() {
    this.isActive = false
  }

  toJSON() {
    return {
      categoryId: this.categoryId.id,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt
    }
  }
}
