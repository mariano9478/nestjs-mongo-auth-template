import { Module } from "@nestjs/common";

import { ApplicationModule } from "@src/application/application.module";
import { DatabaseModule } from "@src/infrastructure/adapters/database.module";
import { UserContorller } from "@src/infrastructure/controllers/user.controller";
import { CurrentUserInterceptor } from "@src/infrastructure/interceptors/current-user.interceptor";

@Module({
  imports: [ApplicationModule, DatabaseModule],
  providers: [CurrentUserInterceptor],
  controllers: [UserContorller],
})
export class InfrastructureModule {}
