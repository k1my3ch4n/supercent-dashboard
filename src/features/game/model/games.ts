import { StoreType } from "@shared/constants/stores";

export interface Game {
  id: string;
  appId: string;
  name: string;
  iconUrl: string;
  gradient: string;
  stores: StoreType[];
}

export const GAMES: Game[] = [
  {
    id: "pizzaidle",
    appId: "io.supercent.pizzaidle",
    name: "Pizza Ready",
    iconUrl:
      "https://play-lh.googleusercontent.com/3pb1PebAegbhexBA0vX7cQhDaijGlEory53AouhnP3U62CKQO58FGF_MrDSLzXZd_o5C=s1440-rw",
    gradient: "linear-gradient(135deg,#2a0500,#7a1a00,#bb3a00)",
    stores: ["google-play", "app-store"],
  },
  {
    id: "linkedcubic",
    appId: "io.supercent.linkedcubic",
    name: "Snake Clash",
    iconUrl:
      "https://play-lh.googleusercontent.com/xNSxw5A59GfuHoNm_ezurQdUjGIo6U3XILbvfwAfSz3VnV_FkUZz5B6TFBPyyHUknVA=s1440-rw",
    gradient: "linear-gradient(135deg,#00102a,#003070,#0055b0)",
    stores: ["google-play", "app-store"],
  },
  {
    id: "ageofdinosaurs",
    appId: "io.supercent.ageofdinosaurs",
    name: "Dinosaur Universe",
    iconUrl:
      "https://play-lh.googleusercontent.com/xvxeGmvu6Mg7ADAmLGQiOuFKE-McedSQNXyfyRV1QwB0lXhwLS8QCysdICDJFVKews8=s1440-rw",
    gradient: "linear-gradient(135deg,#1a0d00,#5c3300,#8b5e00)",
    stores: ["google-play"],
  },
  {
    id: "weaponrpg",
    appId: "io.supercent.weaponrpg",
    name: "XP Hero",
    iconUrl:
      "https://play-lh.googleusercontent.com/nEq2g7dQ5kRB8miiWbxNOppYw557TLfH5mOe9Cca78KYrSGYoyCtSCFEpZIqnQR45yOY=s1440-rw",
    gradient: "linear-gradient(135deg,#120030,#3d0060,#7b0050)",
    stores: ["google-play", "app-store"],
  },
  {
    id: "bigslimemanyslime",
    appId: "io.supercent.bigslimemanyslime",
    name: "Super Big Slime",
    iconUrl:
      "https://play-lh.googleusercontent.com/j32KGh6LQySLglC3QsQOvl7SqhlGpxcl8MrrR3TcDJ0fVZflYLBLRD1pRU2B9sDGD2w=s1440-rw",
    gradient: "linear-gradient(135deg,#002010,#005530,#008040)",
    stores: ["google-play", "app-store"],
  },
];
