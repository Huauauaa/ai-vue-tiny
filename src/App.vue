<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const menus = [
  { label: '首页', to: '/home' },
  { label: '表格页面', to: '/table' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <header class="flex h-14 items-center border-b border-slate-200 bg-white px-6">
      <h1 class="text-lg font-semibold">管理后台示例</h1>
    </header>

    <div class="flex min-h-[calc(100vh-56px)]">
      <aside class="w-56 border-r border-slate-200 bg-white p-4">
        <nav class="flex flex-col gap-2">
          <RouterLink
            v-for="menu in menus"
            :key="menu.to"
            :to="menu.to"
            class="rounded-md px-3 py-2 text-sm hover:bg-slate-100"
            active-class="bg-blue-50 font-medium text-blue-600"
          >
            {{ menu.label }}
          </RouterLink>
        </nav>
      </aside>

      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
