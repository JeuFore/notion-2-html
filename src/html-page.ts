import { SupportLanguages } from 'languages'

export default class HtmlPage {
    htmlString: string;
    language: string;

    constructor(language: SupportLanguages) {
        this.htmlString = '';
        this.language = language;
    }

    add(html: string) {
        this.htmlString += html;
    }

    head() {
        return `\
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                html {
                    font-family: sans-serif;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }
                body {
                    color: rgb(55, 53, 47);
                    fill: currentcolor;
                    line-height: 1.5;
                    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
                    -webkit-font-smoothing: auto;
                    font-size: 16px;
                    line-height: 1.5;
                    overflow-wrap: break-word;
                    -webkit-line-break: after-white-space;
                    padding: 0 8rem 2rem 8rem;
                    margin: 0;
                }
                @media screen and (max-width: 600px) {
                    body {
                        padding: 0 1rem 1rem 1rem;
                    }
                }
                div:empty:after {
                    content: " ";
                }
                ul {
                    padding: 0;
                    padding-left: 0.75rem;
                    margin: 0;
                    list-style-position: inside;
                    list-style-type: decimal;
                    flex-direction: column  ;
                }
                ul.disc-list {
                    list-style-type: disc;
                
                }
                ul.disc-list>li::marker {
                    font-family: 'Arial';
                    font-size: 1.2em;
                }
                ul.disc-list>li div {
                    margin-left: -5px;
                }
                .checkbox-on {
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2358A9D7%22%2F%3E%0A%3Cpath%20d%3D%22M6.71429%2012.2852L14%204.9995L12.7143%203.71436L6.71429%209.71378L3.28571%206.2831L2%207.57092L6.71429%2012.2852Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E");
                }
                .checkbox-off {
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20fill%3D%22white%22%20stroke%3D%22%2336352F%22%20stroke-width%3D%221.5%22%2F%3E%0A%3C%2Fsvg%3E");
                }
                .checkbox-on ~ span{
                    text-decoration: line-through rgba(55, 53, 47, 0.25);
                    color: rgba(55, 53, 47, 0.65);
                }
            </style>
        </head>`;
    }

    script() {
        return '';
    }

    create_end_html() {
        return `\
            <!DOCTYPE html>
            <html lang="${this.language}">
                ${this.head()}
                <body>
                    ${this.htmlString}
                </body>
                ${this.script()}
            </html>`;
    }
}