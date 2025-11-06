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

| (index) | name                   | duration (ms) | ops/sec   |
|---------|------------------------|---------------|-----------|
| 0       | 'check without codec'  | 1.58          | 63392125  |
| 1       | 'check with codec'     | 1.63          | 61248314  |
| 2       | 'decode without codec' | 0.94          | 106387845 |
| 3       | 'decode with codec'    | 5697.65       | 17551     |

### Result 100000 iterations with node


| (index) | name                   | duration (ms) | ops/sec  |
|---------|------------------------|---------------|----------|
| 0       | 'check without codec'  | 1.65          | 60484871 |
| 1       | 'check with codec'     | 1.63          | 61356394 |
| 2       | 'decode without codec' | 1.01          | 98885266 |
| 3       | 'decode with codec'    | 417.85        | 239322   |

