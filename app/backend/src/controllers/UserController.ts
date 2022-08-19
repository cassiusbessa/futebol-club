import { Request, Response } from 'express';
// import { ILogin } from '../database/models/entitites/IUser';
import User from '../database/models/users';
import { IPersistanceService } from '../services/IPersistenceService';

// export default class UserController {
//   // _persistanceService: IPersistanceService<User>;
//   teste: string;

//   constructor(teste: string) {
//     this.teste = teste;
//   }

//   public loginController(req: Request, res: Response) {
//     // console.log('this controller', this);
//     // console.log('controller login');
//     // console.log(req.body);
//     // try {
//     // console.log('controller try login');
//     // const token = await this._persistanceService.login(req.body);
//     // console.log('token', token);
//     return res.status(200).json({ message: this.teste });
//     // } catch (error) {
//     //   return res.status(400).json({ message: error });
//     // }
//   }
// }

export default class UserController {
  _persistanceService: IPersistanceService<User>;

  constructor(persistanceService: IPersistanceService<User>) {
    this._persistanceService = persistanceService;
  }

  public async loginController(req: Request, res: Response) {
    console.log('this controller', this);
    console.log('controller login');
    console.log(req.body);
    try {
      console.log('controller try login');
      const token = await this._persistanceService.login(req.body);
      console.log('token', token);
      return res.status(200).json({ token });
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }
}
