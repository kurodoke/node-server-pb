export default function randomInt(start: number, end: number) {
    if (start > end) {
        [start, end] = [end, start];
    }

    const range = end - start + 1;

    return Math.floor(Math.random() * range) + start;
}