<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Review Film</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'reviewfilm' }" class="nav-link">
                    Bài đăng
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
        </div>
        
        <div class="mr-right navbar-nav">
            <li class="nav-item ">
                <router-link :to="{ name: 'film.login' }" class="nav-link">
                    <i class="fa-solid fa-user"></i>
                     Đăng nhập
                </router-link>
            </li>
        </div>
    </nav>
</template>