export function getRandomID(num) {
    var results = ''
    const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const poolLength = pool.length
    for(let i=0; i < num; i++) {
        const char = pool.charAt(Math.floor(Math.random() * poolLength))
        results += char
    }

    return results
}