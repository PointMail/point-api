import { PointApi } from "../main";
import { BaseMeta } from "./autocompleteSession";

/** Result of a GET request to api */
export interface GetResponse {
  suggestions: Suggestion[];
  hotkeys: Hotkey[];
}

/** Result containing just a status field */
interface StatusResponse {
  status: string;
}

/** Blacklisted suggestion object */
export interface Blacklist {
  id: string;
  text: string;
}

/** Custom suggestion object. Adds custom suggestion text to the dropdown */
export interface Suggestion {
  id: string;
  text: string;
}

/** Hotkey suggestion object. Autocompletes ':trigger' to 'text' */
export interface Hotkey {
  id: string;
  trigger: string;
  text: string;
  type: "generated" | "custom"; // generated vs custom
  labels: string[];
}

/** Class to keep track of api credentials and make requests to the custom suggestions api */
export default class CustomSuggestionsApiModule {
  private readonly api: PointApi;

  private readonly url: string = "/extension/custom";

  constructor(api: PointApi) {
    this.api = api;
  }

  /** Get custom suggestions and hotkeys */
  public async get(): Promise<GetResponse> {
    return this.authFetch("GET");
  }

  /** Delete a custom suggestion or hotkey */
  public async delete(
    suggestion: BaseMeta
  ): Promise<StatusResponse> {
    return this.authFetch("DELETE", { ...suggestion });
  }

  public async edit(
    oldText: string,
    type: string,
    baseClass: string,
    oldTrigger?: string,
    newText?: string,
    newTrigger?: string,
    labels?: string[]
  ): Promise<StatusResponse> {
    return this.authFetch("PUT", { oldText, type, baseClass, oldTrigger, newText, newTrigger, labels });
  }

  /** Add a custom suggestion or hotkey */
  public async add(
    text: string,
    type: string,
    trigger?: string,
    labels?: string[]
  ): Promise<StatusResponse> {
    return this.authFetch("POST", { text, trigger, type, labels });
  }

  /** Make authenticated request to custom suggestions api */
  private async authFetch(method: string, data?: object) {
    return (await this.api.authFetch(method, this.url, data)).json();
  }
}
