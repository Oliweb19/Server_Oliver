import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Interceptor de Logs basado en Programación Orientada a Aspectos (AOP).
 * Intercepta peticiones entrantes a resolvers de GraphQL para registrar:
 * - Operación y argumentos de entrada (Aspecto "Before").
 * - Tiempo de ejecución y éxito de la operación (Aspecto "After").
 * - Detalles del error en caso de excepciones (Aspecto "After Throwing").
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  /**
   * Logger integrado de NestJS con el contexto de GraphQL.
   */
  private readonly logger = new Logger('GraphQL');

  /**
   * Intercepta la llamada a un resolver o controlador.
   * @param context - Contexto de ejecución actual de NestJS.
   * @param next - Manejador de la llamada que permite continuar con la ejecución.
   * @returns Un observable que emite la respuesta del resolver.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();

    // Validar si la petición proviene de GraphQL
    if (!info) {
      // Manejar peticiones HTTP tradicionales de ser necesario
      const request = context.switchToHttp().getRequest();
      if (request) {
        const { method, url } = request;
        return next.handle().pipe(
          tap(() => {
            const duration = Date.now() - startTime;
            this.logger.log(`[AOP HTTP] ${method} ${url} - ${duration}ms`);
          }),
        );
      }
      return next.handle();
    }

    // Extraer detalles de la operación GraphQL
    const fieldName = info.fieldName;
    const parentType = info.parentType.name; // Query o Mutation
    const args = gqlContext.getArgs();

    // ASPECTO BEFORE: Registrar la intención de ejecución y los argumentos
    this.logger.log(
      `[AOP - Before] Ejecutando GraphQL ${parentType} "${fieldName}" con argumentos: ${JSON.stringify(args)}`,
    );

    // Retornar el flujo del manejador aplicando tuberías (pipes) de RxJS para interceptar la respuesta
    return next.handle().pipe(
      tap({
        // ASPECTO AFTER (Success): Éxito en la ejecución de la consulta o mutación
        next: () => {
          const duration = Date.now() - startTime;
          this.logger.log(
            `[AOP - After] GraphQL ${parentType} "${fieldName}" ejecutado exitosamente en ${duration}ms`,
          );
        },
        // ASPECTO AFTER THROWING (Error): Ocurrió un fallo en la ejecución
        error: (err: Error) => {
          const duration = Date.now() - startTime;
          this.logger.error(
            `[AOP - Exception] GraphQL ${parentType} "${fieldName}" falló después de ${duration}ms. Error: "${err.message}"`,
            err.stack,
          );
        },
      }),
    );
  }
}
