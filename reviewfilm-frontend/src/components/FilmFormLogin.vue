<template> 
    <Form
        @submit="loginUser" 
        :validation-schema="userFormSchema" 
    > 
        
        <!-- EMAIL -->
        <div class="form-group"> 
            <label for="email">Email</label> 
            <Field
                name="email" 
                type="email" 
                class="form-control" 
                v-model="validate.email" 
            />
            <ErrorMessage name="email" class="error-feedback" /> 
        </div>
        <!-- PASSWORD -->
        <div class="form-group"> 
            <label for="password">Mật khẩu</label> 
            <Field
                name="password" 
                type="password" 
                class="form-control" 
                v-model="validate.password" 
            />
            <ErrorMessage name="password" class="error-feedback" /> 
        </div> 

        <div>

            <button type="submit" style="width:48%; margin: 0 0 5px 5px" class="btn btn-primary">
                <router-link :to="{ name: 'home' }">
                    <span class="text-white">ĐĂNG NHẬP</span>
                </router-link>
            </button>
            <router-link :to="{ name: 'film.register' }" >
                <button type="submit" style="width:48%; margin: 0 0 5px 5px;" class="btn btn-success">
                ĐĂNG KÝ</button>
            </router-link>  
            </div>
    </Form> 
</template> 

<script> 
import * as yup from "yup"; 
import { Form, Field, ErrorMessage } from "vee-validate"; 

export default { 
    components: { 
        Form, 
        Field, 
        ErrorMessage, 
    },
    emits: ["submit:user"], 
    props: { 
        user: { type: Object, required: true } 
    },
    data() { 
        const userFormSchema = yup.object().shape({
            email: yup 
                .string() 
                .required("Vui lòng nhập email đăng nhập.") 
                .email("E-mail không đúng.") 
                .max(50, "E-mail tối đa 50 ký tự."),
            password: yup 
                .string() 
                .required("Vui lòng nhập mật khẩu đăng nhập.") 
                .min(2, "Mật khẩu phải ít nhất 2 ký tự.") 
                .max(50, "Mật khẩu tối đa 50 ký tự."),
        }); 
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ 
            // validate để liên kết với các input trên form 
            validate: this.user, 
            userFormSchema,
        }; 
    },
    methods: { 
        loginUser() { 
            this.$emit("submit:user", this.validate); 
        },
    }, 
};
</script> 

<style scoped> 
@import "@/assets/form.css"; 
</style>