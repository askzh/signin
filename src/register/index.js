import Vue from 'vue'
import _ from 'underscore'

import Util from './util'

Vue.use({
  install (Vue, options) {
    _.each(Util, (item, key) => {
      Vue.prototype['$$' + key] = item
    })
  }
})
