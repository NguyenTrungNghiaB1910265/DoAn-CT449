<template> 
    <div v-if="user" class="page">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Trang chủ</a></li>
                <li class="breadcrumb-item active" aria-current="page">Đăng nhập</li>
            </ol>
        </nav>
        <h4>Đăng nhập</h4> 
        <FilmFormLogin
            :user="user" 
            @submit:user="addUser"
        />
        <p>{{ message }}</p> 
    </div> 
</template> 

<script> 
import FilmFormRegister from "../components/FilmFromRegister.vue";
import FilmFormLogin from "../components/FilmFormLogin.vue";
import UserService from "../services/user.service";

export default { 
    components: { 
        FilmFormLogin, 
    },
    data() { 
        return { 
            user: null, 
            message: "", 
        }; 
    },
    methods: { 
        
        async addUser(data) { 
            try {
                await UserService.create(data); 
                this.message = "Tài khoản được đăng ký thành công."; 
            } catch (error) { 
                console.log(error); 
            } 
        },

    },
    created() { 
        this.user = {};
        this.message = "";
    }, 
};
</script>