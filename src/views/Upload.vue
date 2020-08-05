<template lang="pug">
  #upload
    b-container
      b-row
        b-form.w-100(@submit="submit")
          b-form-group(
            v-for="(form,index) in forms"
            :key="index"
            :label="form.label"
            :label-for="form.id"
          )
            b-form-input(
              :id="form.id"
              v-model="form.model"
              :type="form.type"
              required
            )
          b-form-group(
            label="商品類別"
            label-for="category"
          )
            b-form-select(
              id="category"
              v-model="category"
              required
              :options="options"
            )
          b-form-group(
            label="商品描述"
            label-for="description"
          )
            b-form-textarea(
              id="description"
              v-model="description"
              required
              rows="6"
              max-rows="6"
            )
          b-form-group(
            label="書籍封面"
            label-for="name"
          )
            b-form-file(
              id="name"
              v-model="file"
              required
              accept="image/*"
            )
          b-form-group(
            label="書籍預覽"
            label-for="preview"
          )
            b-form-file(
              id="preview"
              v-model="files"
              :file-name-formatter="formatNames"
              required
              multiple
              accept="image/*"
            )
          b-button(variant="success" type="submit") 送出
    b-container
      b-table(
        :items="items"
        :fields="fields"
      )
        template(v-slot:cell(name)='row')
          img(:src="row.item.name" :style="{maxWidth:'100px'}")
        template(v-slot:cell(preview)='row')
          b-button(@click="row.toggleDetails") 顯示內頁
        template(v-slot:cell(action)='row')
          b-button(@click="cancel([row.item._id,row.index])" variant="danger") 刪除
        template(v-slot:row-details='row')
          b-row
            b-col(v-for="(img,index) in row.item.preview"
                :key="index").text-center
              img(
                :src="row.item.preview[index]"
                :style="{maxWidth:'100px'}"
                )
</template>

<script>
export default {
  data () {
    return {
      forms: [
        { label: '商品名稱', id: 'title', model: '', type: 'text' },
        { label: '商品金額', id: 'price', model: '', type: 'number' },
        { label: '商品定價', id: 'originalprice', model: '', type: 'number' },
        { label: '商品ISBN', id: 'ISBN', model: '', type: 'text' }
      ],
      description: '',
      file: null,
      files: [],
      category: null,
      options: [
        { text: '請選擇類別', value: null },
        { text: '平面設計', value: '平面設計' },
        { text: '插畫', value: '插畫' },
        { text: '商業設計', value: '商業設計' },
        { text: '工業設計', value: '工業設計' }
      ],
      items: [],
      fields: [
        { class: 'text-center align-middle', label: '圖片', key: 'name' },
        { class: 'text-center align-middle', label: '書名', key: 'title' },
        { class: 'text-center align-middle', label: '價錢', key: 'price' },
        { class: 'text-center align-middle', label: '定價', key: 'originalprice' },
        { class: 'text-center align-middle', label: 'ISBN', key: 'ISBN' },
        { class: 'text-center align-middle', label: '內頁', key: 'preview' },
        { class: 'text-center align-middle', label: '分類', key: 'category' },
        { class: 'text-center align-middle', label: '操作', key: 'action' }
      ]
    }
  },
  methods: {
    formatNames (files) {
      if (files.length === 1) {
        return files[0].name
      } else {
        return `${files.length} files selected`
      }
    },
    cancel (data) {
      this.axios.delete(process.env.VUE_APP_APIURL + '/upload/' + data[0])
        .then(response => {
          this.items.splice(data[1], 1)
        })
        .catch(e => {
          console.log(e.message)
        })
    },
    submit (e) {
      e.preventDefault()
      for (const i of this.files) {
        if (i.size >= 1024 * 1024 || !i.type.includes('image')) {
          alert('內頁檔案格式不符')
          return
        }
      }
      if (this.file === null || this.file.size >= 1024 * 1024 || !this.file.type.includes('image')) {
        alert('封面檔案格式不符')
        return
      }
      const fd = new FormData()
      fd.append('image', this.file)
      for (const i of this.files) {
        fd.append('image', i)
      }
      for (const i of this.forms) {
        fd.append(i.id, i.model)
      }
      fd.append('description', this.description)
      fd.append('category', this.category)
      this.axios.post(process.env.VUE_APP_APIURL + '/upload', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        // 傳回來的東西
        const data = response.data.result
        // 傳回來的 cover 改成網址
        data.name = process.env.VUE_APP_APIURL + '/upload/' + data.name
        // 傳回來的 preview 都改為網址
        for (let i = 0; i < data.preview.length; i++) {
          data.preview[i] = process.env.VUE_APP_APIURL + '/upload/' + data.preview[i]
        }
        // 新增商品陣列
        this.items.push(data)
      })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/upload')
      .then(response => {
        this.items = response.data.result
        for (const i of this.items) {
          i.name = process.env.VUE_APP_APIURL + '/upload/' + i.name
          i.id = i._id
          for (let j = 0; j < i.preview.length; j++) {
            i.preview[j] = process.env.VUE_APP_APIURL + '/upload/' + i.preview[j]
          }
        }
      })
  }
}
</script>
