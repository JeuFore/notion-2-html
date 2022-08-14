import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"


export class ImageConverter {
    image: ImageBlockObjectResponse;
    constructor(image: ImageBlockObjectResponse) {
        this.image = image;
    }
    convert() {
        if (this.image.image.type === "file")
            return `<div style="width: 100%; text-align: center;"><img src="${this.image.image.file.url}" style="max-width: 100%" alt="image" /></div>`;
        else
            return `<div style="width: 100%; text-align: center;"><img src="${this.image.image.external.url}" style="max-width: 100%" alt="image" /></div>`;
    }
}