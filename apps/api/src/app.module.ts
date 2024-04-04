import { Module } from '@nestjs/common';
import { AppController } from '~/app.controller';
import { AppService } from '~/app.service';
import { MikroOrmModule } from "@mikro-orm/nestjs";
import ormConfig from "~/orm";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...ormConfig,
      tsNode: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
