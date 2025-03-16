<script setup lang="ts">
import { generatePlayers } from '../../composables/players.ts';
import type { CombatTrack } from '../../models/index';
import { ref, onMounted, inject } from 'vue';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { useCombatStore } from '../../stores/combat';
import { storeToRefs } from 'pinia';

const combatStore = useCombatStore();

const dialogRef : any = inject('dialogRef');

const { players } = storeToRefs(combatStore);

const newPlayers = ref<CombatTrack[]>([]);
const importPlayers = ref<CombatTrack[]>([]);

onMounted(() => {
    newPlayers.value = generatePlayers();
    importPlayers.value = newPlayers.value;
});

const addPlayers = () => {
    players.value = importPlayers.value;
    dialogRef.value.close();
}

</script>
<template>
    <div>
        <div class="flex flex-column gap-4 mb-4">
            <div class="flex items-center gap-2" v-for="player in newPlayers">
                <Checkbox v-model="importPlayers" :inputId="player.name" :name="player.name" :value="player" />
                <label :for="player.name">{{ player.name }}</label>
            </div>
        </div>
        <Button :autofocus="true" @click="addPlayers">Import</Button>
    </div>
</template>