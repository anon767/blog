<template>
    <div class="home">
        <HomeView/>
    </div>
</template>
<style src="../assets/css/home.css"></style>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import HomeView from "@/components/HomeView";

    @Component({
        components: {
            HomeView,
        },
    })
    export default class Home extends Vue {
    }
</script>
