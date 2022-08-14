import { ToDoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export class ToDoConverter {
    toDo: ToDoBlockObjectResponse;
    constructor(toDo: ToDoBlockObjectResponse) {
        this.toDo = toDo;
    }
    convert() {
        const text = this.toDo.to_do.rich_text.reduce((acc, text) => acc += text.plain_text, '')
        return `<div style="display: flex; align-items: center; width: 100%;"><div style="display: inline-flex;vertical-align: text-bottom;width: 16px;height: 16px;background-size: 16px;margin-left: 7px;margin-right: 8px;" class="checkbox-${this.toDo.to_do.checked ? 'on' : 'off'}"></div><span style="max-width: 100%; white-space: pre-wrap; word-break: break-word; padding: 3px 2px; text-align: left; flex-grow: 1; display: inline-block;${!text ? 'color: rgba(55, 53, 47, 0.65);' : ''}">${text || 'Tâche'}</span></div>`;
    }
}