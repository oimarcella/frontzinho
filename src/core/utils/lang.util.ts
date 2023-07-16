import * as pt_BR from "../../assets/i18n/pt-br.json";
import * as en_US from "../../assets/i18n/en-us.json";
import { ELang } from "../enums/lang";

export const getLangJson = () => {
  const storedLang = localStorage.getItem("@config:lang") as ELang;

  if (!storedLang) {
    return pt_BR;
  }

  switch (storedLang) {
    case ELang.PT_BR:
      return pt_BR;
    case ELang.EN_US:
      return en_US;
    default:
      return en_US;
  }
};
