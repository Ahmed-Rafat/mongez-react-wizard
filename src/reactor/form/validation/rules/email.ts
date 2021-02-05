import Is from "@flk/supportive-is";
import { trans } from './../../../localization';
import { InputRule, RuleResponse } from './input-rule';

export default {
    type: 'email',
    rule: 'email',
    evaluate: function (value: string): RuleResponse {
        return {
            hasError: ! Is.email(value),
            errorMessage: trans('validation.email'),
        } as RuleResponse;
    },
} as InputRule;