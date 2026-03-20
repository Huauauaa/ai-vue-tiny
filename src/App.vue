<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { TreeMenu as TinyTreeMenu } from '@opentiny/vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

type MenuNode = {
  id: string
  label: string
  path: string
}

const menus: MenuNode[] = [
  { id: 'home', label: '首页', path: '/home' },
  { id: 'users', label: '用户页面', path: '/users' },
]

const route = useRoute()
const router = useRouter()
const treeMenuRef = ref<{ setCurrentKey?: (key: string) => void } | null>(null)

const currentMenuKey = computed(() => {
  const matched = menus.find((item) => route.path.startsWith(item.path))
  return matched?.id || menus[0].id
})

const syncCurrentMenu = () => {
  treeMenuRef.value?.setCurrentKey?.(currentMenuKey.value)
}

const handleMenuChange = (data: MenuNode) => {
  if (data?.path && data.path !== route.path) {
    void router.push(data.path)
  }
}

onMounted(syncCurrentMenu)
watch(() => route.path, syncCurrentMenu)
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <header class="flex h-14 items-center border-b border-slate-200 bg-white px-6">
      <h1 class="text-lg font-semibold">管理后台示例</h1>
    </header>

    <div class="flex min-h-[calc(100vh-56px)]">
      <aside class="w-56 border-r border-slate-200 bg-white p-4">
        <TinyTreeMenu
          ref="treeMenuRef"
          :data="menus"
          node-key="id"
          :show-filter="false"
          :menu-collapsible="false"
          :width-adapt="true"
          @current-change="handleMenuChange"
        />
      </aside>

      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
