<template>
  <div class=" mt-md-0">
   <loading :active.sync="isLoading" ></loading>
    <div class="text-right mt-4">
      <button class="btn btn-warning" @click="openModal('add')">建立新的優惠券</button>
    </div>
    <div class="table-responsive-md">
      <table class="table mt-4">
      <thead>
        <tr>
          <th width="250">名稱</th>
          <th width="100">折扣百分比</th>
          <th width="120">到期日</th>
          <th width="100">是否啟用</th>
          <th width="50">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>
            {{ item.percent | percent }}
          </td>
          <td>{{ item.due_date | date }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            
            <span v-else>未啟用</span>
          </td>
          <td>
              <div class="btn-group" role="group" aria-label="Third group">
                 <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">編輯</button>
                 <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">刪除</button>
              </div>
           
          </td>
        </tr>
      </tbody>
    </table>
    </div>
   <Page :pagination="pagination" @products-getProducts="getCoupons"></Page>

    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
            
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempCoupon.title">
                </div>
                <div class="form-group">
                  <label for="coupon">優惠碼</label>
                  <input type="text" class="form-control" id="coupon"
                    placeholder="請輸入優惠碼" v-model="tempCoupon.code">
                </div>
                <div class="form-group">
                  <label for="due_date">到期日</label>
                  <input type="date" class="form-control" id="due_date"
                    placeholder="請輸入到期日" v-model="due_date"  >
                </div>
                <div class="form-group">
                  <label for="percent">折扣百分百</label>
                  <input type="text" class="form-control" id="percent"
                    placeholder="請輸入折扣百分百" v-model="tempCoupon.percent">
                </div>

            
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" 
                    v-model="tempCoupon.is_enabled"   
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
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon()">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger"></strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="updateCoupon()"
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
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
      due_date: '1999-01-01'
     
    };
  },
   components: {
    Page
  },
  methods: {
    getCoupons(page =1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`; 
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading= true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading= false;
        vm.coupons = response.data.coupons;
        vm.pagination =response.data.pagination;
      });
    },
    openModal(isNew, item){
   
       switch(isNew){
         case 'add':
          this.tempCoupon = {};
          this.isNew = 'add';
          this.due_date = '1999-01-01';
          break;

         case 'edit':
          this.tempCoupon = Object.assign({}, item);
          let newDate = new Date(this.tempCoupon.due_date)
          let year = newDate.getFullYear();
          let month = newDate.getMonth() +1;
          let day = newDate.getDate();
          if(month<10){
            month = 0 + String(month)
          }
          if(day<10){
            day = 0 + String(day)
          }
          this.due_date = `${year}-${month}-${day}`
          this.isNew = 'edit';
          break;

         case 'delete':
          this.tempCoupon =Object.assign({}, item);
          this.isNew = 'delete';
          break;
       }

       if(this.isNew !== 'delete'){
          $('#couponModal').modal('show');
       }else{
          $('#delCouponModal').modal('show');
       }
        
        
    },
    updateCoupon(){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`; 
      const vm = this;
      let httpMethod ='post'
      //   vm.tempCoupon.due_date = Date.now(vm.tempCoupon.due_date);
     
      switch(vm.isNew){
         case 'add':
          break;

         case 'edit':
          api = `${api}/${vm.tempCoupon.id}`;
          httpMethod = 'put';
          break;

         case 'delete':
          api = `${api}/${vm.tempCoupon.id}`;
          httpMethod = 'delete';
          break;
       }


      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      this.$http[httpMethod](api,{data:vm.tempCoupon}).then((response) => {
        // console.log(response.data);
        if(response.data.success){
          if(vm.isNew !== 'delete'){
            $('#couponModal').modal('hide')
            vm.due_date = '1999-01-01';
          }else{
            $('#delCouponModal').modal('hide');
          }
           vm.getCoupons()
        }else{
          console.log('失敗了');
        }
      });

    },
  
  },
  created() {
    this.getCoupons();
  },
  watch: {
    due_date() {
      const vm = this;
      vm.tempCoupon.due_date = new Date(vm.due_date).getTime()
    
    }
  }
};
</script>

<style scoped>
#customFile{
  width: 108%;
}

</style>
