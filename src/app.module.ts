import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';

/**
 * Módulo principal de la aplicación.
 * Registra el driver de Apollo para GraphQL y el resolver de prueba.
 */
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, // Habilitar Playground para interactuar con la API
    }),
  ],
  providers: [AppResolver],
})
export class AppModule {}
