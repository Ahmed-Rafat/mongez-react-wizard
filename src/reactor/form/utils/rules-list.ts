import email from "../validation/rules/email";
import required from "../validation/rules/required";
import minLength from "../validation/rules/min-length";
import maxLength from "../validation/rules/max-length";
import { InputRule } from '../validation/rules/input-rule';

const rulesList: Array<InputRule> = [
    required,
    email,
    minLength,
    maxLength,
    // length
    // min
    // max 
    // match >> password with conform Password
    // pattern
];

export default rulesList;