# zod-innertube

`zod-innertube` is a slim wrapper for [Zod](https://npm.im/zod) to merge in a pure JSON Schema object.

### Installation

```
npm install --save zod-innertube
```

### Usage

```ts
import innertube from 'zod-innertube';

const schema = z.object({
  object: z.object({
    array: z.array(z.string()).default(['foo', 'bar']),
    bool: z.boolean().default(true),
  }),
});

console.log(
  innertube(schema, {
    properties: {
      object: {
        required: ['array', 'bool'],
      },
    },
  })
);
```

```json
{
  "type": "object",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "additionalProperties": false,
  "properties": {
    "object": {
      "type": "object",
      "required": ["array", "bool"],
      "additionalProperties": false,
      "properties": {
        "array": {
          "type": "array",
          "default": ["foo", "bar"],
          "items": { "type": "string" }
        },
        "bool": { "type": "boolean", "default": true }
      }
    }
  }
}
```

### Why?

For our usecase Zod does not support setting `required` on a deeply nested object, this library allows us to do that by augmenting a Zod schema with a pure JSON Schema schema and merging them together internally wit minimal boilerplate by way of an `allOf` and [json-schema-merge-allof](https://npm.im/json-schema-merge-allof).
