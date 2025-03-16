<script setup lang="ts">
import Button from 'primevue/button';
import Combatant from '../components/Combatant.vue';
import PlayerModal from '../components/modals/PlayerModal.vue';
import { useCombatStore } from '../stores/combat';
import { storeToRefs } from 'pinia';
import { useDialog } from 'primevue/usedialog';
import { onMounted, onUnmounted } from 'vue';
import { ref } from 'vue';
import ContextMenu from 'primevue/contextmenu';

const combatStore = useCombatStore();

const { enemies, players, combatants, activeCombat, activeIndex } = storeToRefs(combatStore);

const dialog = useDialog();

const rightClickCombatantID = ref<number>(0);


const importPlayers = () => {
    dialog.open(PlayerModal, {
        props: {
            header: 'Import Players',
            modal: true
        }
    });
};

onMounted(() => window.addEventListener('keydown', combatStore.handleKeyBoard));
onUnmounted(() => window.removeEventListener('keydown', combatStore.handleKeyBoard));

const menu = ref();
const rightClickItems = ref([
    { label: 'Edit', icon: 'pi pi-copy', command: () => combatStore.editEntity(rightClickCombatantID.value)},
    { label: 'Delete', icon: 'pi pi-file-edit', command: () => combatStore.deleteEntity(rightClickCombatantID.value)}
]);


const handleRightClick = (event: any, id: number) => {
    rightClickCombatantID.value = id;
    menu.value.show(event);
};


</script>
<template>
    <ContextMenu ref="menu" :model="rightClickItems" />
    <div v-if="!activeCombat">
        <div class="flex mb-4">
            <div class="mr-2">
                <h1>ENEMIES</h1>
                <Button @click="combatStore.addNewEnemy" class="mb-4">Add Enemy</Button>
                <div class="mb-2" v-for="enemy in enemies">
                    <Combatant :combatant="enemy" :active-combat="false" @right-click="handleRightClick"/>
                </div>
            </div>
            <div class="ml-2">
                <h1>PLAYERS</h1>
                <Button @click="importPlayers" class="mb-4">Import Players</Button>
                <div class="mb-2" v-for="player in players">
                    <Combatant :combatant="player" :active-combat="false" @right-click="handleRightClick"/>
                </div>
            </div>
        </div>
        <Button @click="combatStore.startCombat">Start Combat</Button>
    </div>
    <div v-else>
        <div class="flex justify-content-center">
            <Button @click="activeCombat = false" class="mr-2">Reset Combat</Button>
            <Button @click="combatStore.sortCombat">Sort Combat</Button>
        </div>
        <h1>COMBAT</h1>
        <div class="flex flex-row w-full flex-wrap">
            <div class="flex mb-6 ml-2 mr-2" v-for="(combatant, index) in combatants">
                <Combatant :combatant="combatant" :active-combat="true" :active="index == activeIndex" @right-click="handleRightClick"/>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>