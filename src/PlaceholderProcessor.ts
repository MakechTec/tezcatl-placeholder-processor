import {Argument} from "@makechtec/tezcatl-cli";

export const PlaceholderProcessor = {

    parse: function(content: string, placeholders: any[]){
        this.replaceMultiplePlaceholders(content, placeholders);
    },

    replaceMultiplePlaceholders: function(content: string, placeholders: any[]) {

        let newContent = content;
        placeholders.forEach((placeholder) => {
            newContent = this.replacePlaceholder(newContent, placeholder);
        });
        return newContent;
    },

    replacePlaceholder: function(content: string, placeholder: Argument){
        let pattern = new RegExp("\\$\\s*\\{\\s*" + placeholder.name + "\\s*\\}", "g");
        return content.replace(pattern, placeholder.value);
    },
}