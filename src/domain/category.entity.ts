export type CategoryProps = {
  categoryId?: string
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
  categoryId: string
  name: string
  description: string | null
  isActive: boolean
  createdAt: Date

  constructor(props: CategoryProps) {
    this.categoryId = props.categoryId
    this.name = props.name
    this.description = props.description ?? null
    this.isActive = props.isActive ?? true
    this.createdAt = props.createdAt ?? new Date()
  }

  static create(props: CategoryCreateCommand) {
    return new Category(props)
  }

  changeName(name: string): void {
    this.name = name
  }

  changeDescription(description: string) {
    this.description = description
  }

  activate() {
    this.isActive = true
  }

  deactivate() {
    this.isActive = false
  }

  toJSON() {
    return {
      categoryId: this.categoryId,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt
    }
  }
}
