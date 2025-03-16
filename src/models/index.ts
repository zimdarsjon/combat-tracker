export interface CombatTrack {
    name: string,
    editing?: boolean,
    advantage?: boolean,
    modifier?: number,
    count?: number,
    iniative?: number,
    hidden?: boolean,
    player?: boolean,
    icon?: string,
    id: number
}