import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Función principal para iniciar el servidor NestJS.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Iniciar la escucha en el puerto 3000
  await app.listen(3000);
  
  console.log(`=======================================================`);
  console.log(` Servidor escuchando en: http://localhost:3000/graphql`);
  console.log(`=======================================================`);
}

bootstrap().catch((err) => {
  console.error('Error al iniciar el servidor:', err);
});
