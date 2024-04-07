import { Translate } from "@google-cloud/translate/build/src/v2";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TranslateService {
  private readonly translate: Translate;

  constructor() {
    this.translate = new Translate({
      credentials: JSON.parse(process.env.TRANSLATE_CREDENTIAL),
      projectId: JSON.parse(process.env.TRANSLATE_CREDENTIAL).project_id,
    });
  }

  async translateText(text: string): Promise<string> {
    const lang = 'en';
    const [translation] = await this.translate.translate(text, lang);
    // console.log(`Text: ${text}`);
    // console.log(`Translation: ${translation}`);
    return translation;

  }

}
