import { atom } from "jotai";

export const AppBreadCrumb = atom<string[]>([]);
export const toggleDrawer = atom<boolean>(false);
