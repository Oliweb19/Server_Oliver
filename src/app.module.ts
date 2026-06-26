import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { TasksModule } from './tasks/tasks.module';

/**
 * Módulo principal de la aplicación.
 * Registra el driver de Apollo para GraphQL, el resolver de prueba y el módulo de tareas.
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
  providers: [AppResolver],
})
export class AppModule {}
