export const count = (acc: any, value: any) => {
    acc[value] = 1 + (acc[value] ?? 0)
    return acc
}

export const objToDf = (obj: any) => {
    return Object.entries(obj).map(([key, value]) => ({key, value}));
}