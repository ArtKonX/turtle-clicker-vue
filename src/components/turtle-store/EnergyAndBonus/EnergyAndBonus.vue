<template>
    <div class="energy-and-bonus-container">
        <div class="energy-and-bonus">
            <span>
                Восстановить энергию:
            </span>
            <button @click="store.restoreEnergy" :disabled="store.numberRestoreEnergy <= 0">
                {{ store.numberRestoreEnergy > 0 ? `Осталось ${store.numberRestoreEnergy} раз` : `Восстановление через:
                ${timeLeft}` }}
            </button>
        </div>
        <div class="energy-and-bonus">
            <div style="display: flex; flex-direction: column; align-items: start;">
                <span>
                    Купить дополнительные 100 энергии:
                </span>
                <div class="level-and-price">
                    <span>
                        Уровень: {{ store.energyAndBonusData[0].level }}
                    </span>
                    <span v-if="store.energyAndBonusData[0].level < 22">
                        Цена: {{ store.energyAndBonusData[0].level * 100 }}
                    </span>
                </div>
            </div>
            <button @click="store.buyPartOfEnergy" :disabled="store.score < (store.energyAndBonusData[0].level * 100) || store.energyAndBonusData[0].level >= 22">
                {{store.energyAndBonusData[0].level < 22 ? 'Купить' : 'Max'}}
            </button>
        </div>
        <div class="energy-and-bonus">
            <div style="display: flex; flex-direction: column; align-items: start;">
                <span>
                    Увеличь бонус с каждого тапа:
                </span>
                <div class="level-and-price">
                    <span>
                        Уровень: {{ store.energyAndBonusData[1].level }}
                    </span>
                    <span v-if="store.energyAndBonusData[1].level < 22">
                        Цена: {{ store.energyAndBonusData[1].level * 100 }}
                    </span>
                </div>
            </div>
            <button @click="store.buyBonus" :disabled="store.score < (store.energyAndBonusData[1].level * 100) || store.energyAndBonusData[1].level >= 22">
                {{store.energyAndBonusData[1].level < 22 ? 'Купить +1' : 'Max'}}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useGameStore } from '../../../store/gameStore';
import { ref } from 'vue';
import { onUnmounted, onMounted } from 'vue';

const store = useGameStore();

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

    store.restoreNumberEnergy();

    const date = new Date();

    console.log(date.getMonth(), date.getDate(), date.getFullYear())

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timeLeft.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

let timerInterval = null;

onMounted(() => {
    timerInterval = window.setInterval(calculateTimeLeft, 1000);
});

onUnmounted(() => {
    if (timerInterval) {
        window.clearInterval(timerInterval);
        timerInterval = null;
    }
});
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
</style>