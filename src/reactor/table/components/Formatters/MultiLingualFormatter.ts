import Is from "@flk/supportive-is";
import { Obj } from "reinforcements";
import Globals from "./../../../globals";

export default function MultiLingualFormatter({ column }) {
    const { value } = column;

    if (! value || ! Is.object(value)) return null;

    return Obj.get(value, Globals.localeCode);
}