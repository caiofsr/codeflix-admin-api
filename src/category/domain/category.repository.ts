import { Repository } from "../../shared/domain/repositories/repository-interface";
import { Uuid } from "../../shared/value-objects/uuid.vo";
import { Category } from "./category.entity";

export interface CategoryRepository extends Repository<Category, Uuid> {}
