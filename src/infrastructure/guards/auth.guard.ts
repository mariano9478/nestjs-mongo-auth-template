import { CanActivate, ExecutionContext, HttpException } from "@nestjs/common";

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    if (request.session.userId) {
      return true;
    } else {
      throw new HttpException(
        {
          message: "Unauthorized",
          error: {
            statusCode: 401,
            message: "Unauthorized",
          },
        },
        401,
      );
    }
  }
}
