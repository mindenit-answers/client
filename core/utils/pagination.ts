import { PAGE_SIZE } from '../constants'

export const getPagesCount = (total: number | undefined) => {
  return (total ?? 0) / PAGE_SIZE
}
