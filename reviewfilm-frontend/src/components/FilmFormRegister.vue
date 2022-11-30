<template> 
    <Form
        @submit="submitUser" 
        :validation-schema="userFormSchema" 
    > 
        <!-- NAME -->
        <div class="form-group"> 
            <label for="name">Họ tên</label> 
            <Field
                name="name" 
                type="text" 
                class="form-control" 
                v-model="userLocal.name" 
            />
            <ErrorMessage name="name" class="error-feedback" /> 
        </div>
        <!-- EMAIL -->
        <div class="form-group"> 
            <label for="email">Email</label> 
            <Field
                name="email" 
                type="email" 
                class="form-control" 
                v-model="userLocal.email" 
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
                v-model="userLocal.password" 
            />
            <ErrorMessage name="password" class="error-feedback" /> 
        </div> 

        <!-- ADDRESS -->
        <div class="form-group"> 
            <label for="email">Địa chỉ</label> 
            <Field
                name="address" 
                type="text" 
                class="form-control" 
                v-model="userLocal.address" 
            />
            <ErrorMessage name="address" class="error-feedback" /> 
        </div>
        
        <!-- PHONE -->
        <div class="form-group"> 
            <label for="phone">Số điện thoại</label> 
            <Field
                name="phone" 
                type="text" 
                class="form-control" 
                v-model="userLocal.phone" 
            />
            <ErrorMessage name="phone" class="error-feedback" /> 
        </div>
        
        <div class="form-group"> 
            <button class="btn btn-primary">Đăng ký</button>
            <a class="btn btn-danger ml-2">
                <router-link :to="{ name: 'film.login' }" class="text-white ml-1">Hủy</router-link>
            </a>
            
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
            name: yup 
                .string() 
                .required("Tên phải có giá trị.") 
                .min(2, "Tên phải ít nhất 2 ký tự.") 
                .max(1000, "Tên có nhiều nhất 50 ký tự."),
            email: yup 
                .string() 
                .email("E-mail không đúng.") 
                .max(50, "E-mail tối đa 50 ký tự."),
            password: yup 
                .string() 
                .required("Mật khẩu phải có giá trị.") 
                .min(2, "Mật khẩu phải ít nhất 2 ký tự.") 
                .max(50, "Mật khẩu có nhiều nhất 50 ký tự."),
            address: yup 
                .string() 
                .required("Địa chỉ phải có giá trị.") 
                .min(2, "Tên phải ít nhất 2 ký tự.") 
                .max(1000, "Địa chỉ có nhiều nhất 50 ký tự."),
            phone: yup 
                .string() 
                .matches( /((09|03|07|08|05)+([0-9]{8})\b)/g, 
                "Số điện thoại không hợp lệ." 
                ),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."), 
        }); 
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ 
            // userLocal để liên kết với các input trên form 
            userLocal: this.user,
            userFormSchema,
        }; 
    },
    methods: { 
        submitUser() { 
            this.$emit("submit:user", this.userLocal); 
        },
    }, 
};
</script> 

<style scoped> 
@import "@/assets/form.css"; 
</style>