<template>
    <div class="clicker-container">

        <!-- Логотип вместе с кнопкой магазина -->
        <Header />

        <!-- Сам магазин -->
        <TurtleStore v-if="store.isShowMenu" />

        <!-- Статистика количества монет, уровня и др.  -->
        <Stats />

        <!-- Отображение самой черепахи -->
        <div class="turtle-container">
            <div class="turtle"
                :class="{ 'shake': isShaking, 'active': store.energy > 0 && store.energy > store.bonusMultiplier }"
                @touchstart="handleTouchStart" @click="handleClick">
                <img :src="dataSkins[store.selectedSkinIndx].src" alt="Черепаха" />
            </div>
        </div>

        <!-- Отображение монет -->
        <div v-for="coin in activeCoins" :key="coin.id" class="coin-animation" :style="{
            left: `${coin.x}px`,
            top: `${coin.y}px`,
        }">
            <img src="@/assets/coin.png" alt="Монета" class="coin-img" />
        </div>
    </div>
</template>

<script setup>
import { useGameStore } from '../../store/gameStore';
import { reactive, ref } from 'vue';
import { onUnmounted, onMounted } from 'vue';

import Header from '../header/Header.vue';
import TurtleStore from '../turtle-store/TurtleStore.vue';
import Stats from '../Stats/Stats.vue';

import turtle1 from '@/assets/turtle.png'
import turtle2 from '@/assets/turtle-2.png'
import turtle3 from '@/assets/turtle-3.png'
import turtle4 from '@/assets/turtle-4.png'
import turtle5 from '@/assets/turtle-5.png'
import turtle6 from '@/assets/turtle-6.png'

const store = useGameStore();
const activeCoins = ref([]);

const isShowMenu = ref(false);

const sectionMenu = ref(0);

const isShaking = ref(false)

const timeLeft = ref('00:00:00');

function calculateTimeLeft() {
    const now = new Date();
    const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0
    );


    const distance = endOfDay - now;

    if (distance <= 0) {
        timeLeft.value = '00:00:00';
        return;
    }

    if (timeLeft.value === '00:00:01') {
        store.restoreNumberEnergy()
    }

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);


    timeLeft.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function handleTouchStart(event) {

    const touches = event.touches;

    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];

        if (store.energy > 0 && store.energy >= store.bonusMultiplier) {
            store.click();

            createCoinAtTouch(touch);
        }
    }
}

function createCoinAtTouch(touch) {
    const containerEl = document.querySelector('.clicker-container');
    const containerRect = containerEl.getBoundingClientRect();

    const coinX = touch.clientX;
    const coinY = touch.clientY - containerRect.top - 130;

    const coin = {
        id: Date.now() + Math.random() + i,
        x: coinX,
        y: coinY,
        delay: Math.random() * 0.2,
    };

    activeCoins.value.push(coin);

    setTimeout(() => {
        activeCoins.value = activeCoins.value.filter(c => c.id !== coin.id);
    }, 1500);
}

let timerInterval = null;

onMounted(() => {

    timerInterval = window.setInterval(calculateTimeLeft, 1000);

    const turtleEl = document.querySelector('.turtle');

    turtleEl.addEventListener('touchstart', handleTouchStart, { passive: false });
    turtleEl.addEventListener('click', handleClick);
});

onUnmounted(() => {

    if (timerInterval) {
        window.clearInterval(timerInterval);
        timerInterval = null;
    }

    const turtleEl = document.querySelector('.turtle');
    turtleEl.removeEventListener('touchstart', handleTouchStart);
    turtleEl.removeEventListener('click', handleClick);
});

const showCatalogIndx = ref(0);

const levelsProgress = Array.from({ length: 9999 }).map((_, indx) => (indx + 1) * 550);

const dataSkins = reactive([
    {
        id: 0,
        price: 0,
        src: turtle1,
        info: 'Обычная черепаха'
    },
    {
        id: 1,
        price: 8888,
        src: turtle2,
        info: 'Трик в черепашьем измерении'
    },
    {
        id: 2,
        price: 300,
        src: turtle3,
        info: 'Одна из трехсот черепахоспартанцев'
    },
    {
        id: 3,
        price: 4444,
        src: turtle4,
        info: 'Говорят, что отец этой черепахи - крыса'
    },
    {
        id: 4,
        price: 99999,
        src: turtle5,
        info: 'По рассказам ИИ эта черепаха жила в матрице'
    },
    {
        id: 5,
        price: null,
        src: turtle6,
        info: 'Достигни 9999 уровня, чтобы расскрыть X-материал!',
        secretInfo: 'I WANT TO BELIEVE in Turtilnick 2.0',
        secret: true
    }
])

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
        isShow: true,
        list: [
            {
                id: 0,
                title: 'Реактивный ускоритель',
                level: 1,
                price: 100,
                income: 1
            },
            {
                id: 1,
                title: 'Технологии Рика',
                level: 1,
                price: 400,
                income: 2
            },
            {
                id: 2,
                title: 'Нейрочип',
                level: 1,
                price: 200,
                income: 1
            },
            {
                id: 3,
                title: 'Мотивация',
                level: 1,
                price: 150,
                income: 3
            }
        ]
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

