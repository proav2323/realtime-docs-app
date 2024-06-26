import { docWithMmeber } from "@/types";
import { user } from "@prisma/client";
import { create } from "zustand";

export type modelType =
  | "Login"
  | "register"
  | "newDoc"
  | "share"
  | "manageAccess";

export interface modelStore {
  type: modelType | null;
  data: modelData;
  isOpen: boolean;
  onOpen: (type: modelType, data?: modelData) => void;
  onClose: () => void;
}

interface modelData {
  currentUser?: user;
  doc?: docWithMmeber;
}

export const useModal = create<modelStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type: modelType, data = {}) =>
    set({ isOpen: true, type: type, data: data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
