<template>
    <div class="skins-shop-container">
        <div v-for="value in dataSkins" :key="value.id" class="skins-shop" :id="value.id">
            <img :src="value.src" alt="Черепаха" />
            <div class="skins-shop__info-container">
                <div class="skins-shop__info">
                    <span v-if="value.price && !store.purchasedSkinsIds.includes(value.id)">
                        Цена: {{ value.price }}
                    </span>
                    <span v-if="!value.secret">
                        {{ value.info }}
                    </span>
                    <span v-if="value.secret && !store.purchasedSkinsIds.includes(value.id)">
                        {{ value.info }}
                    </span>
                    <span v-if="value.secret && store.purchasedSkinsIds.includes(value.id)">
                        {{ value.secretInfo }}
                    </span>
                </div>
                <button :disabled="(value.price > store.score && !store.purchasedSkinsIds.includes(value.id)) ||
                    value.id === store.selectedSkinIndx ||
                    ((value.priceLevel > store.level) && !store.purchasedSkinsIds.includes(value.id))
                    "
                    @click="actionSkin(store.purchasedSkinsIds.includes(value.id) ? 1 : value.secret ? 2 : 0, value.id)">
                    {{
                        store.purchasedSkinsIds.includes(value.id)
                            ? value.id === store.selectedSkinIndx
                                ? 'Выбран'
                                : 'Примерить'
                            : value.priceLevel ? 'Открыть' : 'Купить'
                    }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useGameStore } from '../../../store/gameStore';
import { reactive } from 'vue';

const store = useGameStore();

const dataSkins = reactive([
    {
        id: 0,
        price: 0,
        src: 'src/assets/turtle.png',
        info: 'Обычная черепаха'
    },
    {
        id: 1,
        price: 8888,
        src: 'src/assets/turtle-2.png',
        info: 'Трик в черепашьем измерении'
    },
    {
        id: 2,
        price: 300,
        src: 'src/assets/turtle-3.png',
        info: 'Одна из трехсот черепахоспартанцев'
    },
    {
        id: 3,
        price: 4444,
        src: 'src/assets/turtle-4.png',
        info: 'Говорят, что отец этой черепахи - крыса'
    },
    {
        id: 4,
        price: 99999,
        src: 'src/assets/turtle-5.png',
        info: 'По рассказам ИИ эта черепаха жила в матрице'
    },
    {
        id: 5,
        price: null,
        priceLevel: 5500,
        src: 'src/assets/turtle-6.png',
        info: 'Купи за 9999 уровней, чтобы расскрыть X-материал!',
        secretInfo: 'I WANT TO BELIEVE in Turtilnick 2.0',
        secret: true
    }
]);

function actionSkin(type, indx) {
    if (type === 0) {
        buySkinTurtle(indx);
    } else if (type === 1) {
        selectSkin(indx);
    } else if (type === 2) {
        buySecretGame(indx)
    }
}

function buySkinTurtle(indx) {
    if (store.score >= dataSkins[indx].price) {
        store.buySkin(indx, dataSkins[indx].price);
    }
}

function selectSkin(indx) {
    store.selectSkin(indx);
}

function buySecretGame(indx) {
    if (store.level >= 5500) {
        store.buySecret(indx, 5500)
    }
}

</script>

<style lang="scss" scoped>
.skins-shop-container {
    height: 280px;
    overflow-y: auto;
    padding-right: 20px;
}

.skins-shop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 2px solid black;
    margin-bottom: 20px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    min-height: 179px;

    button {
        background-color: #1A1A1A !important;
        color: white;
    }

    img {
        width: 150px;
        height: 100%;
        position: relative;
    }

    &:nth-child(6) {
        img {
            filter: brightness(10%);
        }
    }

    @media screen and (max-width: 720px) {
        img {
            width: 100px;
        }
    }
}

.skins-shop__info-container {
    display: flex;
    align-items: center;
    width: 100%;

    .skins-shop__info {
        display: flex;
        flex-direction: column;
        width: 100%;

        span {
            width: 100%;
        }
    }

    @media screen and (max-width: 720px) {
        flex-direction: column;

        button {
            margin-top: 10px;
        }
    }
}

button:disabled {
    opacity: 0.6;

    &:hover {
        cursor: auto;
    }
}
</style>