import type { Subject } from '@mindenit/answers-kit'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { ArrowUpDown } from 'lucide-vue-next'
import Button from '@/core/components/ui/button/Button.vue'
import AdminDataTableMenu from '../components/DataTableMenu.vue'
import { AdminSubjectsForm } from '#components'

export const subjectsColumns = (
  onDelete?: (id: string) => void,
  getFacultyName?: (testId: number | string) => string | number
): ColumnDef<Subject>[] => [
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
    accessorKey: 'brief',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Коротка назва', h(ArrowUpDown, { class: 'w-4 h-4' })]
      )
    },
    cell: ({ row }) => {
      const brief = row.getValue('brief') as string
      return h('div', { class: 'truncate max-w-xs', title: brief }, brief)
    },
  },
  {
    accessorKey: 'facultyId',
    header: 'Факультет',
    cell: ({ row }) => {
      const facultyId = row.getValue('facultyId') as string
      const name = getFacultyName
        ? getFacultyName(facultyId as string | number)
        : facultyId

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
          'dialog-content': (props: { item: Subject }) =>
            h(AdminSubjectsForm, {
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
