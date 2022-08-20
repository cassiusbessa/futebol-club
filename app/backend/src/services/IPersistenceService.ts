export interface IPersistanceService<T> {
  login(entity: T): Promise<string>;
  // update(entity: T): Promise<void>;
  // delete(id: number): Promise<void>;
  // getAll(): Promise<T[]>;
  // getById(id: number): Promise<T>;
}

export interface IUserService<T> extends IPersistanceService<T> {
  getRole(user: T): Promise<string>;
}
