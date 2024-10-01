export function getDaysOfWeek(
    baseDate = new Date(Date.UTC(2024, 0, 8)), // 2024-01-08 is a Monday
    locale = 'fr-FR',
    format: 'long' | 'short' | 'narrow' = 'long',
) {
    return Array.from({ length: 7 }, (_, i) => {
        const currentDate = new Date(baseDate);
        currentDate.setDate(baseDate.getDate() + i);
        return new Intl.DateTimeFormat(locale, { weekday: format }).format(currentDate);
    });
}
