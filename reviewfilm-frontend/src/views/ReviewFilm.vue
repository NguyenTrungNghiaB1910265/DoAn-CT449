<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                <i class="fa-solid fa-bars"></i>
                Danh sách bài đăng
            </h4>
            <FilmList v-if="filteredFilmsCount > 0" :films="filteredFilms"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có bài đăng nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <router-link 
                    :to="{
                        name: 'film.add',
                    }" 
                >
                    <button class="btn btn-sm btn-success" @click="goToAddFilm">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button>
                </router-link> 
                <button class="btn btn-sm btn-danger" @click="removeAllFilms">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeFilm">
                <h4>
                    Chi tiết bài đăng
                    <i class="fas fa-address-card"></i>
                </h4>
                <router-link 
                    :to="{
                        name: 'film.edit', 
                        params: { id: activeFilm._id }, 
                    }" 
                >
                    <button class="btn btn-sm btn-warning">
                        <i class="fas fa-edit"></i> Chỉnh sửa
                    </button>
                </router-link>
                <FilmCard :film="activeFilm" />
                
            </div>
        </div>
    </div>
</template> 
<script>
import FilmCard from "@/components/FilmCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import FilmList from "@/components/FilmList.vue";
import FilmService from "@/services/Film.service";
export default {
    components: {
        FilmCard,
        InputSearch,
        FilmList,
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
     max-width: 750px;
 }
</style>