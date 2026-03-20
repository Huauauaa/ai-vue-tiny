<script setup lang="ts">
import { ref } from 'vue'
import { Button as TinyButton, Input as TinyInput } from '@opentiny/vue'

const message = ref('Hello TinyVue + Tailwind + Vue3')
</script>

<template>
  <main class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center p-6">
    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="mb-2 text-sm font-semibold text-violet-600">Starter Ready</p>
      <h1 class="mb-3 text-3xl font-bold tracking-tight text-slate-900">
        Vue + TypeScript + tiny-vue + TailwindCSS
      </h1>
      <p class="mb-6 text-slate-600">
        GitHub Pages configuration and Docker image packaging are included.
      </p>

      <div class="flex flex-col gap-3 sm:flex-row">
        <TinyInput v-model="message" class="w-full" placeholder="Input with tiny-vue" />
        <TinyButton type="primary">tiny-vue button</TinyButton>
      </div>

      <p class="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
        {{ message }}
      </p>
    </section>
  </main>
</template>
