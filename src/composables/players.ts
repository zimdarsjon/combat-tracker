import type { CombatTrack } from '../models/index';

export function generatePlayers() {

    return [
        {
            id: 1,
            name: 'Kroktos',
            player: true,
            icon: './src/assets/icons/leonin.jpg'
        },
        {
            id: 2,
            name: 'Kharmir',
            player: true,
            icon: './src/assets/icons/dwarf.jpg'
        },
        {
            id: 3,
            name: 'Sam',
            player: true,
            icon: './src/assets/icons/bard.jpg'
        },
        {
            id: 4,
            name: 'Tinnim',
            player: true,
            icon: './src/assets/icons/tortle.jpg'
        },
        {
            id: 5,
            name: 'Dannish',
            player: true,
            icon: './src/assets/icons/kalashtar.jpg'
        },
        {
            id: 6,
            name: 'Mira',
            player: true,
            icon: './src/assets/icons/firbolg.jpg'
        }
    ] as CombatTrack[];

}