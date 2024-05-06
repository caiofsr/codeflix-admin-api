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

export class Category {
  categoryId: Uuid
  name: string
  description: string | null
  isActive: boolean
  createdAt: Date

  constructor(props: CategoryProps) {
    this.categoryId = props.categoryId ?? new Uuid()
    this.name = props.name
    this.description = props.description ?? null
    this.isActive = props.isActive ?? true
    this.createdAt = props.createdAt ?? new Date()
  }

  static create(props: CategoryCreateCommand) {
    const category = new Category(props)

    Category.validate(category)

    return category
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create()
    return validator.validate(entity)
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
