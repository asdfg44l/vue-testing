# 來個小測驗 (Vue testing)
此專案提供了 todolist 功能，以及使用者資料搜尋功能(fake data)
## 功能列表
- todolist 有基本的新增、編輯和刪除(多筆)功能，並可以註記為已完成
- 使用者資料可以依照性別、居住地和姓名來查找資料
- 可以使用右上角的切
## 建構核心思想
這裡是選擇使用 Vue Cli 來完成功能，主要用 todolist 以及使用者資料搜尋來 demo 需求。
Component 有兩個，CustomInput 可以藉由變更 mode 的值來選擇要使用 text、radio或是 select，select的 option 可以 slot 來插入。

Computed 應用於經過計算後的資料，像是 todolist與使用者資料搜尋的呈現，可以去監聽篩選條件的改變並回傳適當的資料。

title與 description則是在路由的 meta資訊裡夾帶， 並使用 beforeEach的功能去修改。

使用 Global參數切換主題色的部分， 我是在 App.vue寫了一個動態的 class，藉由切換 class名稱來更換主題，並且在 Scss中使用 map來管理兩種不同的主題，之後要新增主題只要新增 map即可。
(customTheme.scss)

## 環境建置與需求 (prerequisites)
#### 環境
- Node.js 16.13.1

## 安裝與執行 (installation and execution)
1. 使用 git 下載本專案
```
git clone https://github.com/asdfg44l/vue-testing.git
```
2. 移動至本專案資料夾
```
cd vue-testing
```
3. 安裝套件
```
npm install
 
