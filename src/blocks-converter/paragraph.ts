import { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import COLOR from '../color-converter'

export class ParagraphConverter {
    paragraph: ParagraphBlockObjectResponse;
    constructor(paragraph: ParagraphBlockObjectResponse) {
        this.paragraph = paragraph;
    }
    convert() {
        if (!this.paragraph.paragraph.rich_text.length)
            return '<div style="max-width: 100%;width: 100%;padding: 3px 2px;display: flex;">&nbsp</div>';
        return `<div style="max-width: 100%;width: 100%;white-space: pre-wrap;word-break: break-word;caret-color: rgb(55, 53, 47);padding: 3px 2px;${COLOR[this.paragraph.paragraph.color]}">${this.paragraph.paragraph.rich_text.reduce((acc, text) => acc += `<span style="${COLOR[text.annotations.color]}">${text.plain_text}</span>`, '')}</div>`;
    }
}