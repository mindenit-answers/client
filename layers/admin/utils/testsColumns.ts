import type { Test } from '@mindenit/answers-kit'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { ArrowUpDown } from 'lucide-vue-next'
import Button from '@/core/components/ui/button/Button.vue'
import AdminDataTableMenu from '../components/DataTableMenu.vue'
import { AdminTestsForm } from '#components'

export const testsColumns = (
  onDelete?: (id: string) => void
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
        () => ['ID', h(ArrowUpDown, { class: 'w-4 h-4' })]
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
        () => ['Назва', h(ArrowUpDown, { class: 'w-4 h-4' })]
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
        () => ['Рік', h(ArrowUpDown, { class: 'w-4 h-4' })]
      )
    },
    cell: ({ row }) => {
      const year = row.getValue('year') as string
      return h('div', { class: 'truncate max-w-xs', title: year }, year)
    },
  },
  {
    accessorKey: 'subjectId',
    header: 'Предмет',
    cell: ({ row }) => {
      const subjectId = row.getValue('subjectId') as string
      return h(
        'div',
        { class: 'truncate max-w-xs', title: subjectId },
        subjectId
      )
    },
  },
  {
    accessorKey: 'courseId',
    header: 'Курс',
    cell: ({ row }) => {
      const courseId = row.getValue('courseId') as string
      return h('div', { class: 'truncate max-w-xs', title: courseId }, courseId)
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
