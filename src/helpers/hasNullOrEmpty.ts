type GenericObject = { [key: string]: any };

export const hasNullOrEmpty = (obj: GenericObject): boolean => {
    return Object.values(obj).some(value => value === null || value === "" || (typeof value === "string" && value.trim() === ""));
};
