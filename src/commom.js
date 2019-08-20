//防抖函数
export function debounce(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function() {
        method.call(context);
    }, 1000);
}

export function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function sleep(fn, ...args) {
    await timeout(3000);
    return fn(...args);
}
