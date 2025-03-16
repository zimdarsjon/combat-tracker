<script setup lang="ts">
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import IconModal from '../components/modals/IconModal.vue';
import Image from 'primevue/image';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import type { CombatTrack } from '../models/index';
import { ref, onMounted, watch } from 'vue';
import { useDialog } from 'primevue/usedialog';

const props = defineProps<{
    combatant: CombatTrack,
    activeCombat: Boolean,
    active?: Boolean
}>();

//const editMode = ref<Boolean>(false);
const advantage = ref<Boolean>(false);
const disadvantage = ref<Boolean>(false);

const dialog = useDialog();

onMounted(() => {
    if (!props.activeCombat && !props.combatant.player) {
        props.combatant.editing = true;
    } else {
        props.combatant.editing = false;
    }
});

const emit = defineEmits<{
  (e: 'rightClick', event: any, id: number): void
}>()

watch(() => props.activeCombat, (newValue: Boolean) => {
    if (newValue) {
        props.combatant.editing = false;
    }
});

// Advantage / Disadvantage Logic
watch(advantage, () => advantage.value ? disadvantage.value = false : null);
watch(disadvantage, () => disadvantage.value ? advantage.value = false : null);
watch([advantage, disadvantage], () => {
    if (advantage.value) {
        props.combatant.advantage = true;
    } else if (disadvantage.value) {
        props.combatant.advantage = false;
    } else {
        props.combatant.advantage = undefined;
    }
});

const selectIcon = () => {
    if (props.combatant.editing) {
        dialog.open(IconModal, {
        props: {
            header: 'Import Selection',
            modal: true
        },
        data: {
            id: props.combatant.id
        }
    });
    }
};

// ADD HOVER ON INIATIVE TO CHECK RESULTS

const handleTVClick= (e: any) => {
    console.log(e)
    if (e.pointerType !== 'mouse') {
        emit('rightClick', e, props.combatant.id ?? 0)
    }
}

const testString = ref<string>('');

</script>
<template>
    <Card
        @contextmenu="e => emit('rightClick', e, combatant.id ?? 0)"
        @click="e => handleTVClick(e)"
        :pt="{
            root: {
                style: {
                    backgroundColor: active ? '#303035' : ''
                }
            }
        }">
        <template #title>
            <div class="w-full justify-content-between flex">
                <div @click="selectIcon">
                    <Image
                        :src="combatant.icon"
                        alt="Image"
                        width="40"
                        class="mr-2"
                        :pt="{ image: { style: { borderRadius: '100%' }} }" />
                </div>
                <InputText v-if="combatant.editing" v-model="props.combatant.name" />
                <span v-else>{{ combatant.name ?? '' }}</span>
            </div>
        </template>
        <template #content>

            <span>{{ testString }}</span>
            <InputNumber v-if="false" />

            <div class="flex gap-2 align-items-center justify-content-between mb-2" v-if="!activeCombat && !combatant.player">
                <label for="combatant-count">Count:</label>
                <!-- <InputNumber placeholder="1" id="combatant-count" v-model="props.combatant.count" aria-describedby="combatant-count" /> -->
                <input placeholder="1" id="combatant-count" v-model="props.combatant.count" aria-describedby="combatant-count" type="number" class="p-inputtext p-inputnumber-input"/>
            </div>

            <div class="flex gap-2 align-items-center justify-content-between mb-2" v-if="!activeCombat && !combatant.player">
                <label for="combatant-modifier">Modifier:</label>
                <!-- <InputNumber placeholder="0" id="combatant-count" v-model="props.combatant.modifier" aria-describedby="combatant-modifier" /> -->
                <input placeholder="0" id="combatant-count" v-model="props.combatant.modifier" aria-describedby="combatant-modifier" type="number" class="p-inputtext p-inputnumber-input"/>
            </div>

            <div class="flex gap-2 align-items-center justify-content-between" v-if="(!activeCombat && combatant.player) || (combatant.editing && activeCombat)">
                <label for="initiative">Initiative:</label>
                <!-- <InputNumber placeholder="0" id="initiative" v-model="props.combatant.iniative" aria-describedby="initiative" /> -->
                <input placeholder="0" id="initiative" v-model="props.combatant.iniative" aria-describedby="initiative" type="number" class="p-inputtext p-inputnumber-input"/>
            </div>

            <div class="flex gap-2 align-items-center" v-if="activeCombat && !combatant.editing">
                <label for="initiative">Initiative:</label>
                <span id="initiative" aria-describedby="initiative">{{ combatant.iniative ?? 0 }}</span>
            </div>

            <div class="card flex flex-wrap justify-center gap-4" v-if="!activeCombat  && !combatant.player">
                <div class="flex items-center gap-2">
                    <Checkbox v-model="advantage" binary inputId="advantage" name="advantage" :value="true"  />
                    <label for="advantage"> Advantage </label>
                </div>
                <div class="flex items-center gap-2">
                    <Checkbox v-model="disadvantage" binary inputId="disadvantage" name="disadvantage" :value="true"  />
                    <label for="advantage"> Disdvantage </label>
                </div>
            </div>

            <div class="flex items-center gap-2" v-if="!activeCombat  && !combatant.player">
                <Checkbox v-model="props.combatant.hidden" binary inputId="hidden" name="hidden" :value="true"  />
                <label for="hidden"> Hidden </label>
            </div>

            <Button v-if="activeCombat && combatant.editing" @click="combatant.editing = false" severity="success" class="ml-2 border-round">
                <i class="pi pi-check"></i>
            </Button>
            
        </template>
    </Card>
</template>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>