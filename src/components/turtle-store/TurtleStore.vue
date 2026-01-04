<template>
    <div v-if="store.isShowMenu" class="shop-container">
        <div class="shop">
            <div>
                <div class="btn-close-containter">
                    <button class="btn-close" @click="store.toggleMenu">
                        x
                    </button>
                </div>
                <h2 class="shop__title">
                    {{ dataShop[showCatalogIndx].titleRu }}
                </h2>
            </div>
            <PassiveIncome v-if="dataShop[showCatalogIndx].id === 0" />
            <EnergyAndBonus v-if="dataShop[showCatalogIndx].id === 1" />
            <SkinsShop v-if="dataShop[showCatalogIndx].id === 2" />
            <div class="shop-btns">
                <button v-for="value in btnsShopData" :disabled="showCatalogIndx === value.id"
                    @click="selectIndxMenu(value.id)">
                    {{ value.text }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import PassiveIncome from './PassiveIncome/PassiveIncome.vue'
import EnergyAndBonus from './EnergyAndBonus/EnergyAndBonus.vue'
import SkinsShop from './SkinsShop/SkinsShop.vue'

import { useGameStore } from '../../store/gameStore';

import { reactive, ref } from 'vue';

const store = useGameStore();

const btnsShopData = reactive([
    {
        id: 0,
        text: 'Доход'
    },
    {
        id: 1,
        text: 'Энергия и бонус'
    },
    {
        id: 2,
        text: 'Скины'
    }
])

const dataShop = reactive([
    {
        id: 0,
        titleRu: 'Пассивный доход',
        titleEng: 'passiveIncome',
        isShow: true
    },
    {
        id: 1,
        titleRu: 'Восстановление энергии и бонус',
        titleEng: 'energy',
        isShow: true
    },
    {
        id: 2,
        titleRu: 'Переодень черепаху',
        titleEng: 'skins',
        isShow: true
    }
])

const showCatalogIndx = ref(0);

const isShowMenu = ref(false);

function selectIndxMenu(indx) {
    showCatalogIndx.value = indx
}
</script>

<style lang="scss" scoped>
.shop-container {
    position: fixed;
    background: #00000079;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    z-index: 1001;

    .btn-close-containter {
        text-align: end;
    }

    button {
        background-color: #1A1A1A;
        color: white;
    }

    .shop__title {
        margin: 0;
        padding: 0px 0 15px;
    }

    .shop {
        background: rgb(65, 65, 65);
        min-height: 440px;
        box-sizing: border-box;
        height: auto;
        border-radius: 15px;
        padding: 15px;
        margin: 15px;
        max-width: 700px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: white;

        .shop__list {
            display: flex;
            flex-direction: column;
            align-items: start;
            margin-bottom: 10px;

            .shop__cart {
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin-top: 10px;

                .shop__cart-info {
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                }
            }
        }
    }
}

.shop-btns {
    display: flex;
    justify-content: space-between;

    button {
        background-color: #1A1A1A;
        color: white;
    }

    button:disabled {
        opacity: 0.6;
    }

    @media screen and (max-width: 720px) {

        button {
            font-size: 0.9rem !important;
        }
    }
}
</style>