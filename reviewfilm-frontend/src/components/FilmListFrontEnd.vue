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
    
    <div class="row">
        <div class="col-6 col-md-4 d-flex justify-content-center" 
            v-for="(film, index) in films" 
                :key="film._id" 
                    :class="{ active: index === activeIndex }" 
                        @click="detailActiveIndex(index)"
        >
            <div class="card mt-10" style="width: 18rem;">
                <img :src="film.imageURL" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ film.name }}</h5>
                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                    <router-link :to="{name:'film.detail', params: {id: film._id }}">
                        <button class="btn btn-primary ">Xem thêm</button>
                    </router-link>
                    
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script> 