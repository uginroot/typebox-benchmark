import {Type} from 'typebox';
import {Compile} from 'typebox/compile';

const schemaWithCodec = Type.Object({
    name: Type.Codec(Type.String())
        .Decode((value) => value)
        .Encode((value) => value),
});
const validatorWithCodec = Compile(schemaWithCodec);

const schemaWithoutCodec = Type.Object({
    name: Type.String(),
});
const validatorWithoutCodec = Compile(schemaWithoutCodec);


const testData = {
    name: 'John Doe',
};


function benchmark(name: string, fn: () => void): { name: string; "duration (ms)": number; "ops/sec": number } {
    const iterations = 100_000;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
        fn();
    }

    const end = performance.now();
    const duration = end - start;
    const opsSec = Math.round((iterations / duration) * 1000);

    return { name, "duration (ms)": Number(duration.toFixed(2)), "ops/sec": opsSec };
}

console.table([
    benchmark("check without codec", () => validatorWithoutCodec.Check(testData)),
    benchmark("check with codec", () => validatorWithCodec.Check(testData)),
    benchmark("decode without codec", () => validatorWithoutCodec.Decode(testData)),
    benchmark("decode with codec", () => validatorWithCodec.Decode(testData)),
]);

