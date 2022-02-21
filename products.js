import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';
import pagination from './components/pagination.js'
import productModalComponent from './components/profuctModal.js'

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = "kn99";
let productModal = {};
let deleteProductModal = {};

const app = createApp({
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl:[]
            },
            isNew: false,
            pagination:{},
        }
    },
    methods: {
        getProducts(page=1) {
            axios.get(`${apiUrl}/api/${apiPath}/admin/products?page=${page}`)
            .then(res => {
                this.products = res.data.products;
                this.pagination = res.data.pagination;
            })
            .catch(err => {
                console.log(err.response);
            })
        },
        showProductModal(status, product) {
            switch (status) {
                case 'add':
                    this.tempProduct = {imagesUrl:[]};
                    this.isNew = true;
                    productModal.show();
                    break;
                case 'edit':
                    this.tempProduct = {...product};
                    this.isNew = false;
                    productModal.show();
                    break;
                case 'delete':
                    deleteProductModal.show();
                    this.tempProduct = {...product};
                    break;
            }
        },
        updateProduct(product=this.tempProduct) {
            let method = 'post';
            let url = `${apiUrl}/api/${apiPath}/admin/product`;
            let message = '產品新增完成';

            if (!this.isNew) {
                method = 'put';
                url = `${apiUrl}/api/${apiPath}/admin/product/${product.id}`;
                message = '產品修改完成';
            }

            axios[method](url, {
                "data": product
            })
            .then(res => {
                alert(message);
                productModal.hide();
                this.getProducts(this.pagination.current_page);
                this.tempProduct = {imagesUrl:[]};
            })
            .catch(err => {
                console.log(err);
                alert('產品新增失敗');
            })
        },
        deleteProduct() {
            axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`)
            .then(res => {
                deleteProductModal.hide();
                this.getProducts();
            })
            .catch(err => {
                console.log(err);
                alert('產品刪除失敗');
            });
        },
        checkUser() {// 檢查是否有登入 token
            axios.defaults.headers.common.Authorization = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.post(`${apiUrl}/api/user/check`)
            .then(res => {
                productModal = new bootstrap.Modal(document.getElementById('productModal'), {});
                deleteProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {});
                this.getProducts();
            })
            .catch(err => {
                console.log(err);
                window.location = 'index.html'
            })
        }

    },
    mounted() {
        this.checkUser();
    }
});

app.component('pagination', pagination); // 新增分頁元件
app.component('productModal', productModalComponent); // 新增 modal 元件

app.mount('#app');