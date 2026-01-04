<template>
    <div class="title-and-shop">
        <h1>Тортильник</h1>
        <HeaderStoreBtn />
    </div>
</template>

<script setup>
import HeaderStoreBtn from './HeaderStoreBtn/HeaderStoreBtn.vue'
</script>

<style lang="scss" scoped>
.clicker-container {
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Arial', sans-serif;
    padding: 20px 0;
    box-sizing: border-box;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.title-and-shop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgb(6, 54, 2);
    width: 100%;
    margin-bottom: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    border-radius: 20px;

    @media screen and (max-width: 720px) {
        & {
            padding: 10px 20px;
        }

        h1 {
            font-size: 1.2rem;
        }

        button {
            font-size: 1.2rem !important;
        }
    }

    button {
        background: rgb(226, 226, 226) !important;
        color: rgb(6, 54, 2) !important;
    }

    h1 {
        color: rgb(226, 226, 226) !important;
    }
}
</style>