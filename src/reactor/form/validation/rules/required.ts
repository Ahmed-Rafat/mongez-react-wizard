import Is from "@flk/supportive-is";
import { trans } from './../../../localization';
import {InputRule, RuleResponse} from './input-rule';

export default {
    rule: 'required',
    requiresValue: false,
    evaluate: function (value): RuleResponse {
        return {
            hasError: Is.empty(value),
            errorMessage: trans('validation.required'),
        } as RuleResponse
    },
} as InputRule;