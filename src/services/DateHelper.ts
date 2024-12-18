export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);


  const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
  };
  
  const dateTimeString = date.toLocaleString('en-GB', options);
  return dateTimeString.replace(',', '');
}
