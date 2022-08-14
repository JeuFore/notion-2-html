import { NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import COLOR from '../color-converter'

export class NumberedListConverter {
    numberedList: NumberedListItemBlockObjectResponse;
    existPreviousList: boolean;
    existNextList: boolean;

    constructor(numberedList: NumberedListItemBlockObjectResponse, previousBlockType: string | undefined, nextBlockType: string | undefined) {
        this.numberedList = numberedList;
        this.existPreviousList = previousBlockType === 'numbered_list_item';
        this.existNextList = nextBlockType === 'numbered_list_item';
    }

    convert(): string {
        let stringValue = '';
        if (!this.existPreviousList)
            stringValue += this._create_list();
        stringValue += this._create_child_list(this.numberedList);
        if (!this.existNextList)
            stringValue += this._close_list();
        return stringValue
    }

    _create_list(): string {
        return `<ul>`;
    }

    _close_list(): string {
        return `</ul>`;
    }

    _create_child_list(numberedList: NumberedListItemBlockObjectResponse): string {
        return `<li><div style="max-width: 100%;width: 100%;caret-color: rgb(55, 53, 47);padding: 3px 2px;display:inline;${COLOR[numberedList.numbered_list_item.color]}">${numberedList.numbered_list_item.rich_text.reduce((acc, text) => acc += `<span style="${COLOR[text.annotations.color]}">${text.plain_text}</span>`, '')}</div></li>`
    }
}