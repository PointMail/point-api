import { AutocompleteResponse } from "../ApiModules/autocompleteSession";
import SuggestionsStore from "./suggestionsStore";

export default class LocalApiServer {
  private readonly store: SuggestionsStore;

  constructor() {
    this.store = new SuggestionsStore();
  }

  public httpRequest(
    method: string,
    url: string,
    data?: object,
    headers?: Record<string, string>
  ): Response {
    if (url.startsWith('/extension/custom')) {
      if ('GET' === method) {
        return this.mockResponse(this.extensionCustomGet());
      } else if ('POST' === method) {
        return this.mockResponse(this.extensionCustomPost(data as any));
      }
    }

    return this.mockResponse();
  }

  public extensionCustomGet() {

    const snippets = this.store.snippets;

    return {
      snippets
    };
  }

  public extensionCustomPost(data: { snippet: string, name: string }) {
    this.store.addSnippet(data.name, data.snippet);
    return { status: "success" };
  }

  public getSnippetsByText(seedText: string, currentContext?: string): AutocompleteResponse {
    const snippets = this.store.snippets.
      filter((meta) => meta.content.startsWith(seedText)).
      slice(0, 3);

    return {
      snippets,
      seedText,
      responseId: this.randomResponseId(),
    };
  }

  public getSnippetsByName(seedText: string): AutocompleteResponse {
    const snippets = this.store.snippets.
      filter((meta) => meta.name.startsWith(seedText)).
      slice(0, 3);

    return {
      snippets,
      seedText,
      responseId: this.randomResponseId(),
    };
  }

  public addSnippet(name: string, snippet: string) {
    this.store.addSnippet(name, snippet);
  }

  private mockResponse(body?: any) {
    const init = {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json"
      }
    };

    return new Response(JSON.stringify(body), init);
  }

  private randomResponseId(): string {
    return String(Date.now());
  }

}