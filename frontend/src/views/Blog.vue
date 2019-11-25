<template>
    <div class="blog">
        <BlogView/>
    </div>
</template>

<style src="../assets/css/blog.css"></style>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import BlogView from '@/components/BlogView.ts';

    @Component({
        components: {
            BlogView,
        },
    })
    export default class Blog extends Vue {
    }
</script>
