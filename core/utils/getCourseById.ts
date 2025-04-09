import type { Course } from '@mindenit/answers-kit'

export const getCourseById = (
  courses: Course[],
  courseId: number
): Course | null => {
  if (!courseId || !courses.length) return null
  return courses.find((c) => c.id === courseId) || null
}
