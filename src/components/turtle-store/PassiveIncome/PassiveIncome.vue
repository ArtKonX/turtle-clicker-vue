<template>
    <div class="shop__list">
        <div class="shop__cart" v-for="value in dataShop[0].list" :key="value.id">
            <div class="shop__cart-info" style="text-align: start;">
                {{ value.title }}
                <div class="level-and-price" style="text-align: start;">
                    <span>
                        Уровень: {{ store.incomeData[value.id].level }}
                    </span>
                    <span v-if="store.incomeData[value.id].level < dataShop[0].maxLevel">
                        Цена: {{ (store.incomeData[value.id].ratioPrice * value.price).toFixed(0) > 1000 ? ((store.incomeData[value.id].ratioPrice * value.price).toFixed(0) / 1000).toFixed(0) + 'k' : (store.incomeData[value.id].ratioPrice * value.price).toFixed(1) }}
                    </span>
                </div>
            </div>
            <div class="income-and-btn">
                <span class="income">
                    Доход: {{ (store.incomeData[value.id].ratioBonus * value.income).toFixed(0) > 1000 ?
                        (Number((store.incomeData[value.id].ratioBonus * value.income).toFixed(0)) / 1000).toFixed(0) + 'k'
                        : (store.incomeData[value.id].ratioBonus * value.income).toFixed(1) }}
                </span>
                <button class="shop__btn" @click="store.buyIncome(value.income, value.price, value.id)"
                    :disabled="(value.price > store.score) || (store.incomeData[value.id].level >= dataShop[0].maxLevel)">
                    {{ (store.incomeData[value.id].level < dataShop[0].maxLevel) ? 'Купить' : 'Max' }} </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useGameStore } from '../../../store/gameStore';
import { reactive } from 'vue';

const store = useGameStore();

const dataShop = reactive([
    {
        id: 0,
        titleRu: 'Пассивный доход',
        titleEng: 'passiveIncome',
        isShow: true,
        maxLevel: 22,
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
    }
]);
</script>

<style lang="scss" scoped>
.shop__list {
    display: flex;
    flex-direction: column;
    align-items: start;
    max-height: 220px;
    overflow-y: auto;
    padding-right: 10px;
}

.shop__cart {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;

    @media screen and (max-width: 720px) {
        align-items: end;
    }
}

.shop__cart-info {
    display: flex;
    flex-direction: column;
    align-items: start;
}

.level-and-price {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 5px;

    span:nth-child(2) {
        margin-left: 10px;
    }
}

.income-and-btn {
    display: flex;
    align-items: center;

    @media screen and (max-width: 720px) {
        flex-direction: column;
        align-items: end;
    }
}

.income {
    border-radius: 8px;
    border: 1px solid transparent;
    font-size: 1em;
    font-weight: 500;
    color: white;
    opacity: 0.6;
    max-width: 100px;
    margin-bottom: 3px;
    margin-right: 5px;

    @media screen and (max-width: 720px) {
        margin-right: 0px;
    }
}

.shop__btn {
    padding: 10px;
    background-color: #1A1A1A;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}
</style>