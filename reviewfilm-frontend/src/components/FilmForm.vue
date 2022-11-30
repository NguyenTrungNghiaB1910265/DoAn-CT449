<template> 
    <Form
        @submit="submitFilm" 
        :validation-schema="filmFormSchema" 
    > 
        <!-- NAME -->
        <div class="form-group"> 
            <label for="name">Tên phim</label> 
            <Field
                name="name" 
                type="text" 
                class="form-control" 
                v-model="filmLocal.name" 
            />
            <ErrorMessage name="name" class="error-feedback" /> 
        </div>
        <!-- TIME -->
        <div class="form-group"> 
            <label for="time">Thời lượng</label> 
            <Field
                name="time" 
                type="text" 
                class="form-control" 
                v-model="filmLocal.time" 
            />
            <ErrorMessage name="time" class="error-feedback" /> 
        </div> 
        <!-- DIRECTOR -->
        <div class="form-group"> 
            <label for="director">Đạo diễn</label> 
            <Field
                name="director" 
                type="text" 
                class="form-control" 
                v-model="filmLocal.director" 
            />
            <ErrorMessage name="director" class="error-feedback" /> 
        </div>
        <!-- NATION -->
        <div class="form-group"> 
            <label for="nation">Quốc gia</label> 
            <Field
                name="nation" 
                type="text" 
                class="form-control" 
                v-model="filmLocal.nation" 
            />
            <ErrorMessage name="nation" class="error-feedback" /> 
        </div>
        <!-- CATEGORY -->
        <div class="form-group"> 
            <label for="category">Thể loại</label> 
            <Field
                name="category" 
                type="text" 
                class="form-control" 
                v-model="filmLocal.category" 
            />
            <ErrorMessage name="category" class="error-feedback" /> 
        </div>
        <!-- PERMIERE -->
        <div class="form-group"> 
            <label for="premiere">Ngày khởi chiếu</label> 
            <Field
                name="premiere" 
                type="text" 
                class="form-control" 
                v-model="filmLocal.premiere" 
            />
            <ErrorMessage name="premiere" class="error-feedback" /> 
        </div>
        <!-- DESCRIPTION -->
        <div class="form-group"> 
            <label for="description">Nội dung</label> 
            <Field
                name="description" 
                type="text" 
                class="form-control" 
                v-model="filmLocal.description" 
            />
            <ErrorMessage name="description" class="error-feedback" /> 
        </div>
        <!-- IMAGEURL -->
        <div class="form-group"> 
            <label for="imageURL">Hình ảnh</label> 
            <Field
                name="imageURL" 
                type="text" 
                class="form-control" 
                v-model="filmLocal.imageURL" 
            />
            <ErrorMessage name="imageURL" class="error-feedback" /> 
        </div> 
        <div class="form-group"> 
            <button class="btn btn-primary">Lưu</button> 
            <button 
                v-if="filmLocal._id" 
                type="button" 
                class="ml-2 btn btn-danger" 
                @click="deleteFilm" 
            > 
                Xóa 
            </button> 
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
    emits: ["submit:film", "delete:film"], 
    props: { 
        film: { type: Object, required: true } 
    },
    data() { 
        const filmFormSchema = yup.object().shape({ 
            name: yup 
                .string() 
                .required("Tên phải có giá trị.") 
                .min(2, "Tên phải ít nhất 2 ký tự.") 
                .max(1000, "Tên có nhiều nhất 50 ký tự."),
            time: yup 
                .string() 
                .required("Thời lượng phải có giá trị.") 
                .min(2, "Tên phải ít nhất 2 ký tự.") 
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            director: yup 
                .string() 
                .required("Đạo diễn không được bỏ trống.") 
                .min(2, "Tên phải ít nhất 2 ký tự.") 
                .max(50, "Tên có nhiều nhất 50 ký tự."), 
            nation: yup 
                .string() 
                .required("Quốc gia không được bỏ trống.") 
                .min(2, "Tên phải ít nhất 2 ký tự.") 
                .max(50, "Tên có nhiều nhất 50 ký tự."), 
            premiere: yup 
                .string() 
                .required("Ngày khởi chiếu không được bỏ trống.") 
                .min(2, "Tên phải ít nhất 2 ký tự.") 
                .max(50, "Tên có nhiều nhất 50 ký tự."), 
            description: yup 
                .string() 
                .required("Nội dung review không được bỏ trống.") 
                .min(2, "Tên phải ít nhất 2 ký tự.") 
                .max(1000000, "Tên có nhiều nhất 50 ký tự."), 
            imageURL: yup 
                .string() 
                .required("Link hình ảnh phải đúng định dạng và không được bỏ trống.") 
                .min(2, "Tên phải ít nhất 2 ký tự.") 
                .max(1000, "Tên có nhiều nhất 50 ký tự."), 
        }); 
        return {
            // filmLocal để liên kết với các input trên form 
            filmLocal: this.film, 
            filmFormSchema,
        }; 
    },
    methods: { 
        submitFilm() { 
            this.$emit("submit:film", this.filmLocal); 
        },
        deleteFilm() { 
            this.$emit("delete:film", this.filmLocal.id); 
        }, 
    }, 
};
</script> 

<style scoped> 
@import "@/assets/form.css"; 
</style>