<script> 
export default { 
    props: { 
        film: { type: Object, required: true }, 
    }, 
};
</script> 
<template> 
    <div>
        <div class="p-1"> 
            <strong>Tên:</strong> 
            {{ film.name }}
        </div>
        <div class="p-1"> 
            <strong>Thời lượng:</strong> 
            {{ film.time }} phút
        </div> 
        <div class="p-1"> 
            <strong>Đạo diễn:</strong> 
            {{ film.director }} 
        </div>
        <div class="p-1"> 
            <strong>Quốc gia:</strong> 
            {{ film.nation }} 
        </div> 
        <div class="p-1"> 
            <strong>Thể loại:</strong> 
            {{ film.category }} 
        </div> 
        <div class="p-1"> 
            <strong>Khởi chiếu:</strong> 
            {{ film.premiere }} 
        </div> 
        <div class="p-1"> 
            <strong>Nội dung:</strong> 
            {{ film.description }} 
        </div> 
        <div class="p-1"> 
            <img :src="film.imageURL" class="img-fluid" alt="Responsive image">
        </div> 
        <!-- <div class="p-1"> 
            <strong>Bài viết yêu thích:&nbsp;</strong>
            <i v-if="film.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div> -->
    </div>
</template>