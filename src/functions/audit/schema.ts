export default {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    audit: {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              created: { type: "string" },
              userId: { type: "string" },
              action: { type: "string" },
              url: { type: "string" },
              payload: {
                type: "object",
                properties: {
                  itemId: { type: "string" },
                  amount: { type: "integer" }
                },
                required: [ "itemId", "amount" ] }
            },
            required: [ "created", "userId", "action", "url" ] },
          default: []
        }
      },
      required: [
        "items"
      ]
    }
  },
  required: [ "audit" ]
} as const;
