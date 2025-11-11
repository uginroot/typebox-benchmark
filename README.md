### Schemas used in the benchmark
```ts
const schemaWithCodec = Type.Object({
    name: Type.Codec(Type.String())
        .Decode((value) => value)
        .Encode((value) => value),
});
const schemaWithoutCodec = Type.Object({
    name: Type.String(),
});
```

### Result 100000 iterations with tsx

#### Benchmarking test: Small Object

| (index) | name                                 | duration (ms) | ops/sec   |
|---------|--------------------------------------|---------------|-----------|
| 0       | 'Compile check without codec'        | 1.77          | 56460301  |
| 1       | 'Compile check with codec'           | 1.95          | 51404552  |
| 2       | 'Compile decode without codec'       | 1.22          | 81791161  |
| 3       | 'Compile decode with codec'          | 5785.03       | **17286** |
| 4       | 'Value.Check check without codec'    | 1616.25       | 61872     |
| 5       | 'Value.Check check with codec'       | 1658.02       | 60313     |
| 6       | 'CustomDecoder decode without codec' | 2363.82       | 42304     |
| 7       | 'CustomDecoder decode with codec'    | 2224.29       | 44958     |

#### Benchmarking test: Big Object
| (index) | name                                 | duration (ms) | ops/sec  |
|---------|--------------------------------------|---------------|----------|
| 0       | 'Compile check without codec'        | 61.21         | 1633850  |
| 1       | 'Compile check with codec'           | 60.9          | 1641974  |
| 2       | 'Compile decode without codec'       | 57.56         | 1737339  |
| 3       | 'Compile decode with codec'          | 74228.67      | **1347** |
| 4       | 'Value.Check check without codec'    | 13066.99      | 7653     |
| 5       | 'Value.Check check with codec'       | 12864.36      | 7773     |
| 6       | 'CustomDecoder decode without codec' | 21677.29      | 4613     |
| 7       | 'CustomDecoder decode with codec'    | 22194.07      | 4506     |


### Result 100000 iterations with node

#### Benchmarking test: Small Object

| (index) | name                                 | duration (ms) | ops/sec    |
|---------|--------------------------------------|---------------|------------|
| 0       | 'Compile check without codec'        | 1.75          | 57235284   |
| 1       | 'Compile check with codec'           | 1.85          | 53911088   |
| 2       | 'Compile decode without codec'       | 1.17          | 85527542   |
| 3       | 'Compile decode with codec'          | 431.66        | **231662** |
| 4       | 'Value.Check check without codec'    | 100.37        | 996342     |
| 5       | 'Value.Check check with codec'       | 97.19         | 1028952    |
| 6       | 'CustomDecoder decode without codec' | 156.57        | 638696     |
| 7       | 'CustomDecoder decode with codec'    | 156.36        | 639555     |


#### Benchmarking test: Big Object

| (index) | name                                 | duration (ms) | ops/sec   |
|---------|--------------------------------------|---------------|-----------|
| 0       | 'Compile check without codec'        | 56.92         | 1757002   |
| 1       | 'Compile check with codec'           | 52.06         | 1920843   |
| 2       | 'Compile decode without codec'       | 52.02         | 1922312   |
| 3       | 'Compile decode with codec'          | 5509.57       | **18150** |
| 4       | 'Value.Check check without codec'    | 986.42        | 101377    |
| 5       | 'Value.Check check with codec'       | 981.71        | 101864    |
| 6       | 'CustomDecoder decode without codec' | 1742.89       | 57376     |
| 7       | 'CustomDecoder decode with codec'    | 1579.76       | 63301     |

