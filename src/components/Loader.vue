<template>
    <div>
        <div class="pre-loader" v-if="Loader.showLoader">
            <img class="loading" :src="img_loader" alt="loading" />
            <div class="bar"></div>
        </div>
    </div>
</template>
<script>
export default{
    name: "loader",
    props: ['loader'],
    data(){
        return{
            img_loader: require('@/assets/Aguia.png'),
        }
    },
    watch: {
        '$appName' () {
            this.loader = this.$appName
        }
    }
}
</script>

<style scoped>
    .pre-loader {
        position: fixed;
        z-index: 99999;
        top:0;
        left: 0;
        background-color: #ffffff;
        opacity: 0.8;
        width: 100%;
        height: 100%;
    }

    img {
        width: 30%;
        height: 30%;
        padding:20px;
        box-sizing: border-box;
        position: absolute;
        left: 35%;
        top: 35%;
    }

    .bar
    {
        margin-top: 30%;
        margin-left: 41%;
        height: 0.4rem;
        width: 23rem;
        background: #b3b3b3;
    }
    .bar::after
    {
        content: "";
        width: 3rem;
        height: 0.4rem;
        background: #3e3a91;
        display: block;
        border-radius: 0.5rem;
        animation: animation 2s cubic-bezier(0.65, 0.05, 0.36, 1) infinite;
    }

    @keyframes animation {
    0% {
        transform: translateX(0rem);
    }
    100% {
        transform: translateX(20rem);
    }
  }

</style>
