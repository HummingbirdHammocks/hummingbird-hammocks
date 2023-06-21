export function convertToPlain(html) {
  if (!html) return '';

  var strippedHtml = html.replace(/<[^>]+>/g, '');

  // Retrieve the text property of the element
  return strippedHtml;
}

export function truncateText(input, maxLength = 155) {
  if (input.length <= maxLength) {
    return input;
  }
  return input.substring(0, maxLength) + '...';
}
