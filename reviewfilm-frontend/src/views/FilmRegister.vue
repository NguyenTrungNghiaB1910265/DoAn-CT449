<template> 
    <div v-if="user" class="page">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Trang chủ</a></li>
                <li class="breadcrumb-item active" aria-current="page">Đăng ký</li>
            </ol>
        </nav>
        <h4>Đăng ký tài khoản</h4> 
        <FilmFormRegister
            :user="user" 
            @submit:user="addUser"
        />
        <p>{{ message }}</p> 
    </div> 
</template> 

<script> 
// import FilmForm from "@/components/FilmForm.vue";
import FilmFormRegister from "../components/FilmFormRegister.vue";
// import UserService from "@/services/user.service";
import UserService from "../services/user.service";

export default { 
    components: { 
        FilmFormRegister, 
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