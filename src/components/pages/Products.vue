<template>
  <div class=" mt-md-0">
   <loading :active.sync="isLoading" ></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal('add')">建立新的產品</button>
    </div>
    <div class="table-responsive-md">
      <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency}}
          </td>
          <td class="text-right">
            {{ item.price | currency}}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            
            <span v-else>未啟用</span>
          </td>
          <td>
              <div class="btn-group d-block d-md-flex" role="group" aria-label="Third group">
                 <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">編輯</button>
                 <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">刪除</button>
              </div>
           
          </td>
        </tr>
      </tbody>
    </table>
    </div>
   <Page :pagination="pagination" @products-getProducts="getProducts"></Page>

    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group ">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control pl-1"
                    ref="files" @change="uploadFile()">
                </div>
                <img :src="tempProduct.imageUrl"
                  class="img-fluid" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempProduct.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入產品描述"  v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" 
                    v-model="tempProduct.is_enabled"   
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled" >
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="updateProduct()"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Page from '../Pagination'
export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
    };
  },
   components: {
    Page
  },
 methods: {
    getProducts(page =1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`; 
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading= true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading= false;
        vm.products = response.data.products;
        vm.pagination =response.data.pagination;
      });
    },
    openModal(isNew, item){
   
       switch(isNew){
         case 'add':
          this.tempProduct = {};
          this.isNew = 'add';
          break;

         case 'edit':
          this.tempProduct = Object.assign({}, item);
          this.isNew = 'edit';
          break;

         case 'delete':
          this.tempProduct =Object.assign({}, item);
          this.isNew = 'delete';
          break;
       }

       if(this.isNew !== 'delete'){
          $('#productModal').modal('show');
       }else{
          $('#delProductModal').modal('show');
       }
        
        
    },
    updateProduct(){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`; 
      const vm = this;
      let httpMethod ='post'

     
      switch(vm.isNew){
         case 'add':
          break;

         case 'edit':
          api = `${api}/${vm.tempProduct.id}`;
          httpMethod = 'put';
          break;

         case 'delete':
          api = `${api}/${vm.tempProduct.id}`;
          httpMethod = 'delete';
          break;
       }


      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      this.$http[httpMethod](api,{data:vm.tempProduct}).then((response) => {
        // console.log(response.data);
        if(response.data.success){
          if(vm.isNew !== 'delete'){
            $('#productModal').modal('hide')
          }else{
            $('#delProductModal').modal('hide');
          }
           vm.getProducts()
        }else{
          console.log('失敗了');
        }
      });

    },
    uploadFile() {
     console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) =>{
        console.log(response.data);
        if(response.data.success){
          vm.status.fileUploading = false;
          // vm.tempProduct.imageUrl = response.data.imageUrl
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
        }else {
          this.$bus.$emit('messsage:push', response.data.message, 'danger');
        }
      })
    }
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
#customFile{
  width: 108%;
}

</style>
