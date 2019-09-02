export function getRandomInt(min: number, max: number): number {
    const fmin = Math.ceil(min);
    const fmax = Math.floor(max);
    return Math.floor(Math.random() * (fmax - fmin)) + fmin;
}
