import { create } from 'zustand';

interface IStateProps {
  activeId: number;
  setActiveId: (id: number) => void;
}

export const useCategoryStore = create<IStateProps>((set) => ({
  activeId: 1,
  setActiveId: (id: number) => set({ activeId: id }),
}));
