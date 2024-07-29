import { Entity } from "../../domain/entity";
import { NotFoundError } from "../../domain/errors/not-found.error";
import { Uuid } from "../../value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityConstructor = {
  entityId: Uuid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  entityId: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.entityId = props.entityId;
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entityId: this.entityId.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe("InMemory Unit Test", () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  it("should insert a new entity", async () => {
    const entity = new StubEntity({
      entityId: new Uuid(),
      name: "test",
      price: 10,
    });

    await repo.insert(entity);

    expect(repo.items).toHaveLength(1);
    expect(repo.items).toContainEqual(entity);
  });

  it("should bulk insert entities", async () => {
    const entities = [
      new StubEntity({
        entityId: new Uuid(),
        name: "test",
        price: 10,
      }),
      new StubEntity({
        entityId: new Uuid(),
        name: "test",
        price: 10,
      }),
    ];

    await repo.bulkInsert(entities);

    expect(repo.items).toHaveLength(2);
    expect(repo.items).toContainEqual(entities[0]);
    expect(repo.items).toContainEqual(entities[1]);
  });

  it("should return all entities", async () => {
    const entity = new StubEntity({
      entityId: new Uuid(),
      name: "test",
      price: 10,
    });

    await repo.insert(entity);

    const entities = await repo.findAll();

    expect(entities).toHaveLength(1);
    expect(entities).toContainEqual(entity);
  });

  it("should throw error on update when entity not found", async () => {
    const entity = new StubEntity({
      entityId: new Uuid(),
      name: "test",
      price: 10,
    });

    await expect(repo.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entityId, StubEntity)
    );
  });

  it("should update an entity", async () => {
    const entity = new StubEntity({
      entityId: new Uuid(),
      name: "test",
      price: 10,
    });

    await repo.insert(entity);

    const entityUpdated = new StubEntity({
      entityId: entity.entityId,
      name: "test updated",
      price: 20,
    });

    await repo.update(entityUpdated);

    expect(repo.items).toHaveLength(1);
    expect(repo.items).toContainEqual(entityUpdated);
  });

  it("should delete an entity", async () => {
    const entity = new StubEntity({
      entityId: new Uuid(),
      name: "test",
      price: 10,
    });

    await repo.insert(entity);

    await repo.delete(entity.entityId);

    expect(repo.items).toHaveLength(0);
  });

  it("should throw error on delete when entity not found", async () => {
    const uuid = new Uuid();

    await expect(repo.delete(uuid)).rejects.toThrow(new NotFoundError(uuid, StubEntity));
  });
});
