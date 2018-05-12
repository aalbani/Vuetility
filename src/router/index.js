import Vue from 'vue'
import Router from 'vue-router'
import DragDropUtil from '@/components/DDUtil/DragDropUtil'
import EmailValidator from '@/components/EmailValidator/EmailValidator'
import PasswordValidator from '@/components/PasswordValidator/PasswordValidator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dragandrop',
      name: 'DragDropUtil',
      component: DragDropUtil
    },
    {
      path: '/emailValidator',
      name: 'EmailValidator',
      component: EmailValidator
    },
    {
      path: '/PasswordValidator',
      name: 'PasswordValidator',
      component: PasswordValidator
    }
  ],
  mode: 'history'
})
