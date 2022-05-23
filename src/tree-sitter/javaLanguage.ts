import { GeneratedExpression } from '@cucumber/cucumber-expressions'

import { TreeSitterLanguage } from './types.js'

export const javaLanguage: TreeSitterLanguage = {
  defineParameterTypeQueries: [
    `
(method_declaration 
  (modifiers 
    (annotation 
      name: (identifier) @annotation-name 
      arguments: (annotation_argument_list
        [
          (string_literal) @expression
        ]
      )
    )
  )
  name: (identifier) @name
  (#eq? @annotation-name "ParameterType")
)
    `,
    `
(method_declaration 
  (modifiers 
    (annotation 
      name: (identifier) @annotation-name 
      arguments: (annotation_argument_list
        [
          (
            (element_value_pair
              key: (identifier) @name-key
              value: (string_literal) @name
            )
            (element_value_pair
              key: (identifier) @value-key
              value: (string_literal) @expression
            )
          )
          (
            (element_value_pair
              key: (identifier) @value-key
              value: (string_literal) @expression
            )
            (element_value_pair
              key: (identifier) @name-key
              value: (string_literal) @name
            )
          )
        ]
      )
    )
  )
  (#eq? @annotation-name "ParameterType")
  (#eq? @name-key "name")
  (#eq? @value-key "value")
)
`,
  ],
  defineStepDefinitionQueries: [
    `
(method_declaration 
  (modifiers 
    (annotation 
      name: (identifier) @annotation-name 
      arguments: (annotation_argument_list
        [
          (string_literal) @expression
        ]
      )
    )
  )
  (#match? @annotation-name "Given|When|Then")
)
`,
  ],

  toStringOrRegExp(s: string): string | RegExp {
    const match = s.match(/^"(\^.*\$)"$/)
    if (match) return new RegExp(match[1])
    return s.substring(1, s.length - 1)
  },

  types: {
    int: 'int',
    float: 'float',
    word: 'String',
    string: 'String',
    double: 'double',
    bigdecimal: 'java.math.BigDecimal',
    byte: 'byte',
    short: 'short',
    long: 'long',
    biginteger: 'java.math.BigInteger',
    '': 'Object',
  },
  names: {
    int: 'i',
    float: 'f',
    word: 'word',
    string: 's',
    double: 'd',
    bigdecimal: 'bigDecimal',
    byte: 'b',
    short: 's',
    long: 'l',
    biginteger: 'bigInt',
    '': 'arg',
  },
}
