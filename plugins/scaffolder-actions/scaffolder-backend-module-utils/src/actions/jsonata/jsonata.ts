/*
 * Copyright 2022 Larder Software Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { createTemplateAction } from '@backstage/plugin-scaffolder-backend';
import jsonata from 'jsonata';

export function createJSONataAction() {
  return createTemplateAction<{
    data: any;
    expression: string;
  }>({
    id: 'roadiehq:utils:jsonata',
    description:
      'Allows performing jsonata opterations and transformations on objects',
    schema: {
      input: {
        type: 'object',
        required: ['data', 'expression'],
        properties: {
          data: {
            title: 'Data',
            description: 'Input data to perform JSONata expression.',
            type: 'object',
          },
          expression: {
            title: 'Expression',
            description: 'JSONata expression to perform on the input',
            type: 'string',
          },
        },
      },
      output: {
        type: 'object',
        properties: {
          result: {
            title: 'Output result from JSONata',
            type: 'object',
          },
        },
      },
    },
    async handler(ctx) {
      const expression = jsonata(ctx.input.expression);
      const result = expression.evaluate(ctx.input.data);

      ctx.output('result', result);
    },
  });
}
