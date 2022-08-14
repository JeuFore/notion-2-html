import { Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export class Heading3Converter {
    heading: Heading3BlockObjectResponse;
    constructor(heading: Heading3BlockObjectResponse) {
        this.heading = heading;
    }
    convert() {
        return `<div style="width: 100%;max-width: 649px;margin-top: 1em;margin-bottom: 1px;display: flex;"><div style="max-width: 100%;width: 100%;white-space: pre-wrap;word-break: break-word;caret-color: rgb(55, 53, 47);padding: 3px 2px;font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';font-weight: 600;font-size: 1.25em;line-height: 1.3;display: flex;">${this.heading.heading_3.rich_text.reduce((acc, text) => acc += text.plain_text, '')}</div></div>`;
    }
}