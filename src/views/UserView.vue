<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { Pager as TinyPager, Table as TinyTable } from '@opentiny/vue'

type ApiUser = {
  id: number
  name: string
  username: string
  email: string
  company: {
    name: string
  }
}

type UserRow = {
  id: number
  name: string
  username: string
  email: string
  company: string
}

const pageSize = 5
const currentPage = ref(1)
const totalUsers = ref(0)
const loading = ref(false)
const errorMessage = ref('')
const users = ref<UserRow[]>([])

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
})

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
    const { data, headers } = await api.get<ApiUser[]>('/users', {
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

    <p v-if="loading" class="text-sm text-slate-500">正在加载用户数据...</p>
    <p v-else-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>

    <template v-else>
      <TinyTable :columns="tableColumns" :data="users" width="100%" />

      <TinyPager
        class="mt-4"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalUsers"
        layout="prev, pager, next, jumper, total"
        @current-change="handleCurrentChange"
      />
    </template>
  </section>
</template>
