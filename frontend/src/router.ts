import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Blog from './views/Blog.vue';
import Post from "./views/Post.vue";

Vue.use(Router);

const routes = () => {
    switch (true) {
        case location.hostname.replace('127.0.0.1.nip.io', '').match(/[A-Za-z0-9]*\./i) !== null:
            return [
                {
                    path: '/',
                    name: 'blog',
                    component: Blog,
                },
                {
                    path: '/:postid',
                    name: 'post',
                    component: Post,
                },
            ];
        default:
            return [
                {
                    path: '/',
                    name: 'home',
                    component: Home,
                }];
    }


};

export default new Router({
    routes: routes(),
});
