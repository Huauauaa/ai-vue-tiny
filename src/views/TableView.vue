<script setup lang="ts">
import { computed, ref } from 'vue'

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

const totalPages = computed(() => Math.ceil(tableData.length / pageSize))

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return tableData.slice(start, start + pageSize)
})

const goPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="mb-4 text-xl font-semibold">表格页面</h2>

    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse text-sm">
        <thead>
          <tr class="bg-slate-50 text-left">
            <th class="border border-slate-200 px-3 py-2">ID</th>
            <th class="border border-slate-200 px-3 py-2">姓名</th>
            <th class="border border-slate-200 px-3 py-2">部门</th>
            <th class="border border-slate-200 px-3 py-2">绩效分</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in pagedData" :key="row.id" class="hover:bg-slate-50">
            <td class="border border-slate-200 px-3 py-2">{{ row.id }}</td>
            <td class="border border-slate-200 px-3 py-2">{{ row.name }}</td>
            <td class="border border-slate-200 px-3 py-2">{{ row.department }}</td>
            <td class="border border-slate-200 px-3 py-2">{{ row.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex items-center justify-end gap-2">
      <button
        class="rounded border border-slate-300 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="goPage(currentPage - 1)"
      >
        上一页
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        class="rounded border px-3 py-1 text-sm"
        :class="
          page === currentPage
            ? 'border-blue-500 bg-blue-50 text-blue-600'
            : 'border-slate-300 hover:bg-slate-50'
        "
        @click="goPage(page)"
      >
        {{ page }}
      </button>
      <button
        class="rounded border border-slate-300 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="currentPage === totalPages"
        @click="goPage(currentPage + 1)"
      >
        下一页
      </button>
    </div>
  </section>
</template>
