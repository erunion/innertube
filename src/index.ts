import type { ZodType } from 'zod';

import mergeAllOf from 'json-schema-merge-allof';
import { zodToJsonSchema } from 'zod-to-json-schema';

export default function innertube(zod: ZodType, schema = {}) {
  return mergeAllOf({
    allOf: [zodToJsonSchema(zod), schema],
  });
}
