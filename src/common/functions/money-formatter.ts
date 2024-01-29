export function moneyFormatter(value: number, currency: string): string {
    const options = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      };
    
      const formattedNumber = value.toLocaleString('es-CL', options);
    
      return `${currency}${formattedNumber}`;
}