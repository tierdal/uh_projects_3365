import Vue from 'vue'
import { mapGetters } from 'vuex'

const mixin = {
  computed: {
    ...mapGetters(['isLoadingCheck', 'isAuthenticated', 'user']),
  },
}

Vue.mixin(mixin)
