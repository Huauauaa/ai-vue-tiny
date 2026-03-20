import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@opentiny/vue-theme/index.css'
import { Loading as TinyLoading } from '@opentiny/vue'
import router from './router'

createApp(App).use(router).use(TinyLoading).mount('#app')
