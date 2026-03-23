<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { http } from '../api/http'

const loading = ref(false)
const errorMessage = ref('')
const photos = ref<HomeTypes.PhotoCard[]>([])

const skeletonCount = 16

const visiblePhotos = computed(() => photos.value)

const getRowSpan = (id: number) => 24 + (id % 8) * 4

const fetchPhotos = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const { data } = await http.get<HomeTypes.ApiPhoto[]>('/photos', {
      params: {
        _limit: 56,
      },
    })

    photos.value = data.map((item) => ({
      ...item,
      rowSpan: getRowSpan(item.id),
    }))
  } catch {
    errorMessage.value = '照片加载失败，请稍后重试。'
    photos.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void fetchPhotos()
})
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold">首页照片墙</h2>
        <p class="mt-1 text-sm text-slate-600">数据来源：jsonplaceholder 的 photos 接口</p>
      </div>
      <button
        type="button"
        class="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        @click="fetchPhotos"
      >
        刷新
      </button>
    </div>

    <p v-if="errorMessage" class="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
      {{ errorMessage }}
    </p>

    <div v-if="loading" class="photo-wall">
      <div
        v-for="item in skeletonCount"
        :key="item"
        class="skeleton-card animate-pulse"
        :style="{ gridRow: `span ${20 + ((item * 3) % 10) * 3}` }"
      />
    </div>

    <div v-else class="photo-wall">
      <article
        v-for="photo in visiblePhotos"
        :key="photo.id"
        class="photo-card"
        :style="{ gridRow: `span ${photo.rowSpan}` }"
      >
        <img :src="photo.url" :alt="photo.title" loading="lazy" />
        <div class="photo-mask">
          <p class="line-clamp-2">{{ photo.title }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.photo-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-auto-rows: 8px;
  gap: 12px;
}

.photo-card {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: #e2e8f0;
}

.photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.25s ease;
}

.photo-card:hover img {
  transform: scale(1.04);
}

.photo-mask {
  position: absolute;
  inset: auto 0 0;
  padding: 8px 10px;
  color: #fff;
  font-size: 12px;
  line-height: 1.2rem;
  background: linear-gradient(transparent, rgba(15, 23, 42, 0.85));
}

.skeleton-card {
  border-radius: 12px;
  background: linear-gradient(120deg, #e2e8f0 25%, #f1f5f9 37%, #e2e8f0 63%);
  background-size: 300% 100%;
}
</style>
