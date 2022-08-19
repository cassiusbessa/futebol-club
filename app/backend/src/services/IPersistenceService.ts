export interface IPersistanceService<T> {
  login(entity: T): Promise<string>;
  // update(entity: T): Promise<void>;
  // delete(id: number): Promise<void>;
  // getAll(): Promise<T[]>;
  // getById(id: number): Promise<T>;
}

// export interface IUser extends IPersistanceService<T> {
//   login(entity: T): Promise<void>;
// }
