<template>
    <div class="logo-loader">
        <img src="/img/logo-red.png" />
    </div>
</template>

<script>

export default {
    name: "LogoLoader"
}
</script>

<style lang="scss" scoped>
.logo-loader {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;

    img {
        width: 10rem;
    }
}
</style>