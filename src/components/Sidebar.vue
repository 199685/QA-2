<template>
    <div>
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="sidebar-sticky pt-3">
                
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>管理員</span>
                    <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                    </h6>
                    <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                        <router-link to="/admin/products" class="nav-link">
                        <i class="fas fa-box-open mr-1"></i>
                        產品列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                        <span data-feather="file-text"></span>
                        <i class="far fa-list-alt mr-1"></i>
                        訂單列表
                        </a>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/coupons" class="nav-link">
                        <span data-feather="file-text"></span>
                        <i class="fas fa-ticket-alt mr-1"></i>
                        優惠券
                        </router-link>
                    </li>
                    </ul>
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>模擬功能</span>
                    <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                    </h6>
                    <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                        <router-link to="/customer_order" class="nav-link">
                        <span data-feather="file-text"></span>
                        <i class="fas fa-shopping-cart mr-1"></i>
                        模擬訂單
                        </router-link>
                    </li>
                    </ul>
                </div>
        </nav>
    </div>
</template>


