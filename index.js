"use strict";exports.__esModule=true;exports.PlaceholderProcessor=void 0;exports.PlaceholderProcessor={parse:function(content,placeholders){this.replaceMultiplePlaceholders(content,placeholders)},replaceMultiplePlaceholders:function(content,placeholders){var _this=this;var newContent=content;placeholders.forEach((function(placeholder){newContent=_this.replacePlaceholder(newContent,placeholder)}));return newContent},replacePlaceholder:function(content,placeholder){var pattern=new RegExp("\\$\\s*\\{\\s*"+placeholder.name+"\\s*\\}","g");return content.replace(pattern,placeholder.value)}};