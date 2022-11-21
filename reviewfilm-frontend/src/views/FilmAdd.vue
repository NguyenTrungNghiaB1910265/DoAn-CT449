<template> 
    <div v-if="film" class="page">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Trang chủ</a></li>
                <li class="breadcrumb-item active" aria-current="page">Thêm bài review</li>
            </ol>
        </nav>
        <h4>Thêm bài review</h4> 
        <FilmForm 
            :film="film" 
            @submit:film="addFilm" 
            @delete:film="deleteFilm"
        />
        <p>{{ message }}</p> 
    </div> 
</template> 

<script> 
import FilmForm from "@/components/FilmForm.vue";
import FilmService from "@/services/film.service"; 

export default { 
    components: { 
        FilmForm, 
    },
    data() { 
        return { 
            film: null, 
            message: "", 
        }; 
    },
    methods: { 
        
        async addFilm(data) { 
            try {
                await FilmService.create(data); 
                this.message = "Bài viết được thêm thành công."; 
            } catch (error) { 
                console.log(error); 
            } 
        },

    },
    created() { 
        this.film = {};
        this.message = "";
    }, 
};
</script>