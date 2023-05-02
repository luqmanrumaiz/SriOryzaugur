import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
    // Tailwind config
    return resolveConfig('../tailwind.config.js')
}

export const hexToRGB = (h) => {
    let r = 0;
    let g = 0;
    let b = 0;
    if (h.length === 4) {
        r = `0x${h[1]}${h[1]}`;
        g = `0x${h[2]}${h[2]}`;
        b = `0x${h[3]}${h[3]}`;
    } else if (h.length === 7) {
        r = `0x${h[1]}${h[2]}`;
        g = `0x${h[3]}${h[4]}`;
        b = `0x${h[5]}${h[6]}`;
    }
    return `${+r},${+g},${+b}`;
};

export const formatDate = (dateValue) => {
    const date = new Date(dateValue);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const formatLKR = (value) => {
    return `₨ ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
