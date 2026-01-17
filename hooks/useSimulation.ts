import { create } from 'zustand';

interface SimulationState {
    isPlaying: boolean;
    adSpendMultiplier: number;
    simulationSpeed: number;
    churnRate: number;
    conversionLift: number;
    avgOrderValue: number;
    togglePlay: () => void;
    setAdSpend: (val: number) => void;
    setChurn: (val: number) => void;
    setLift: (val: number) => void;
    setAOV: (val: number) => void;
}

export const useSimulation = create<SimulationState>((set) => ({
    isPlaying: true,
    adSpendMultiplier: 1.0,
    simulationSpeed: 1.0,
    churnRate: 5.0,
    conversionLift: 0,
    avgOrderValue: 5000,
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setAdSpend: (val) => set({ adSpendMultiplier: val }),
    setChurn: (val) => set({ churnRate: val }),
    setLift: (val) => set({ conversionLift: val }),
    setAOV: (val) => set({ avgOrderValue: val }),
}));
