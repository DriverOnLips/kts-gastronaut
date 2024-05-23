export function debounce<T extends (...args: any[]) => any>(
	func: T,
	delay: number,
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return (...args: Parameters<T>): void => {
		const later = () => {
			timeoutId = undefined;
			func(...args);
		};

		if (timeoutId !== undefined) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(later, delay);
	};
}
