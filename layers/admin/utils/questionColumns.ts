import type { Question } from '@mindenit/answers-kit'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { Badge } from '@/core/components/ui/badge'
import Button from '@/core/components/ui/button/Button.vue'
import AdminDataTableMenu from '../components/DataTableMenu.vue'
import AdminQuestionsForm from '../components/QuestionsForm.vue'
import { Icon } from '#components'

export const questionColumns = (
  onDelete?: (id: string) => void,
  getTestName?: (testId: number | string) => string | number
): ColumnDef<Question>[] => [
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
          'Питання',
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
    accessorKey: 'answer',
    header: 'Відповідь',
    cell: ({ row }) => {
      const answer = row.getValue('answer') as string
      return h(
        'div',
        {
          class: 'truncate max-w-xs whitespace-pre-line',
          title: answer,
        },
        answer
      )
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
    accessorKey: 'testId',
    header: 'Тест',
    cell: ({ row }) => {
      const testId = row.getValue('testId')
      const testName = getTestName
        ? getTestName(testId as string | number)
        : testId

      return h(
        'div',
        {
          class: 'truncate max-w-xs',
          title: String(testName),
        },
        String(testName)
      )
    },
    size: 80,
  },
  {
    id: 'actions',
    header: 'Дії',
    cell: ({ row }) => {
      const question = row.original

      const handleDelete = onDelete || (() => {})

      return h(
        AdminDataTableMenu,
        {
          item: { ...question, id: String(question.id) },
          onDelete: (id) => handleDelete(id),
        },
        {
          'dialog-content': (props: { item: Question }) =>
            h(AdminQuestionsForm, {
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
