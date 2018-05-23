import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Form from '@/views/form.vue'
import Template from '@/views/template.vue'
import Preview from '@/views/preview.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Form',
      component: Form
    },
    {
      path: '/template',
      name: 'Template',
      component: Template
    },
    {
      path: '/preview',
      name: 'Preview',
      component: Preview
    }
  ]
})