setInterval(() => {
    store.addPartOfEnergy()
}, 2000)

setInterval(() => {
    store.checkScore(Number(store.incomeAll) / (60 * 60))
}, 1000)

function getLevelProgress() {
    const currentLevel = levelsProgress.findIndex(threshold => store.allScore < threshold);
    const level = currentLevel === -1 ? levelsProgress.length : currentLevel;
    const currentThreshold = levelsProgress[level - 1] || 0;
    const nextThreshold = levelsProgress[level] || currentThreshold * 2;

    store.saveLevel(level + 1);

    const progress = ((store.allScore - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return {
        level: level + 1,
        progress: Math.max(0, Math.min(100, progress))
    };
}

function getEnergyProgress() {

    const progress = ((store.energy / store.energyMax) * 100);

    return {
        progress: Math.max(0, Math.min(100, progress))
    };
}

function handleBeforeUnload() {
    store.saveLastDate();
}

window.addEventListener('beforeunload', handleBeforeUnload);

onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
});

onMounted(() => {
    if (store.lastSaveTime && store.incomeAll !== 0) {
        const passedSeconds = Math.floor((new Date() - new Date(store.lastSaveTime)) / 1000);
        store.saveScore(store.score + (passedSeconds * (store.incomeAll / 3600)))
    }
})

function bugSkinTurtle(indx) {
    if (store.score >= dataSkins[indx].price) {
        store.buySkin(indx, dataSkins[indx].price)
    }
}

function selectSkin(indx) {
    store.selectSkin(indx)
}

function actionSkin(type, indx) {
    if (type === 0) {
        this.bugSkinTurtle(indx)
    } else if (type === 1) {
        this.selectSkin(indx)
    } else {
        return null
    }
}

function toggleMenu() {
    isShowMenu.value = !isShowMenu.value
}

function selectIndxMenu(indx) {
    showCatalogIndx.value = indx
}

function handleClick(event) {
    if (store.energy > 0 && store.energy >= store.bonusMultiplier) {
        store.click();

        isShaking.value = true;

        const turtleEl = document.querySelector('.turtle');
        const containerEl = document.querySelector('.clicker-container');

        const clickX = event.clientX - 80;
        const clickY = event.clientY - 50;

        const containerRect = containerEl.getBoundingClientRect();

        const coinX = clickX;
        const coinY = clickY - containerRect.top - 130;

        const coin = {
            id: Date.now() + Math.random(),
            x: coinX,
            y: coinY,
            delay: Math.random() * 0.2,
        };

        activeCoins.value.push(coin);

        setTimeout(() => {
            isShaking.value = false
        }, 100)

        setTimeout(() => {
            activeCoins.value = activeCoins.value.filter(c => c.id !== coin.id);
        }, 1500);
    }
}
</script>

<style lang="scss" scoped>
.energy-and-bonus-container {
    margin-bottom: 10px;
}

.energy-and-bonus {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    span {
        text-align: start;

        @media screen and (max-width: 720px) {

            & {
                max-width: 220px;
            }
        }
    }
}

.level-progress {
    position: relative;
    width: 100%;
    max-width: 150px;
    margin: 8px 5px;
    font-size: 1.1rem;
    font-weight: 600;
    font-style: italic;
    background: rgb(0, 0, 0);
    color: rgb(6, 54, 2);
    border: 2px solid rgb(6, 54, 2);
    transition: all 0.4s ease-out;
    cursor: pointer;
    position: relative;

    @media screen and (max-width: 720px) {

        & {
            max-width: 90px;
        }
    }

    &:hover {
        transform: scale(1.05);
    }

    .level-progress-fill {
        height: 100%;
        position: absolute;
        background: linear-gradient(to right, rgb(15, 129, 5), rgb(6, 54, 2));
        transition: width 0.3s ease-out;
    }

    .level-progress-text {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(255, 255, 255);

        @media screen and (max-width: 720px) {

            & {
                font-size: 0.7rem !important;
                padding: 0px !important;
                flex-direction: column;
            }
        }
    }
}

