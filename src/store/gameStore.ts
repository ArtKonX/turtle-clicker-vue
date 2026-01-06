import { defineStore } from 'pinia';

const STORAGE_KEY = 'gameStore';

function getInitialState() {
    try {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
            const parsed = JSON.parse(savedState);

            return {
                score: parsed.score ?? 0,
                level: parsed.level ?? 1,
                energy: parsed.energy ?? 100,
                energyMax: parsed.energyMax ?? 100,
                bonusMultiplier: parsed.bonusMultiplier ?? 1,
                incomeAll: parsed.incomeAll ?? 0,
                selectedSkinIndx: parsed.selectedSkinIndx ?? 0,
                lastSaveTime: parsed.lastSaveTime ?? null,
                purchasedSkinsIds: parsed.purchasedSkinsIds ?? [0],
                allScore: parsed.allScore ?? 0,
                numberRestoreEnergy: parsed.numberRestoreEnergy ?? 6,
                incomeData: parsed.incomeData ?? [
                    {
                        id: 0,
                        level: 1,
                        ratioBonus: 1.5,
                        ratioPrice: 1.3,
                    },
                    {
                        id: 1,
                        level: 1,
                        ratioBonus: 1.7,
                        ratioPrice: 1.1,
                    },
                    {
                        id: 2,
                        level: 1,
                        ratioBonus: 1.7,
                        ratioPrice: 1.2,
                    },
                    {
                        id: 3,
                        level: 1,
                        ratioBonus: 1.3,
                        ratioPrice: 1.7,
                    }
                ],
                energyAndBonusData: parsed.energyAndBonusData ?? [
                    {
                        id: 0,
                        level: 1,
                        ratioBonus: 100,
                        ratioPrice: 2,
                    },
                    {
                        id: 1,
                        level: 1,
                        ratioBonus: 1,
                        ratioPrice: 2,
                    }
                ],
                isShowMenu: false,
                lastTimeEnergyBonus: parsed.lastTimeEnergyBonus ?? 'not-save'
            };
        }
    } catch (e) {
        console.warn('Failed to parse saved state', e);
    }

    return {
        score: 0,
        allScore: 0,
        level: 1,
        energy: 100,
        energyMax: 100,
        bonusMultiplier: 1,
        incomeAll: 0,
        selectedSkinIndx: 0,
        lastSaveTime: null,
        purchasedSkinsIds: [0],
        numberRestoreEnergy: 6,
        incomeData: [
            {
                id: 0,
                level: 1,
                ratioBonus: 1.5,
                ratioPrice: 1.3,
            },
            {
                id: 1,
                level: 1,
                ratioBonus: 1.7,
                ratioPrice: 1.1,
            },
            {
                id: 2,
                level: 1,
                ratioBonus: 1.7,
                ratioPrice: 1.2,
            },
            {
                id: 3,
                level: 1,
                ratioBonus: 1.3,
                ratioPrice: 1.7,
            }
        ],
        energyAndBonusData: [
            {
                id: 0,
                level: 1,
                ratioBonus: 100,
                ratioPrice: 2,
            },
            {
                id: 1,
                level: 1,
                ratioBonus: 1,
                ratioPrice: 2,
            }
        ],
        isShowMenu: false,
        lastTimeEnergyBonus: 'not-save'
    };
}

export const useGameStore = defineStore('game', {
    state: () => getInitialState(),

    actions: {
        saveToStorage() {
            try {
                const state = JSON.stringify(this.$state);
                localStorage.setItem(STORAGE_KEY, state);
            } catch (e) {
                console.warn('Failed to save to localStorage', e);
            }
        },

        click() {
            if (this.energy > 0) {
                this.score += this.bonusMultiplier;
                this.allScore += this.bonusMultiplier
                this.energy -= this.bonusMultiplier;

                if (this.score % 100 === 0) {
                    this.level += 1;
                }

                this.saveToStorage();
            }
        },
        saveScore(score: number) {
            this.score = score;
            this.allScore = score;
            this.saveToStorage();
        },
        saveLastDate() {
            if (this.incomeAll > 0) {
                this.lastSaveTime = new Date()

                this.saveToStorage();
            }
        },

        restoreEnergy() {
            const date = new Date();

            this.energy = this.energyMax;
            this.numberRestoreEnergy -= 1;
            this.setLastEnergyBonus(date);
            this.saveToStorage();
        },

        addPartOfEnergy() {
            if (this.energy < this.energyMax) {
                this.energy += 1;
                this.saveToStorage();
            }
        },

        buyPartOfEnergy() {
            const energyData = this.energyAndBonusData[0];

            this.energyMax += 100;

            this.score -= (energyData.level * 100);

            this.energyAndBonusData[0] = {
                ...energyData,
                level: energyData.level + 1
            }

            this.saveToStorage();
        },

        buyBonus() {
            if (this.score >= 100) {
                const bonusData = this.energyAndBonusData[1];

                this.score -= (bonusData.level * 100);

                this.bonusMultiplier += 1;

                this.energyAndBonusData[1] = {
                    ...bonusData,
                    level: bonusData.level + 1
                }

                this.saveToStorage();
            }
        },

        buyIncome(income: number, price: number, id: number) {
            const findIndxIncome = this.incomeData.findIndex((income: { id: number; }) => income.id === id)
            if (findIndxIncome !== -1) {
                this.incomeData[findIndxIncome] = {
                    ...this.incomeData[findIndxIncome],
                    level: this.incomeData[findIndxIncome].level + 1,
                    ratioBonus: this.incomeData[findIndxIncome].ratioBonus * 1.5,
                    ratioPrice: this.incomeData[findIndxIncome].ratioPrice * 1.5
                }

                this.incomeAll += (income * this.incomeData[findIndxIncome].ratioBonus);
                this.score -= (price);
                this.saveToStorage();
            }
        },

        checkScore(coins: number) {
            if (this.incomeAll !== 0) {
                this.score += coins;
                this.allScore += coins;
                this.saveToStorage();
            }
        },

        buySkin(indx: number, price: number) {
            this.purchasedSkinsIds.push(indx)
            this.selectedSkinIndx = indx;
            this.score -= price;
            this.saveToStorage();
        },
        selectSkin(indx: number) {
            this.selectedSkinIndx = indx;
            this.saveToStorage();
        },
        saveLevel(level: number) {
            this.level = level;
            this.saveToStorage();
        },
        restoreNumberEnergy() {
            const date = new Date();

            if (this.lastTimeEnergyBonus !== 'not-save') {
                const dateLastEnergyBonus = new Date(this.lastTimeEnergyBonus);
                if ((dateLastEnergyBonus.getMonth() <= date.getMonth()) && (dateLastEnergyBonus.getFullYear() <= date.getFullYear()) && (dateLastEnergyBonus.getDate() < date.getDate())) {
                    this.numberRestoreEnergy = 6
                }
            }
        },
        toggleMenu() {
            this.isShowMenu = !this.isShowMenu
        },
        buySecret(indx: number, level: number) {
            this.purchasedSkinsIds.push(indx)
            this.selectedSkinIndx = indx;
            this.level = this.level - level;
            this.allScore = 0;
            this.score = 0;
            this.saveToStorage();
        },
        setLastEnergyBonus(date: Date) {
            this.lastTimeEnergyBonus = date;
            this.saveToStorage();
        }
    },
});