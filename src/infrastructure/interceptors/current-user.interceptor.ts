import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User, UserDocument } from "../adapters/entity/user.entity";
import { UserMapper } from "../mappers/user.mapper";

export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<UserDocument>,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler<unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const { userId } = request.session || {};
    if (userId) {
      const user = await this.userRepository.findById(userId);
      if (user)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        request.currentUser = UserMapper.toDomain(user);
    }
    return next.handle();
  }
}
