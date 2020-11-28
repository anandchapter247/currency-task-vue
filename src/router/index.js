import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/LoginComponent.vue'
import LogoutComponent from '../components/LogoutComponent.vue'
import ListComponent from '../components/ListComponent.vue'
import CurrencyHistoryComponent from '../components/CurrencyHistoryComponent.vue'
import ChartComponent from '../components/ChartComponent.vue'
import AdvanceRequirementComponent from '../components/AdvanceRequirementComponent.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: LoginComponent
      },
      {
        path: '/list',
        component: ListComponent
      },
      {
        path:'/history/:id',
        component:CurrencyHistoryComponent
      },
      {
        path: '/chart',
        component: ChartComponent
      },
      {
        path: '/advance-requirement',
        component: AdvanceRequirementComponent
      },
      {
        path: '/logout',
        component: LogoutComponent
      }
    ]
  })

export default router