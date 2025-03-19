export const PAGE_SIZE = 25

export const getPagesCount = (total: number | undefined) => {
  return (total ?? 0) / PAGE_SIZE
}
