<template> 
    <div v-if="film" class="page">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Trang chủ</a></li>
                <li class="breadcrumb-item active" aria-current="page">Chi tiết bài review</li>
            </ol>
        </nav>
        <h4>Chi tiết bài đăng</h4> 
        <DetailPost :film="film" />
        <p>{{ message }}</p> 
    </div> 
</template> 

<script>
import FilmService from "@/services/film.service"; 
import DetailPost from "@/components/DetailPost.vue";

export default { 
    components: { 
        DetailPost, 
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
        
        
    },
    created() { 
        this.getFilm(this.id);
        this.message = ""; 
    }, 
};
</script>

<style scoped>
.page {
     text-align: left;
     max-width: 1200px;
 }
</style>