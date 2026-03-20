<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Pager as TinyPager, Table as TinyTable } from '@opentiny/vue'
import { http } from '../api/http'
import type { UserTypes } from '../types/user'

const pageSize = 5
const currentPage = ref(1)
const totalUsers = ref(0)
const loading = ref(false)
const errorMessage = ref('')
const users = ref<UserTypes.UserRow[]>([])

const tableColumns = [
  { title: 'ID', field: 'id', width: 80 },
  { title: '姓名', field: 'name', width: 180 },
  { title: '用户名', field: 'username', width: 150 },
  { title: '邮箱', field: 'email', width: 260, showOverflow: true },
  { title: '公司', field: 'company', width: 180, showOverflow: true },
]

const fetchUsers = async (page = currentPage.value) => {
  loading.value = true
  errorMessage.value = ''

  try {
    const { data, headers } = await http.get<UserTypes.ApiUser[]>('/users', {
      params: {
        _page: page,
        _limit: pageSize,
      },
    })

    const totalCount = Number(headers['x-total-count'])
    totalUsers.value = Number.isFinite(totalCount) && totalCount > 0 ? totalCount : data.length
    users.value = data.map((item) => ({
      id: item.id,
      name: item.name,
      username: item.username,
      email: item.email,
      company: item.company?.name ?? '-',
    }))
    currentPage.value = page
  } catch {
    errorMessage.value = '用户数据加载失败，请稍后重试。'
    totalUsers.value = 0
    users.value = []
  } finally {
    loading.value = false
  }
}

const handleCurrentChange = (page: number) => {
  void fetchUsers(page)
}

onMounted(() => {
  void fetchUsers()
})
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="mb-4 text-xl font-semibold">用户页面</h2>

    <p v-if="errorMessage" class="mb-3 text-sm text-red-500">{{ errorMessage }}</p>

    <div
      v-loading="loading"
      tiny-loading__text="正在加载用户数据..."
      class="min-h-[220px]"
    >
      <TinyTable :columns="tableColumns" :data="users" width="100%" />

      <TinyPager
        class="mt-4"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalUsers"
        layout="prev, pager, next, jumper, total"
        @current-change="handleCurrentChange"
      />
    </div>
  </section>
</template>
