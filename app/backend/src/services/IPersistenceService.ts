export interface IPersistanceService<T> {
  getAll(): Promise<T[] | []>;
  // update(entity: T): Promise<void>;
  // delete(id: number): Promise<void>;
  getById(id: number): Promise<T | null>;
}

export interface IUserService<T> {
  login(entity: T): Promise<string>;
  getRole(user: T): Promise<string>;
}

export interface IMatcheService<T> {
  getAll(): Promise<T[] | []>
  create(entity: T): Promise<T>;
}
