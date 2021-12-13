<template>
  <div class="container mx-auto">
    <div class="row">
      <div class="col-12">
        <div class="custom-list" v-if="pairList.length > 0">
          <div class="list-header d-flex justify-content-between sticky-top">
            <div class="d-flex align-item-center">
              <custom-input
                class="font-sm"
                mode="radio"
                name="gender"
                id="gender"
                set-value=""
                v-model="filter.gender"
              >
                全部
              </custom-input>
              <custom-input
                class="font-sm ml-2"
                mode="radio"
                name="gender"
                id="gender"
                set-value="male"
                v-model="filter.gender"
              >
                男性
              </custom-input>
              <custom-input
                class="font-sm ml-2"
                mode="radio"
                name="gender"
                id="gender"
                set-value="female"
                v-model="filter.gender"
              >
                女性
              </custom-input>
              <custom-input
                class="font-sm ml-2"
                mode="select"
                name="location"
                id="location"
                v-model="filter.location"
              >
                <option value="">所有地區</option>
                <option
                  v-for="location in locationList"
                  :key="location"
                  :value="location"
                >
                  {{ location }}
                </option>
              </custom-input>
            </div>
            <custom-input
              mode="text"
              name="searchText"
              id="searchText"
              placeholder="搜尋姓名"
              v-model="filter.searchText"
            >

            </custom-input>
          </div>
          <div class="list-content">
            <div class="row">
              <div class="col-3 mb-2" v-for="item in pairList" :key="item.phone">
                <custom-card
                  :img-url="item.imgUrl"
                  :title="item.name"
                  alt="user photo"
                >
                  <p class="card-text">性別: {{ item.gender }}</p>
                  <p class="card-text">居住地:<br/>{{ item.location }}</p>
                  <p class="card-text">電子信箱:<br/>{{ item.email }}</p>
                  <p class="card-text">電話: {{ item.phone }}</p>
                </custom-card>
              </div>
            </div>
          </div>
          <div class="list-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CustomInput from "@/components/CustomInput.vue";
import CustomCard from "@/components/CustomCard.vue";

export default {
  components: {
    CustomInput,
    CustomCard
  },
  data() {
    return {
      filter: {
        gender: '',
        location: '',
        searchText: ''
      },
      userList: []
    }
  },
  methods: {
    getUsers() {
      this.axios.get('https://randomuser.me/api/?results=50')
      .then( res => {
        const results = res.data.results
        this.userList = results.map( item => {
          return {
            name: `${item.name.last} ${item.name.first}`,
            gender: item.gender,
            country: item.location.country,
            location: `${item.location.country} ${item.location.city}`,
            email: item.email,
            phone: item.cell,
            imgUrl: item.picture.large
          }
        })
      })
    }
  },
  computed: {
    pairList() {
      const searchText = this.filter.searchText.trim()
      const gender = this.filter.gender
      const location = this.filter.location

      let pairList = this.userList.filter( item => {
        if(gender) {
          return item.gender === gender && item.location.match(location) && item.name.toLowerCase().match(searchText.toLowerCase())
        } else {
          return item.location.match(location) && item.name.toLowerCase().match(searchText.toLowerCase())
        }
      })

      return pairList
    },
    locationList() {
      let locationList = this.userList.map( item => {
        return item.country
      })

      return Array.from(new Set(locationList))
    }
  },
  created() {
    this.getUsers()
  }
}
</script>