import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzasModule } from './pizzas/pizzas.module';
import FirstMiddleware from './middleware/first.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PizzasModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL')
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirstMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
