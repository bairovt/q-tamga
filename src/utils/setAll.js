export const setAll = (obj, val) => Object.keys(obj).forEach(key => obj[key] = val);

export const setNull = obj => setAll(obj, null);
