import { getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';

export const generateSpec = (options: RoutingControllersOptions) => {
  // Convert validation metadata to OpenAPI schemas
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  });

  // Generate OpenAPI spec
  const storage = getMetadataArgsStorage();
  // @ts-ignore
  return routingControllersToSpec(storage, options, { components: { schemas } });
};
