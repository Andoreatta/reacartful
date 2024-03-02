export function getCookie(key: string) {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith(key + '='));
    if (!cookie) return null;
    return cookie.split('=')[1];
}

export function currencyFormat(amount: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount / 100);
}