// wherein we build a wee little reader for turning a string into a keypath array
// here be dragons: gigo
module.exports = v => {
    if (Array.isArray(v)) return [ ...v ];
    const chars = v.split('');
    const result = [ '' ];
    let i = 0;
    while (i < chars.length) {
        if (chars[i] === '.') {
            result.push('');
            i++;
            continue;
        }
        if (chars[i] === ']') {
            i++;
            continue;
        }
        if (chars[i] === '[') {
            i++;
            let value = '';
            if ([ "'", '"' ].includes(chars[i])) {
                const q = chars[i++];
                while (chars[i] !== q) value += chars[i++];
                i++;
                result.push(value);
                continue;
            }
            if (/[0-9]/.test(chars[i])) {
                while (chars[i] !== ']') value += chars[i++];
                result.push(+value);
                continue;
            }
            while (chars[i] !== ']') value += chars[i++];
            result.push(value);
            continue;
        }
        result[result.length - 1] += chars[i];
        i++;
    }
    return result;
};
