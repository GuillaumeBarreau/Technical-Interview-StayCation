
export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
}
