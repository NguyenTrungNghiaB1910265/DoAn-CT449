import { createWebHistory, createRouter } from "vue-router"; 
import ReviewFilm from "@/views/ReviewFilm.vue";
import Home from "@/views/Home.vue";

const routes = [ 
    { 
        path: "/admin", 
        name: "reviewfilm", 
        component: ReviewFilm, 
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/films/:id",
        name: "film.edit",
        component: () => import("@/views/FilmEdit.vue"),
        props: true // Truyen cac bien trong $route.params vao lam props
    },
    {
        path: "/films",
        name: "film.add",
        component: () => import("@/views/FilmAdd.vue"),
    },
    // FRONT-END
    { 
        path: "/", 
        name: "home", 
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/detail/:id",
        name: "film.detail",
        component: () => import("@/views/FilmDetail.vue"),
        props: true
    },
];
const router = createRouter({ 
    history: createWebHistory(import.meta.env.BASE_URL), 
    routes, 
}); 

export default router;