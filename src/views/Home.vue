<template>
  <div class="container mx-auto">
    <div class="row justify-content-center">
      <div class="col-10">
        <!-- 跑馬燈 -->
        <!-- <custom-marquee :list="marqueeList" class="mt-2">
        </custom-marquee> -->
        <!-- todo-list -->
        <div class="custom-list mb-3 mt-4">
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
                :className="['rounded-0', 'rounded-start']"
              >
              </custom-input>
              <button class="btn btn-primary btn-sm ml-1" @click.prevent="addTodo">新增</button>
            </div>
            
          </div>
          <ul class="list-content">
            <!-- 有資料時的 Todo -->
            <template v-if="todoList.length > 0">
              <li class="list-item" v-for="item in showList" :key="item.id" @dblclick.prevent="openEditInput(item.id)">
                <!-- 編輯狀態 -->
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
                <!-- 一般狀態 -->
                <div class="d-flex align-items-center" v-else>
                  <input type="checkbox" v-model="userChecked" :value="item.id">
                  <span
                    class="ms-3"
                    :class="{'text-decoration-line-through': item.status === 'completed'}"
                  >
                    {{ item.title }}
                  </span>
                  <button
                    class="btn btn-sm d-block ms-auto bg-transparent"
                    @click.prevent="removeTodo(item.id)"
                  >
                    <i class="fas fa-trash font-normal text-danger"></i>
                  </button>
                </div>
              </li>
            </template>
            <!-- 預設 Todo頁面 -->
            <template v-else>
              <li class="list-item d-flex">
                <div>
                  <input type="checkbox" disabled>
                  <span class="ms-2">請輸入新的 Todo</span>
                </div>
              </li>
            </template>
          </ul>
          <!-- 操作列表 -->
          <div class="list-footer d-flex">
            <button class="btn btn-sm btn-primary me-2" @click="changeStatus('processing')">標示為進行中</button>
            <button class="btn btn-sm btn-success me-2" @click="changeStatus('completed')">標示為已完成</button>
            <button class="btn btn-sm btn-danger" @click="removeTodos">刪除已選取</button>
            <button class="btn btn-sm d-block ms-auto" @click="removeAll">全部刪除</button>
          </div>
        </div>
        <small class="fs-sm">*若要使用編輯功能, 可以點擊兩下目標todo, 變更完成後再按 enter</small>
      </div>
      <div class="col-10 mt-5">
        <input ref="upload-excel" type="file" name="excel" id="">
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomID } from "@/libs/common.js"; //給每個todo一個ID
import CustomInput from "@/components/CustomInput.vue";
// import { Workbook } from "@/libs/manageExcel.js";
// import XLSX from 'xlsx';
// import FileSaver from 'file-saver';
// import { ab2str } from '@/libs/excelImport.js';

export default {
  name: 'Home',
  components: {
    CustomInput,
    // CustomMarquee: () => import('../components/CustomMarquee.vue')
  },
  data() {
    return {
      todoStatus: '', //篩選狀態
      userInput: '',  
      userChecked: [],
      todoList: [],
      todoEditID: '',
      todoEditText: ''
    }
  },
  methods: {
    addTodo() {
      const title = this.userInput.trim()
      if(title.length === 0) return

      const id = getRandomID(6)
      const date = new Date()
      this.todoList.push({ title, id, status: 'processing', 'create_date': date })

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
    },
    //跑馬燈內容
    marqueeList() {
      let marquee = [
        { title: 'hello' },
        { title: '跑馬燈跑馬燈' },
        { title: '跑阿跑啊跑啊跑啊' }
      ];
      return marquee.map(item => {
        item.ID = getRandomID(5)
        return item
      })
    }
  },
  mounted() {
    // const fs = this.$refs['upload-excel'];
    // fs.addEventListener('change', () => {
    //   const file = fs.files[0]
    //   const fileReader = new FileReader()
    //   fileReader.readAsArrayBuffer(file);

    //   fileReader.onload = function() {
    //     const result = fileReader.result
        
    //     const sheets = XLSX.read(result).Sheets
        
    //     console.log(XLSX.utils.sheet_to_json(sheets['sheet_name_1']))
    //   }
      
    // })

    // const vm = this;
    // const excel_header = [
    //   "代辦事項",
    //   "狀態",
    //   "創建時間"
    // ]
    // const attrs_to_show = [
    //   "title",
    //   "status",
    //   "create_date"
    // ]
    // const data_format = {
    //   create_date: function(row) {
    //     return row.toLocaleString('zh-TW', {
    //       year: 'numeric',
    //       month: '2-digit',
    //       day: '2-digit',
    //       hour: '2-digit',
    //       minute: '2-digit',
    //       second: '2-digit',
    //       hour12: false
    //     })
    //   }
    // }
    // const jsonDataList = [
    //   { title: '吃早餐', status: '已完成', create_date:  new Date(), trash: '52415' },
    //   { title: '吃午餐', status: '已完成', create_date: new Date(), trash: '52415' },
    //   { title: '吃晚餐', status: '未完成', create_date: new Date(), trash: '52415' }
    // ]

    // const excel_config = { jsonDataList, attrs_to_show, excel_header, data_format }

    // const wb = new Workbook()
    // wb.appendSheet(excel_config, '測試用工作表')
    // wb.toBlob()
    // wb.saveAs('test111.xlsx')
  }
}
</script>
