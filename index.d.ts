import {Argument} from "@makechtec/tezcatl-cli";

export class PlaceholderProcessor {
    parse(content: string): string;
    replaceMultiplePlaceholders(content: string, placeholders: any[]): string;
    replacePlaceholder(content: string, placeholder: Argument): string;
    cleanEmptyPlaceholders(content: string): string;
    replaceForDefaults(content: string): string;
    extractDefaultValue(slot: string): string;
    createPlaceholderRegExp(name: string): RegExp;
}
export const GENERAL_SLOT_REGEXP: RegExp;
export const SLOT_DEFAULT_VALUE_REGEXP: RegExp;
export const GENERAL_SLOT_WITH_DEFAULT_VALUE: RegExp;
