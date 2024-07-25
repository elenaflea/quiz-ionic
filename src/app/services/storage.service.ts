import { Injectable } from "@angular/core";
import { Preferences } from "@capacitor/preferences";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private storageKey: string = "OPEN_TRIVIA_KEY";
  private storageScore: string = "OPEN_TRIVIA_SCORE";

  constructor() {}

  setData = async (data: any) => {
    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(data),
    });
  };

  getData = async () => {
    const { value } = await Preferences.get({ key: this.storageKey });
    console.log(value);

    if (value) return JSON.parse(value);
    else return undefined;
  };

  setScore = async (score: number ) => {
    await Preferences.set({
      key: this.storageScore,
      value: JSON.stringify(score),
    });
  };

  getScore = async () => {
    const { value } = await Preferences.get({ key: this.storageScore });
    console.log(value);

    if (value) return JSON.parse(value);
    else return undefined;
  };

  async cleanData() {
    await Preferences.remove({ key: this.storageKey });
    await Preferences.remove({ key: this.storageScore });
  }
}
