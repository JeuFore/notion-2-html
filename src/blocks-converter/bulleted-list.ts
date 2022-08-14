import { BulletedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import COLOR from '../color-converter'

export class BulletListConverter {
    bulletList: BulletedListItemBlockObjectResponse;
    existPreviousList: boolean;
    existNextList: boolean;

    constructor(bulletList: BulletedListItemBlockObjectResponse, previousBlockType: string | undefined, nextBlockType: string | undefined) {
        this.bulletList = bulletList;
        this.existPreviousList = previousBlockType === 'numbered_list_item';
        this.existNextList = nextBlockType === 'numbered_list_item';
    }

    convert(): string {
        let stringValue = '';
        if (!this.existPreviousList)
            stringValue += this._create_list();
        stringValue += this._create_child_list(this.bulletList);
        if (!this.existNextList)
            stringValue += this._close_list();
        return stringValue
    }

    _create_list(): string {
        return `<ul class="disc-list">`;
    }

    _close_list(): string {
        return `</ul>`;
    }

    _create_child_list(bulletList: BulletedListItemBlockObjectResponse): string {
        return `<li><div style="max-width: 100%;width: 100%;caret-color: rgb(55, 53, 47);padding: 3px 2px;display:inline;${COLOR[bulletList.bulleted_list_item.color]}">${bulletList.bulleted_list_item.rich_text.reduce((acc, text) => acc += `<span style="${COLOR[text.annotations.color]}">${text.plain_text}</span>`, '')}</div></li>`
    }
}