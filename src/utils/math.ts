export function posMod(a: number, b: number) {
    let x = a % b;
    if (x < 0) x += b;
    return x;
}