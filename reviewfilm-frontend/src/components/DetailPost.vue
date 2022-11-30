<template> 
    <!-- <Form
        @submit="submitFilm" 
    >  -->
    <div class="bg-white container p-5">
        <!-- NAME -->
        <div class="row"> 
            <p>
                <span class="font-weight-bold">Tên phim: </span>
                <em>{{film.name}}</em>
            </p> 
        </div>
        <!-- TIME -->
        <div class="row">
            <p>
                <span class="font-weight-bold">Thời lượng: </span>
                <em>{{film.time}}</em>
            </p> 
        </div> 
        <!-- DIRECTOR -->
        <div class="row">
            <p>
                <span class="font-weight-bold">Đạo diễn: </span>
                <em>{{film.director}}</em>
            </p> 
            
        </div>
        <!-- NATION -->
        <div class="row">
            <p>
                <span class="font-weight-bold">Quốc gia: </span>    
                <em>{{film.nation}}</em>
            </p> 
            
        </div>
        <!-- CATEGORY -->
        <div class="row">
            <p>
                <span class="font-weight-bold">Thể loại: </span>
                <em>{{film.category}}</em>
            </p>
        </div>
        <!-- PERMIERE -->
        <div class="row">
            <p>
                <span class="font-weight-bold">Ngày khởi chiếu: </span>
                <em>{{film.premiere}}</em>
            </p>
        </div>
        <!-- DESCRIPTION -->
        <div class="row text-justify">
            <p for="description" class="font-weight-bold">Nội dung:</p> 
            {{film.description}}
        </div>
        <!-- IMAGEURL -->
        <div class="row">
            <img :src="film.imageURL" alt="">
        </div> 
    </div>
    <!-- </Form>  -->
</template> 

<script> 

export default { 
     
    props: { 
        film: { type: Object, required: true } 
    },
    data() { 
        return {
            film: this.film, 
        }; 
    },
    methods: { 
        submitFilm() { 
            this.$emit("submit:film", this.film); 
        },
        deleteFilm() { 
            this.$emit("delete:film", this.film.id); 
        }, 
    }, 
};
</script> 

<style scoped> 
@import "@/assets/posts.css"; 
</style>