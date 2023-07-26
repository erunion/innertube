import { z } from 'zod';

import innertube from '../src';

describe('innertube', () => {
  it('should support merging into a zod object', () => {
    const schema = z
      .object({
        object: z.object({
          array: z.array(z.string()).default(['foo', 'bar']),
          bool: z.boolean().default(true),
        }),
      })
      .deepPartial();

    expect(
      innertube(schema, {
        properties: {
          object: {
            required: ['array', 'bool'],
          },
        },
      })
    ).toStrictEqual({
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      additionalProperties: false,
      properties: {
        object: {
          type: 'object',
          additionalProperties: false,
          properties: {
            array: {
              type: 'array',
              default: ['foo', 'bar'],
              items: { type: 'string' },
            },
            bool: { type: 'boolean', default: true },
          },
          required: ['array', 'bool'],
        },
      },
    });
  });

  it('should support merging into a zod array', () => {
    const schema = z.array(z.string()).default(['foo', 'bar']);

    expect(
      innertube(schema, {
        minItems: 1,
      })
    ).toStrictEqual({
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'array',
      items: { type: 'string' },
      default: ['foo', 'bar'],
      minItems: 1,
    });
  });

  it('should support not supplying a schema to merge', () => {
    const schema = z.boolean().default(true);
    expect(innertube(schema)).toStrictEqual({
      $schema: 'http://json-schema.org/draft-07/schema#',
      default: true,
      type: 'boolean',
    });
  });
});
