export const useHighlight = () => {
  function highlightText(text: string, query: string): string {
    if (!query || !text) return text

    const escapeRegExp = (str: string) =>
      str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const escapedQuery = escapeRegExp(query)

    const regex = new RegExp(`(${escapedQuery})`, 'gi')
    return text.replace(regex, '<mark class="bg-royal-blue-500">$1</mark>')
  }

  return {
    highlightText,
  }
}
