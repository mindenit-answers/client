import type { Course } from '@mindenit/answers-kit'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import Button from '@/core/components/ui/button/Button.vue'
import AdminDataTableMenu from '../components/DataTableMenu.vue'
import { AdminCoursesForm, Icon } from '#components'

export const coursesColumns = (
  onDelete?: (id: string) => void
): ColumnDef<Course>[] => [
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
    accessorKey: 'number',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => [
          'Номер курсу',
          h(Icon, { name: 'lucide:arrow-down-up', class: 'size-4' }),
        ]
      )
    },
    cell: ({ row }) => {
      const number = row.getValue('number') as string
      return h('div', { class: 'truncate max-w-xs', title: number }, number)
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
          'dialog-content': (props: { item: Course }) =>
            h(AdminCoursesForm, {
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
