import {Argument, CLI} from "@makechtec/tezcatl-cli";
import {Pipe} from "@makechtec/pipe";
import {CodeProcessor} from "@makechtec/tezcatl-constants";

export class PlaceholderProcessor implements CodeProcessor{

    parse(content: string) : string{

        return (new Pipe(content))
        .addAction((newContent: any) => {
            return this.replaceMultiplePlaceholders(newContent, CLI.getAllArguments());
        })
        .addAction((newContent: any) => {
            return this.replaceForDefaults(newContent);
        })
        .addAction((newContent: any) => {
            return this.cleanEmptyPlaceholders(newContent);
        })
        .execActions();
    }

    replaceMultiplePlaceholders(content: string, placeholders: any[]) : string {

        return placeholders.reduce((newContent, placeholder) => {
            return this.replacePlaceholder(newContent, placeholder);
        }, content);
    }

    replacePlaceholder(content: string, placeholder: Argument) : string {
        const pattern = this.createPlaceholderRegExp(placeholder.name);
        const matches = content.match(pattern);
        
        if(matches === null){
            return content;
        }

        const placeholderContent = matches[0];
        let value = "";

        if(placeholder.value !== ""){
            value = placeholder.value;
        }

        if(placeholder.value === "" && /\|/g.test(placeholderContent)){
            value = this.extractDefaultValue(placeholderContent);
        }
        
        return content.replace(pattern, value);
    }

    cleanEmptyPlaceholders(content: string) : string {
        return content.replace(GENERAL_SLOT_REGEXP, "");
    }

    replaceForDefaults(content: string) : string{
        const slots = content.match(GENERAL_SLOT_WITH_DEFAULT_VALUE);

        if(slots === null){
            return content;
        }

        return slots.reduce((newContent, slot) => {
            return newContent.replace(slot, this.extractDefaultValue(slot));
        }, content);

    }

    extractDefaultValue(slot: string) : string {
        const matchesDefaultValue = slot.match(SLOT_DEFAULT_VALUE_REGEXP);
        return matchesDefaultValue[0].substring(1);
    }

    createPlaceholderRegExp(name : string) : RegExp{
        return new RegExp("\\$\\s*\\{\\s*("+name+")\\s*\\|?\\s*([a-z|A-Z|\\d]*)\\s*\\}", "g");
    }
    
}

export const GENERAL_SLOT_REGEXP = /\$\s*\{\s*([a-z|A-Z|\d|\.]*)\s*?\}/g;
export const SLOT_DEFAULT_VALUE_REGEXP = /\|([a-z|A-Z|\d]*)/g;
export const GENERAL_SLOT_WITH_DEFAULT_VALUE = /\$\s*\{\s*([a-z|A-Z|\d]*)\s*\|\s*([a-z|A-Z|\d]*)\s*?\}/g;