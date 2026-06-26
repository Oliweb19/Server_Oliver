import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { TasksModule } from './tasks/tasks.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

/**
 * Módulo principal de la aplicación.
 * Registra el driver de Apollo para GraphQL, el resolver de prueba, el módulo de tareas
 * y el interceptor global de logs usando AOP.
 */
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, // Habilitar Playground para interactuar con la API
    }),
    TasksModule,
  ],
  providers: [
    AppResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
