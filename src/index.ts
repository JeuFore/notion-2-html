import { Client } from "@notionhq/client"

import { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import {
    PropertyItemPropertyItemListResponse,
    TitlePropertyItemObjectResponse,
    ParagraphBlockObjectResponse,
    Heading1BlockObjectResponse,
    Heading2BlockObjectResponse,
    Heading3BlockObjectResponse,
    BulletedListItemBlockObjectResponse,
    NumberedListItemBlockObjectResponse,
    ToDoBlockObjectResponse,
    ImageBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"

import {
    ParagraphConverter,
    Heading1Converter,
    Heading2Converter,
    Heading3Converter,
    BulletListConverter,
    NumberedListConverter,
    ImageConverter,
    DividerConverter,
    ToDoConverter
} from './blocks-converter'

import HtmlPage from './html-page'

import { SupportLanguages } from './languages'

type ConvertOptions = {
    withoutTitle?: boolean,
    withoutImages?: boolean
}

export default class Notion2Html {
    client: Client;
    htmlPage: HtmlPage;
    pageProperties: object
    options: ConvertOptions

    constructor(notionSecret: string, language: SupportLanguages) {
        this.client = new Client({
            auth: notionSecret
        })
        this.options = {};
        this.pageProperties = {}
        this.htmlPage = new HtmlPage(language)
    }

    async _fetchPageName(page_id: string): Promise<void> {
        const page = await this.client.pages.properties.retrieve({ page_id, property_id: 'title' })
        const result = (page as PropertyItemPropertyItemListResponse).results[0]

        const pageProperty = (result as TitlePropertyItemObjectResponse)

        this.htmlPage.add(`<div style="color: rgb(55, 53, 47);font-weight: 700;line-height: 1.2;font-size: 40px;font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';cursor: text;display: flex;align-items: center;margin-top: 2rem; margin-bottom: 25px;">${pageProperty.title.plain_text}</div>`)
    }

    async _createContent(block_id: string, level = 0): Promise<void> {
        const blocks = await this.client.blocks.children.list({ block_id })

        const results: Array<BlockObjectResponse | PartialBlockObjectResponse> = blocks.results

        for (let i = 0; i < results.length; i++) {
            const block = results[i] as BlockObjectResponse

            const previousBlockType: string | undefined = results[i - 1] && (results[i - 1] as BlockObjectResponse).type
            const nextBlockType: string | undefined = results[i + 1] && (results[i + 1] as BlockObjectResponse).type

            let blockHtml = ''

            switch (block.type) {
                case 'paragraph':
                    blockHtml = new ParagraphConverter(block as ParagraphBlockObjectResponse).convert()
                    break;
                case 'heading_1':
                    blockHtml = new Heading1Converter(block as Heading1BlockObjectResponse).convert()
                    break;
                case 'heading_2':
                    blockHtml = new Heading2Converter(block as Heading2BlockObjectResponse).convert()
                    break;
                case 'heading_3':
                    blockHtml = new Heading3Converter(block as Heading3BlockObjectResponse).convert()
                    break;
                case 'bulleted_list_item':
                    blockHtml = new BulletListConverter(block as BulletedListItemBlockObjectResponse, previousBlockType, nextBlockType).convert()
                    break;
                case 'numbered_list_item':
                    blockHtml = new NumberedListConverter(block as NumberedListItemBlockObjectResponse, previousBlockType, nextBlockType).convert()
                    break;
                case 'quote':
                    break;
                case 'to_do':
                    blockHtml = new ToDoConverter(block as ToDoBlockObjectResponse).convert()
                    break;
                case 'toggle':
                    break;
                case 'template':
                    break;
                case 'synced_block':
                    break;
                case 'child_page':
                    break;
                case 'child_database':
                    break;
                case 'equation':
                    break;
                case 'code':
                    break;
                case 'callout':
                    break;
                case 'divider':
                    blockHtml = new DividerConverter().convert()
                    break;
                case 'breadcrumb':
                    break;
                case 'table_of_contents':
                    break;
                case 'column_list':
                    break;
                case 'column':
                    break;
                case 'link_to_page':
                    break;
                case 'table':
                    break;
                case 'table_row':
                    break;
                case 'embed':
                    break;
                case 'bookmark':
                    break;
                case 'image':
                    if (!this.options.withoutImages)
                        blockHtml = new ImageConverter(block as ImageBlockObjectResponse).convert()
                    break;
                case 'video':
                    break;
                case 'pdf':
                    break;
                case 'file':
                    break;
                case 'audio':
                    break;
                case 'link_preview':
                    break;
                case 'unsupported':
                    break;
                default:
                    break;
            }

            if (level)
                blockHtml = `<div style="margin-left: ${level * 24}px;">${blockHtml}</div>`

            this.htmlPage.add(blockHtml)

            if (block.has_children)
                await this._createContent(block.id, level + 1)
        }
    }

    async convert(pageId: string, options: ConvertOptions = {}): Promise<string> {
        this.options = options;
        if (!options.withoutTitle)
            await this._fetchPageName(pageId)
        await this._createContent(pageId)
        return this.htmlPage.create_end_html()
    }
}