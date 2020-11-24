<template>
 <div>
    <Navbar/>
    <Alert></Alert>
    <div class="container-fluid">
        <div class="row">
            <Sidebar></Sidebar>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5">
                    <router-view></router-view>
                    
                </main>
                
        </div>
    </div>
</div>
</template>


<script>
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Alert from './AlertMessage';
export default {
    components:{
        Sidebar,
        Navbar,
        Alert,
    },
    created() {
      const myCookie =document.cookie.replace(/(?:(?:^|.*;\s*)hexCookie\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = myCookie;  
    // console.log('123',myCookie)
    },
}
</script>