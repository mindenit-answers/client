<script setup lang="ts" generic="TData, TValue">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/vue-table'
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table'
import { valueUpdater } from '@/core/utils'

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filterBy: keyof TData
    filterPlaceholder: string
    emptyMessage?: string
  }>(),
  { emptyMessage: 'Результатів немає' }
)

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const isDialogOpen = ref(false)

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
  },
})

const closeDialog = () => {
  isDialogOpen.value = false
}

provide('dataTableActions', {
  closeDialog,
})
</script>

<template>
  <div class="flex max-sm:flex-col items-center gap-2 overflow-hidden">
    <div class="relative w-full items-center">
      <Input
        id="search"
        type="text"
        :placeholder="filterPlaceholder"
        class="pl-10"
        autofocus
        :model-value="table.getColumn(filterBy as string)?.getFilterValue() as string"
        @update:model-value="
          table.getColumn(filterBy as string)?.setFilterValue($event)
        "
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Icon name="lucide:search" class="size-6 text-muted-foreground" />
      </span>
    </div>

    <div class="grid md:w-sm w-full grid-cols-2 gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline">
            Колонки
            <Icon class="w-4 h-4 ml-2" name="lucide:chevron-down" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            v-for="column in table
              .getAllColumns()
              .filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :model-value="column.getIsVisible()"
            @update:model-value="
              (value) => {
                column.toggleVisibility(!!value)
              }
            "
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <template v-if="$slots">
        <Dialog v-model:open="isDialogOpen">
          <DialogTrigger as-child>
            <Button class="w-full">
              <Icon class="w-4 h-4 ml-2" name="lucide:plus" />
              Додати
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Додати</DialogTitle>
              <DialogDescription> Додайте новий запис </DialogDescription>
            </DialogHeader>
            <slot name="header" :close-dialog="closeDialog" />
          </DialogContent>
        </Dialog>
      </template>
    </div>
  </div>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              {{ emptyMessage }}
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
  <div class="flex max-md:flex-col gap-2 items-center justify-between px-2">
    <div class="flex items-center space-x-2">
      <p class="text-sm font-medium">Строк на сторінці</p>
      <Select
        :model-value="`${table.getState().pagination.pageSize}`"
        @update:model-value="(value) => table.setPageSize(Number(value))"
      >
        <SelectTrigger class="h-8 w-[70px]">
          <SelectValue
            :placeholder="`${table.getState().pagination.pageSize}`"
          />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectItem
            v-for="pageSize in [10, 20, 30, 40, 50]"
            :key="pageSize"
            :value="`${pageSize}`"
          >
            {{ pageSize }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div class="flex items-center justify-center text-sm font-medium">
      Сторінка {{ table.getState().pagination.pageIndex + 1 }} з
      {{ table.getPageCount() }}
    </div>
    <div class="flex items-center space-x-2">
      <Button
        variant="outline"
        class="w-8 h-8 p-0"
        :disabled="!table.getCanPreviousPage()"
        @click="table.setPageIndex(0)"
      >
        <Icon class="size-4" name="lucide:chevrons-left" />
      </Button>
      <Button
        variant="outline"
        class="w-8 h-8 p-0"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        <Icon class="size-4" name="lucide:chevron-left" />
      </Button>
      <Button
        variant="outline"
        class="w-8 h-8 p-0"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        <Icon class="size-4" name="lucide:chevron-right" />
      </Button>
      <Button
        variant="outline"
        class="w-8 h-8 p-0"
        :disabled="!table.getCanNextPage()"
        @click="table.setPageIndex(table.getPageCount() - 1)"
      >
        <Icon class="size-4" name="lucide:chevrons-right" />
      </Button>
    </div>
  </div>
</template>
