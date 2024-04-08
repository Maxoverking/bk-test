import { Translate } from "@google-cloud/translate/build/src/v2";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TranslateService {
  private readonly translate: Translate;

  constructor() {
    const CREDENTIAL = JSON.parse(process.env.TRANSLATE_CREDENTIAL);
    this.translate = new Translate({
      credentials: CREDENTIAL,
      projectId: CREDENTIAL.project_id
    });
  }

  async translateText(text: string, targetLanguage: string = 'en'): Promise<string> {
    try {
      const [translation] = await this.translate.translate(text, targetLanguage);
      // console.log(`Text: ${text}`);
      // console.log(`Translation: ${translation}`);
      return translation;
    } catch (error) {
      throw error;
    }
  }

}
