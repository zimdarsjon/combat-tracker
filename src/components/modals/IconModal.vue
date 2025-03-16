<script setup lang="ts">
import { generateImagePaths } from '../../composables/icon.ts';
import { ref, onMounted, inject } from 'vue';
import Image from 'primevue/image';
import Button from 'primevue/button';
import { useCombatStore } from '../../stores/combat';

const combatStore = useCombatStore();

const dialogRef : any = inject('dialogRef');

const paths = ref<string[]>([]);
const activePath = ref<string>('');

onMounted(() => {
    paths.value = generateImagePaths();
    activePath.value = paths.value[0];
});

const selectIcon = () => {
    combatStore.changeIcon(dialogRef.value.data.id, activePath.value);
    dialogRef.value.close();
}

</script>
<template>
    <div>
        <div class="w-full justify-content-between flex mt-3 mb-3">
            <div v-for="path in paths" @click="activePath = path" :class="{ 'highlight' : activePath == path }" class="p-1">
                <Image
                    :src="path"
                    alt="Image"
                    width="40"
                    class="flex justify-content-center"
                    :pt="{ image: { style: { borderRadius: '100%' }} }" />
            </div>
        </div>
        <Button :autofocus="true" @click="selectIcon">Choose</Button>
    </div>
</template>
<style scoped>
.highlight {
    filter: drop-shadow(0 0 0.5rem rgb(255, 217, 0));
}
</style>