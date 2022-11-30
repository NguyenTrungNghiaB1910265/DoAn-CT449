<script> 
export default { 
    props: { 
        films: { type: Array, default: [] }, 
        activeIndex: { type: Number, default: -1 }, 
    },
    emits: ["detail:activeIndex"], 
    methods: { 
        detailActiveIndex(index) { 
            this.$emit("detail:activeIndex", index); 
        } 
    } 
};
</script> 
<template> 
    
    <div class="row mt-3">
        <div class="col-md-3 d-flex justify-content-center" 
            v-for="(film, index) in films" 
                :key="film._id" 
                    :class="{ active: index === activeIndex }" 
                        @click="detailActiveIndex(index)"
        >
            <div class="card rounded-lg shadow p-3 mb-4 bg-white" style="width: 18rem;">
                <img :src="film.imageURL" class="card-img-top rounded-lg" alt="..." style="height: 130px;">
                <div class="card-body">
                    <h5 class="card-title" style="height: 150px;">{{ film.name }}</h5>
                    <router-link :to="{name:'film.detail', params: {id: film._id }}">
                        <button class="btn btn-primary"><i class="fa-solid fa-circle-info"></i> Xem thêm</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script> 