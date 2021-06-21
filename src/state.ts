export interface PlayerState {
    id: string;
    name: string;
}

export interface GameState {
    players: PlayerState[];
}

export let state: GameState;

export function initializeState(): void {
    
}