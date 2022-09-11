export function fetchCount(amount = 1): Promise<{ data: number }> {
    return new Promise((resolve) =>
        setTimeout(() => resolve({ data: amount }), 500)
    );
}
