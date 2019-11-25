<template>
    <div class="blog">
        <ShowPost/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ShowPost from "@/components/Post/ShowPost";

    @Component({
        components: {
            ShowPost: ShowPost,
        },
    })
    export default class Post extends Vue {
    }
</script>
