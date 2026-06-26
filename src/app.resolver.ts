import { Resolver, Query } from '@nestjs/graphql';

/**
 * Resolver de prueba para inicializar la API GraphQL.
 */
@Resolver()
export class AppResolver {
  /**
   * Consulta de prueba que devuelve un saludo.
   * @returns Un saludo en formato string.
   */
  @Query(() => String)
  hello(): string {
    return '¡Hola! Servidor NestJS + GraphQL configurado correctamente.';
  }
}
