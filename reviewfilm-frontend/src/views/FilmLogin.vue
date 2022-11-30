<template> 
    <div v-if="user" class="page">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Trang chủ</a></li>
                <li class="breadcrumb-item active" aria-current="page">Đăng nhập</li>
            </ol>
        </nav>
        <h4>Đăng nhập</h4> 
        <FilmFormLogin
            :user="user" 
        />
        <p>{{ message }}</p> 
    </div> 
</template> 

<script> 
// import FilmForm from "@/components/FilmForm.vue";
import FilmFormLogin from "../components/FilmFormLogin.vue";
// import UserService from "@/services/user.service";
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

    },
    created() { 
        this.user = {};
        this.message = "";
    }, 
};
</script>