import Vue from 'vue';
import Vuex from 'vuex';
import IBlog from "@/types/IBlog";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authorized: new Map<string, IBlog>()
    },
    mutations: {
        setAuthorizedBlog(state, blog: IBlog) {
            state.authorized.set(blog.id, blog);
        }
    },
    actions: {},
});
