import {getFootData} from '@/public/js/fetch'

export const getFooterMixin = {
  data() {
    return {
      footer: '',
    }
  },
  created() {
    this._getFootData()
  },
  methods: {
    _getFootData() {
      const result = getFootData()
      result.then(res => {
        this.footer = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
