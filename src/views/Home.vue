<template>
  <div class="container mx-auto">
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="custom-list mb-1">
          <div class="list-header d-flex justify-content-between">
            <custom-input
              mode="select"
              name="todoStatus"
              id="todoStatus"
              v-model="todoStatus"
            >
              <option value="">全部</option>
              <option value="processing">未完成</option>
              <option value="completed">已完成</option>
            </custom-input>
            <div class="d-flex">
              <custom-input
                mode="text"
                name="addTodo"
                id="addTodo"
                placeholder="在這裡新增 Todo"
                @keyup.enter.native= "addTodo"
                v-model="userInput"
              >
              </custom-input>
              <button class="btn btn-primary btn-sm ml-1" @click.prevent="addTodo">新增</button>
            </div>
            
          </div>
          <ul class="list-content" v-if="todoList.length > 0">
            <li class="list-item" v-for="item in showList" :key="item.id" @dblclick.prevent="openEditInput(item.id)">
              <div v-if="todoEditID === item.id">
                <custom-input
                  mode="text"
                  name="editTodo"
                  id="editTodo"
                  @keyup.enter.native= "editTodo"
                  v-model="todoEditText"
                >
                </custom-input>
              </div>
              <div class="d-flex" v-else>
                <div>
                  <input type="checkbox" v-model="userChecked" :value="item.id">
                  <span class="ml-2" :class="{'text-slash': item.status === 'completed'}">{{ item.title }}</span>
                </div>
                <button
                  class="btn btn-sm d-block ml-auto bg-transparent"
                  @click.prevent="removeTodo(item.id)"
                >
                  <i class="fas fa-trash font-normal text-danger"></i>
                </button>
              </div>
            </li>
          </ul>
          <ul class="list-content" v-else>
            <li class="list-item d-flex">
              <div>
                <input type="checkbox" disabled>
                <span class="ml-2">請輸入新的 Todo</span>
              </div>
            </li>
          </ul>
          <div class="list-footer d-flex">
            <button class="btn btn-primary mr-1" @click="changeStatus('processing')">標示為進行中</button>
            <button class="btn btn-success mr-1" @click="changeStatus('completed')">標示為已完成</button>
            <button class="btn btn-danger" @click="removeTodos">刪除已選取</button>
            <button class="btn d-block ml-auto" @click="removeAll">全部刪除</button>
          </div>
        </div>
        <small>*若要使用編輯功能, 可以點擊兩下目標todo, 變更完成後再按 enter</small>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput.vue";

export default {
  name: 'Home',
  components: {
    CustomInput
  },
  data() {
    return {
      todoStatus: '',
      userInput: '',
      userChecked: [],
      todoList: [],
      todoEditID: '',
      todoEditText: ''
    }
  },
  methods: {
    //給每個todo一個ID
    getRandomID(num) {
      var results = ""
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      const charactersLength = characters.length

      for (let i=0; i< num; i++) {
        const char = characters.charAt(Math.floor(Math.random()*charactersLength))
        results += char
      }

      return results
    },
    addTodo() {
      const title = this.userInput.trim()
      if(title.length === 0) return

      const id = this.getRandomID(6)
      this.todoList.push({ title, id, status: 'processing' })

      //clear
      this.userInput = ''
    },
    removeTodo(id) {
      this.todoList.find((item, index) => {
        if(item.id === id) {
          this.todoList.splice(index, 1)
          return true
        }
        return false
      })
    },
    removeTodos() {
      this.todoList = this.todoList.filter( item => {
        if(this.userChecked.length === 0) return true

        const checkIndex = this.userChecked.indexOf(item.id)
        if(checkIndex === -1) return true
        this.userChecked.splice(checkIndex, 1)
        return false
      })
    },
    removeAll() {
      this.todoList = []
      this.userChecked = []
    },
    changeStatus(status) {
      this.todoList.every( item => {
        const checkIndex = this.userChecked.indexOf(item.id)
        if(checkIndex !== -1) {
          item.status = status
          this.userChecked.splice(checkIndex, 1)
          if(this.userChecked.length === 0 ) return false
        }
        return true
      })
    },
    openEditInput(id) {
      this.todoList.find( item => {
        if(item.id === id) {
          this.todoEditText = item.title
          return true
        }
        return false
      })
      this.todoEditID = id
    },
    editTodo() {
      this.todoList.find( item => {
        if(item.id === this.todoEditID) {
          item.title = this.todoEditText
          return true
        }
        return false
      })

      //clear
      this.todoEditID = ''
      this.todoEditText = ''
    }
  },
  computed: {
    showList() {
      const status = this.todoStatus
      let showList = this.todoList.filter(item => {
        return item.status.match(status)
      })

      return showList
    }
  },
  created() {
    // this.$theme = 'dark'
  }
}
</script>
