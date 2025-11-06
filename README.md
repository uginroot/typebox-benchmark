### Schemas used in the benchmark
```ts
const schemaWithCodec = Type.Object({
    info: Type.Object({
        name: Type.Codec(Type.String())
            .Decode((value) => value)
            .Encode((value) => value),
    }),
});
const schemaWithoutCodec = Type.Object({
    info: Type.Object({
        name: Type.String(),
    }),
});
```

### Result 100000 iterations with tsx

| (index) | name                   | duration (ms) | ops/sec  |
|---------|------------------------|---------------|----------|
| 0       | check without codec    | 1.75          | 57123598 |
| 1       | check with codec       | 1.8           | 55493064 |
| 2       | decode without codec   | 1.03          | 97115005 |
| 3       | decode with codec      | 8843.97       | 11307    |

### Result 100000 iterations with node


| (index) | name                   | duration (ms) | ops/sec  |
|---------|------------------------|---------------|----------|
| 0       | check without codec    | 1.78          | 56253062 |
| 1       | check with codec       | 1.85          | 53914547 |
| 2       | decode without codec   | 1.19          | 84161128 |
| 3       | decode with codec      | 659.33        | 151670   |
