<template>
    <div class="stats">
        <p>{{ store.score.toFixed(1) }}</p>
        <div class="level-progress">
            <div class="level-progress-fill" :style="{ width: `${getLevelProgress().progress}%` }"></div>
            <span class="level-progress-text">
                {{ store.level }} lvl.
            </span>
        </div>

        <div class="energy-progress">
            <div class="energy-progress-fill" :style="{ width: `${getEnergyProgress().progress}%` }"></div>
            <span class="energy-progress-text">
                {{ store.energy }} ⚡
            </span>
        </div>
        <p>{{ store.bonusMultiplier }}👇</p>
        <p>×{{ store.incomeAll.toFixed(1) }}/ч.</p>
    </div>
</template>

<script setup>
import { useGameStore } from '../../store/gameStore';

const store = useGameStore();

const levelsProgress = Array.from({ length: 9999 }).map((_, indx) => (indx + 1) * 550);

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
</script>

<style lang="scss" scoped>
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
    position: relative !important;
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
</style>