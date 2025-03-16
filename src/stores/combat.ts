import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { CombatTrack } from '../models/index';
import { rollDice } from '../composables/dice.ts';

export const useCombatStore = defineStore('combat', () => {
  
    const enemies = ref<Array<CombatTrack>>([]);
    const players = ref<Array<CombatTrack>>([]);
    const combatants = ref<Array<CombatTrack>>([]);
    const activeCombat = ref<boolean>(false);
    const activeIndex = ref<number>(0);

    const nextID = ref<number>(10);

    const addNewEnemy = () => {
        enemies.value.push({
            icon: './public/skull.png',
            id: nextID.value
        } as CombatTrack);
        nextID.value++;
    };
    
    const startCombat = () => {
        addEnemiesFromCount();
        rollInitative(enemies.value);
        combatants.value = [...enemies.value, ...players.value];
        combatants.value = sortByInitiative(combatants.value);
        generateIds();
        activeIndex.value = 0;
        activeCombat.value = true;
    };
    
    const rollInitative = (combatants : Array<CombatTrack>) => {
        for (let i = 0; i < combatants.length; i++) {
            combatants[i].iniative = rollDice(20, combatants[i].modifier, combatants[i].advantage)
        }
    };
    
    const addEnemiesFromCount = () => {
        let _enemies = [];
        for (let i = 0; i < enemies.value.length; i++) {
            let enemy = enemies.value[i];
            if (enemy.count && enemy.count > 1) {
                for (let j = 0; j < enemy.count; j++) {
                    let _enemy = { ...enemy};
                    _enemy.name += ` (${j + 1})`;
                    _enemies.push(_enemy);
                }
            } else {
                _enemies.push(enemy);
            }
        };
        enemies.value = _enemies;
    };
    
    const sortByInitiative = (arr: CombatTrack[]) => {
        return arr.sort((a, b) => {
            if (a.iniative === undefined) return 1;
            if (b.iniative === undefined) return -1;
            return b.iniative - a.iniative;
        });
    };

    const next = () => {
        if (activeIndex.value === combatants.value.length - 1) {
            activeIndex.value = 0
        } else {
            activeIndex.value++;
        }
    };

    const previous = () => {
        if (activeIndex.value === 0) {
            activeIndex.value = combatants.value.length - 1;
        } else {
            activeIndex.value--;
        }
    };

    const handleKeyBoard = (e: any) => {
        if (e.key == 'ArrowRight') {
            next();
        } else if (e.key == 'ArrowLeft') {
            previous();
        }
    };

    const generateIds = () => {
        for (let i = 0; i < combatants.value.length; i++) {
            combatants.value[i].id = i + 1;
        };
    };

    const deleteEntity = (id: number) => {
        if (activeCombat.value) {
            combatants.value = combatants.value.filter((combatant) => combatant.id !== id);
        } else if (id < 10) {
            players.value = players.value.filter(player => player.id !== id);
        } else {
            enemies.value = enemies.value.filter(enemy => enemy.id !== id);
        }
    };

    const editEntity = (id: number) => {
        let entity = null
        if (activeCombat.value) {
            entity = combatants.value.find((combatant) => combatant.id === id);
        } else if (id < 10) {
            entity = players.value.find(player => player.id === id);
        } else {
            entity = enemies.value.find(enemy => enemy.id === id);
        }
        entity ? entity.editing = true : null;
    };

    const changeIcon = (id: number, icon: string) => {
        let entity = null
        if (activeCombat.value) {
            entity = combatants.value.find((combatant) => combatant.id === id);
        } else if (id < 10) {
            entity = players.value.find(player => player.id === id);
        } else {
            entity = enemies.value.find(enemy => enemy.id === id);
        }
        entity ? entity.icon = icon : null;
    };

    const sortCombat = () => {
        sortByInitiative(combatants.value);
    }

    return {
        enemies,
        players,
        combatants,
        activeCombat,
        activeIndex,
        addNewEnemy,
        startCombat,
        handleKeyBoard,
        next,
        previous,
        deleteEntity,
        editEntity,
        changeIcon,
        sortCombat
    }
})