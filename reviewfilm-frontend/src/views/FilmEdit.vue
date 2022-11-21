<template> 
    <div v-if="film" class="page">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Trang chủ</a></li>
                <li class="breadcrumb-item active" aria-current="page">Hiệu chỉnh bài review</li>
            </ol>
        </nav>
        <h4>Hiệu chỉnh bài đăng</h4> 
        <FilmForm 
            :film="film" 
            @submit:film="updateFilm" 
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
    props: { 
        id: { type: String, required: true }, 
    },
    data() { 
        return { 
            film: null, 
            message: "", 
        }; 
    },
    methods: { 
        async getFilm(id) { 
            try {
                this.film = await FilmService.get(id); 
            } catch (error) { 
                console.log(error); 
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi 
                this.$router.push({ 
                    name: "notfound", 
                    params: { 
                        pathMatch: this.$route.path.split("/").slice(1) 
                    },
                    query: this.$route.query, 
                    hash: this.$route.hash, 
                }); 
            } 
        },
        
        async updateFilm(data) {
            try {
                await FilmService.update(this.film._id, data);
                this.message = "Bài đăng được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            } 
        },
        
        async deleteFilm() { 
            if (confirm("Bạn muốn xóa bài đăng này?")) {
                try {
                    await FilmService.delete(this.film._id);
                    this.$router.push({ name: "reviewfilm" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() { 
        this.getFilm(this.id);
        this.message = ""; 
    }, 
};
</script>