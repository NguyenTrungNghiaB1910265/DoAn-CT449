<template>
    <div class="page row">
        <div class="col-md-12 mt-2">
            <InputSearch v-model="searchText" />
        </div>
        <div class="col-md-12 mt-2">
                <div class="row">
                    <div class="col-8">
                        <div id="carouselExampleCaptions shadow " class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                            </ol>
                            <div class="carousel-inner rounded-lg">
                                <div class="carousel-item rounded-lg active">
                                    <img src="https://ghienreview.com/wp-content/uploads/2022/03/Ghienreview-The-Adam-Project-02-min.jpg" class="d-block w-100 img-fluid" alt="0">
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Review phim The Adam Project – Chuyến du hành thời gian nhiều cảm xúc</h5>
                                    </div>
                                </div>
                                <div class="carousel-item rounded-lg">
                                    <img src="https://ghienreview.com/wp-content/uploads/2022/03/Ghienreview-The-Batman-2022-02-min-1024x576.jpg" class="d-block w-100 img-fluid" alt="1">
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Review phim The Batman (2022): Màn giải đố dài 3 tiếng đồng hồ</h5>
                                    </div>
                                </div>
                                
                            </div>
                            <button class="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </button>
                        </div>
                    </div>
                    <div class="col-4">
                        <div id="carouselExampleCaptions shadow " class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner rounded-lg row">
                                <div class="carousel-item rounded-lg  active">
                                    <img src="https://ghienreview.com/wp-content/uploads/2022/07/Ghienreview-Nguoi-moi-gioi-01-min.jpg" class="d-block w-100 img-fluid" alt="0">
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Review phim Người môi giới: Lời động viên đến những người bất hạnh</h5>
                                    </div>
                                </div>
                                <div class="carousel-item rounded-lg">
                                    <img src="https://ghienreview.com/wp-content/uploads/2022/03/Ghienreview-The-lost-city-04-min.jpeg" class="d-block w-100 img-fluid" alt="1">
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Review phim The Lost City – Hài nhảm nhạt nhòa uổng phí dàn cast xịn</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-inner rounded-lg row mt-3">
                                <div class="carousel-item rounded-lg active">
                                    <img src="https://ghienreview.com/wp-content/uploads/2022/07/Ghien-review-Thor-love-and-thunder-03-min-1024x640.jpg" class="d-block w-100 img-fluid" alt="2">
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Review phim Thor – Love and Thunder: Hành trình tìm tình yêu vội vã</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FilmListFrontEnd v-if="filteredFilmsCount > 0" :films="filteredFilms"/>
        </div>
    </div>
</template> 
<script>
import FilmCard from "@/components/FilmCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import FilmList from "@/components/FilmList.vue";
import FilmService from "@/services/Film.service";

import FilmCardFrontEnd from "@/components/FilmCardFrontEnd.vue";
import FilmListFrontEnd from "../components/FilmListFrontEnd.vue";

export default {
    components: {
    FilmCard,
    InputSearch,
    FilmList,
    FilmCardFrontEnd,
    FilmListFrontEnd
},
    data() {
        return {
            films: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText. 
        // Bỏ chọn phần tử đang được chọn trong danh sách. 
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng film thành chuỗi để tiện cho tìm kiếm. 
        filmStrings() {
            return this.films.map((film) => {
                const { name, time, director, nation, category, premiere, description } = film;
                return [name, time, director, nation, category, premiere, description].join("");
            });
        },
        // Trả về các film có chứa thông tin cần tìm kiếm. 
        filteredFilms() {
            if (!this.searchText) return this.films;
            return this.films.filter((_film, index) =>
                this.filmStrings[index].includes(this.searchText)
            );
        },
        activeFilm() {
            if (this.activeIndex < 0) return null;
            return this.filteredFilms[this.activeIndex];
        },
        filteredFilmsCount() {
            return this.filteredFilms.length;
        },
    },
    methods: {
        async retrieveFilms() {
            try {
                this.films = await FilmService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveFilms(); this.activeIndex = -1;
        }, 
        async removeAllFilms() { 
            if (confirm("Bạn muốn xóa tất cả bài đăng?")) { 
                try { 
                    await FilmService.deleteAll(); 
                    this.refreshList(); 
                } catch (error) { 
                    console.log(error); 
                } 
            } 
        }, 
        goToAddFilm() { 
            this.$router.push({ name: "film.add" }); 
        },
    }, 
    mounted() { 
        this.refreshList(); 
    },
    
};

</script> 

<style scoped>
.page {
     text-align: left;
     max-width: 1200px;
 }
</style>