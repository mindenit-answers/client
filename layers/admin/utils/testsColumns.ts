import type { Test } from '@mindenit/answers-kit'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import Button from '@/core/components/ui/button/Button.vue'
import AdminDataTableMenu from '../components/DataTableMenu.vue'
import { AdminTestsForm, Icon } from '#components'
import Badge from '~/core/components/ui/badge/Badge.vue'

export const testsColumns = (
  onDelete?: (id: string) => void,
  getSubjectName?: (testId: number | string) => string | number,
  getCourseName?: (testId: number | string) => string | number
): ColumnDef<Test>[] => [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['ID', h(Icon, { name: 'lucide:arrow-down-up', class: 'size-4' })]
      )
    },
    cell: ({ row }) => {
      const id = row.getValue('id') as string
      return h('div', { class: 'truncate max-w-xs', title: id }, id)
    },
    size: 80,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => [
          'Назва',
          h(Icon, { name: 'lucide:arrow-down-up', class: 'size-4' }),
        ]
      )
    },
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      return h('div', { class: 'truncate max-w-xs', title: name }, name)
    },
  },
  {
    accessorKey: 'year',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => [
          'Рік',
          h(Icon, { name: 'lucide:arrow-down-up', class: 'size-4' }),
        ]
      )
    },
    cell: ({ row }) => {
      const year = row.getValue('year') as string
      return h('div', { class: 'truncate max-w-xs', title: year }, year)
    },
  },
  {
    accessorKey: 'isVerified',
    header: 'Статус',
    cell: ({ row }) => {
      const isVerified = row.getValue('isVerified') as boolean
      return h(
        Badge,
        {
          variant: isVerified ? 'success' : 'outline',
        },
        () => (isVerified ? 'Верифіковано' : 'Не верифіковано')
      )
    },
    size: 100,
  },
  {
    accessorKey: 'subjectId',
    header: 'Предмет',
    cell: ({ row }) => {
      const subjectId = row.getValue('subjectId') as string
      const name = getSubjectName
        ? getSubjectName(subjectId as string | number)
        : subjectId

      return h('div', { class: 'truncate max-w-xs', title: name }, name)
    },
  },
  {
    accessorKey: 'courseId',
    header: 'Курс',
    cell: ({ row }) => {
      const courseId = row.getValue('courseId') as string
      const name = getCourseName
        ? getCourseName(courseId as string | number)
        : courseId
      return h('div', { class: 'truncate max-w-xs', title: name }, name)
    },
  },
  {
    id: 'actions',
    header: 'Дії',
    cell: ({ row }) => {
      const data = row.original

      const handleDelete = onDelete || (() => {})

      return h(
        AdminDataTableMenu,
        {
          item: { ...data, id: String(data.id) },
          onDelete: (id) => handleDelete(id),
        },
        {
          'dialog-content': (props: { item: Test }) =>
            h(AdminTestsForm, {
              mode: 'edit',
              entityId: String(props.item.id),
              initialValues: props.item,
            }),
        }
      )
    },
    size: 80,
  },
]
