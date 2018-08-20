const BASE_URL = `http://localhost:3000`

new Vue({
  el: '#app',
  data: {
    isLogin: false,
    username: '',
    password: '',
    items: [],
    name: '',
    price: '',
    stock: '',
    tags: ''
  },
  methods: {
    createItem() {
      let token = localStorage.getItem('toko-token')
      axios({
        method: 'post',
        url: `${BASE_URL}/items`,
        headers: {
          token
        },
        data: {
          name: this.name,
          price: this.price,
          stock: this.stock,
          tags: this.tags.split(' ')
        }
      })
      .then(response => {
        console.log('add item success', response.data)
        alert('Item is added!')
        window.location.reload(true)
      })
      .catch(err => {
        console.log('add item error', err.response)
        alert('Item add error!')
      })
    },
    searchItem() {
      let query = []
      if (this.name !== '') query.push(`name=${this.name}`)
      if (this.price !== '') query.push(`price=${this.price}`)
      if (this.tags !== '') query.push(`tags=${this.tags}`)

      if (query.length > 0) {
        var queryStr = query.join('&')
        console.log(`query -->`, queryStr)
      } else {
        var queryStr = ''
      }
      axios({
        method: 'get',
        url: `${BASE_URL}?${queryStr}`
      })
      .then(response => {
        console.log('search results ->',response.data)
        this.items = response.data
      })
      .catch(err => {
        console.log(`error searching -->`, err.response)
      })
    },
    formLogin() {
      axios({
        method: 'post',
        url: `${BASE_URL}/request_token`,
        data: {
          username: this.username, 
          password: this.password
        }
      })
      .then(response => {
        console.log('success -->',response.data)
        let token = response.data.token
        localStorage.setItem('toko-token', token)
        window.location.reload(true)
      })
      .catch(err => {
        console.log('error login', err.response)
      })
    },
    logout() {
      localStorage.removeItem('toko-token')
      window.location.reload(true)
    }
  },
  created() {
    if (localStorage.getItem('toko-token')) {
      this.isLogin = true
    }

    axios({
      method: 'get',
      url: `${BASE_URL}/`
    })
    .then(response => {
      this.items = response.data
      // console.log(response.data)
    })
    .catch(err => {
      console.log(err.response)
    })
  }
})