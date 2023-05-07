import User from '../models/user.model';
import { IUserOpt } from '../interfaces/user.interface';

export default class UserService {
  async create(user: IUserOpt) {
    const _user = await User.create(user);
    const { password, ...userWithoutPassword } = _user.toJSON();
    return userWithoutPassword;  
  }

  async findOneWithP(filter: any) {
    const user = await User.findOne({ where: filter });
    return user;
  }
  
  async findOne(filter: any) {
    const user = await User.findOne({
      where: filter,
      attributes: { exclude: ['password'] }
    });
    return user;
  }
}