.energy-progress {
    position: relative;
    width: 100%;
    max-width: 220px;
    margin: 8px 5px;
    font-size: 1.1rem;
    font-weight: 600;
    font-style: italic;
    background: rgb(0, 0, 0);
    color: rgb(6, 54, 2);
    border: 2px solid rgb(6, 54, 2);
    transition: all 0.4s ease-out;
    cursor: pointer;
    position: relative;

    @media screen and (max-width: 720px) {

        & {
            max-width: 80px !important;
        }
    }

    &:hover {
        transform: scale(1.05);
    }

    .energy-progress-fill {
        height: 100%;
        position: absolute;
        background: linear-gradient(to right, rgb(15, 129, 5), rgb(6, 54, 2));
        transition: width 0.3s ease-out;
    }

    .energy-progress-text {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(255, 255, 255);

        @media screen and (max-width: 720px) {

            & {
                font-size: 0.7rem !important;
                padding: 0px !important;
                flex-direction: column;
            }
        }
    }
}

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

.stats {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;

    @media screen and (max-width: 720px) {

        p {
            font-size: 0.7rem !important;
            padding: 5px !important;
            flex-direction: column;
        }
    }

    p {
        margin: 8px 5px;
        padding: 7px;
        font-size: 1.1rem;
        align-items: center;
        justify-content: center;
        display: flex;
        font-weight: 600;
        font-style: italic;
        background: linear-gradient(to right, rgb(15, 129, 5), rgb(6, 54, 2));
        color: white;
        border: 2px solid rgb(6, 54, 2);
        transition: all 0.4s ease-out;
        cursor: pointer;

        &:hover {
            transform: scale(1.05);
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

    @media screen and (max-width: 720px) {

        button {
            font-size: 0.9rem !important;
        }
    }
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

.skins-shop__info-container {
    display: flex;
    align-items: center;
    width: 100%;

    .skins-shop__info {
        width: 100%;

        span {
            width: 100%;
        }
    }

    @media screen and (max-width: 720px) {
        & {
            flex-direction: column;
        }

        button {
            margin-top: 10px;
        }
    }
}

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
        background-color: #1A1A1A;
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

    &__info {
        display: flex;
        flex-direction: column;
        margin: 0 10px;
    }
}

.turtle-container {
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    // margin-top: 25%;
    bottom: -25%;

    @media screen and (max-width: 720px) {
        & {
            bottom: -20%;
        }
    }
}

.shake {
    transform: scale(1.05);
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0) scale(1);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translateX(-5px) scale(1.05);
    }

    20%,
    40%,
    60%,
    80% {
        transform: translateX(5px) scale(1.05);
    }
}

.turtle {
    cursor: pointer;
    transition: transform 0.1s;
    position: relative;
    touch-action: manipulation;

    img {
        object-fit: contain;
        height: 280px;
        max-width: 400px;
        width: auto;

        @media screen and (max-width: 720px) {
            & {
                max-width: 300px;
            }
        }
    }

    .overlay {
        position: absolute;
        top: -25px;
        left: -25px;
        width: 120%;
        height: 120%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: white;

        button {
            margin-top: 10px;
            padding: 5px 10px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    }
}

.income {
    margin-right: 10px;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    transition: border-color 0.25s;
    opacity: 0.6;
    color: white;
    margin-bottom: 5px;
}

.income-and-btn {
    @media screen and (max-width: 720px) {
        & {
            display: flex;
            align-items: center;

            button {
                font-size: 0.9rem !important;
            }
        }
    }
}

.btn-close-containter {
    text-align: end;
}

.shop-btn {

    h3 {
        margin-bottom: 10px;
        color: white;
    }

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
        background: #2196F3;

        &:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    }
}

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

.coin-animation {
    position: absolute;
    z-index: 1000;
    height: 40%;
    bottom: 0;
    pointer-events: none;
    padding-bottom: 50px;
    z-index: 10;
    animation: coin-float 1.5s ease-in-out;
}

.coin-img {
    width: 100px;
    height: 100px;
    filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
    animation: coin-glow 1s infinite alternate;

    @media screen and (max-width: 720px) {
        & {
            width: 70px;
            height: 70px;
        }
    }
}

@keyframes coin-float {
    0% {
        opacity: 0;
        transform: scale(0.2) translateY(0);
    }

    20% {
        opacity: 1;
        transform: scale(1) translateY(-10px);
    }

    80% {
        opacity: 1;
        transform: scale(1.1) translateY(-80px);
    }

    100% {
        opacity: 0;
        transform: scale(1.5) translateY(-100px);
    }
}

@keyframes coin-glow {
    0% {
        filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
    }

    100% {
        filter: drop-shadow(0 0 8px rgba(255, 215, 0, 1)) drop-shadow(0 0 15px rgba(255, 215, 0, 0.7));
    }
}

button:disabled {
    opacity: 0.6;
}
</style>