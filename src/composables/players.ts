import type { CombatTrack } from '../models/index';

export function generatePlayers() {

    return [
        {
            id: 1,
            name: 'Kroktos',
            player: true,
            icon: './leonin.jpg'
        },
        {
            id: 2,
            name: 'Kharmir',
            player: true,
            icon: './dwarf.jpg'
        },
        {
            id: 3,
            name: 'Sam',
            player: true,
            icon: './bard.jpg'
        },
        {
            id: 4,
            name: 'Tinnim',
            player: true,
            icon: './tortle.jpg'
        },
        {
            id: 5,
            name: 'Dannish',
            player: true,
            icon: './kalashtar.jpg'
        },
        {
            id: 6,
            name: 'Mira',
            player: true,
            icon: './firbolg.jpg'
        }
    ] as CombatTrack[];

}