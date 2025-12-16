/**
 * Takes the mod but the result is between 0 and n-1
 * 
 * @param a The number to be reduced
 * @param n The modulus
 * @returns The positive mod
 */
export function posMod(a: number, n: number) {
    let x = a % n;
    if (x < 0) x += n;
    return x;
}