
import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';

const app = createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'kn99',
            email:'',
            password:''
        }
    },
    methods: {
        login,
        checkUser,
    },
    mounted() {
        this.checkUser();// 先檢查 token
    }
});

app.mount('#app');

// 登入
function login() {
    // 檢查帳號/密碼是否有輸入
    if(!this.email || !this.password) {
        alert("請輸入帳號密碼");
        return;
    }

    axios.post(`${this.apiUrl}/admin/signin`, {
        'username': this.email,
        'password': this.password
    })
    .then(res => {
        getToken(res.data);
        enterProductsPage();
    })
    .catch(err => {
        console.log(err.response);
        alert(err.response.data.message);
        this.email = '';
        this.password = '';
    })
}

// 儲存 token 至 cookie
function getToken(data) {
    const {token, expired} = data;
    document.cookie = `hextoken=${token}; expired=${new Date(expired)}; path=/;`;
}

// 檢查是否有登入 token
function checkUser() {
    axios.defaults.headers.common.Authorization = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.post(`${this.apiUrl}/api/user/check`)
    .then(res => {
        enterProductsPage();
    })
    .catch(err => {
        console.log(err.response);
    })
}

function enterProductsPage() {
    window.location = "products.html";
}