import { create } from "zustand";

type State = {
  dashSideState: boolean;
  setDashSideState: (value: boolean) => void;
  width: number;
  setWidth: (width: number) => void;
};

export const useVariables = create<State>((set) => ({
  dashSideState: true,

  width: typeof window !== "undefined" ? window.innerWidth : 0,

  setWidth: (width) =>
    set(() => ({
      width,
    })),

  setDashSideState: (value) =>
    set({
      dashSideState: value,
    }),
}));
