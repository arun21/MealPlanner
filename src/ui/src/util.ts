export function range(start: number, count: number): number[] {
    return Array.apply(0, Array(count))
        .map(function (element, index) {
            return index + start;
        });
}