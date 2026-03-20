<script setup lang="ts">
import { computed, ref } from 'vue'
import { Table as TinyTable, Pager as TinyPager } from '@opentiny/vue'

type UserRow = {
  id: number
  name: string
  department: string
  score: number
}

const pageSize = 5
const currentPage = ref(1)

const tableData: UserRow[] = Array.from({ length: 26 }, (_, idx) => ({
  id: idx + 1,
  name: `用户${idx + 1}`,
  department: ['研发', '产品', '设计', '运营'][idx % 4],
  score: 60 + ((idx * 7) % 41),
}))

const tableColumns = [
  { title: 'ID', field: 'id', width: 90 },
  { title: '姓名', field: 'name', width: 160 },
  { title: '部门', field: 'department', width: 140 },
  { title: '绩效分', field: 'score', width: 120 },
]

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return tableData.slice(start, start + pageSize)
})

const handleCurrentChange = (page: number) => {
  currentPage.value = page
}
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="mb-4 text-xl font-semibold">表格页面</h2>

    <TinyTable :columns="tableColumns" :data="pagedData" width="100%" />

    <TinyPager
      class="mt-4"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="tableData.length"
      layout="prev, pager, next, jumper, total"
      @current-change="handleCurrentChange"
    />
  </section>
</template>
