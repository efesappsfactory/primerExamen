import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComidaController } from './controladores/comida.controller';
import { IngredientesController } from './controladores/ingredientes.controller';
import { ComidaService } from './servicios/comida.service';
import { IngredientesService } from './servicios/ingredientes.service';
import { LogMiddleware } from './log/log.middleware';

@Module({
  imports: [],
  controllers: [
    AppController,
    ComidaController,
    IngredientesController],
  providers: [
    AppService,
    ComidaService,
    IngredientesService],
})
export class AppModule implements NestModule {

  nombreAplicacion = 'Primer Examen';
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LogMiddleware)
      .with(this.nombreAplicacion)
      .forRoutes(
        ComidaController,
        IngredientesController,
        AppController);
  }
}
