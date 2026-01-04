<template>
    <div class="shop-btn">
        <button @click="store.toggleMenu">
            Магазин
        </button>
    </div>
</template>

<script setup>
import { useGameStore } from '../../../store/gameStore';

const store = useGameStore();
</script>

<style lang="scss" scoped>
.shop-btn {

    button {
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin: 8px 0;
        color: white;
        padding: 7px;
        font-size: 1.5rem;
        border-radius: 15px;
        font-weight: 600;
        font-style: italic;
        background: rgb(226, 226, 226) !important;
        color: rgb(6, 54, 2) !important;

        &:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    }
}
</style>