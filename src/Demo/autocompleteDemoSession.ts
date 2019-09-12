import {
  AutocompleteResponse,
  AutocompleteSession,
  ContextType,
  ReplyResponse,
  SessionError,
  SuggestionMeta
} from "../ApiModules/autocompleteSession";
import LocalApiServer from "./localApiServer";


export default class AutocompleteDemoSession implements AutocompleteSession {
  private readonly server: LocalApiServer;

  constructor(server: LocalApiServer) {
    this.server = server;
  }

  public async reconnect(): Promise<void> {
    // do nothing
    return Promise.resolve();
  }

  public disconnect(): void {
    // do nothing
  }

  public setOnErrorHandler = (callback: (error: SessionError) => void): void => {
    // do nothing - no errors will occur
  }

  public autocomplete(
    seedText: string,
    currentContext?: string
  ): Promise<AutocompleteResponse | null> {
    const response = this.server.getSuggestions(seedText, currentContext);
    return Promise.resolve(response);
  }

  public hotkey(trigger: string): Promise<AutocompleteResponse | null> {
    const response = this.server.getHotkeys(trigger);
    return Promise.resolve(response);
  }

  public variable(placeholder: string): Promise<AutocompleteResponse | null> {
    return Promise.resolve(null);
  }

  public async feedback(
    responseId: string,
    suggestion: SuggestionMeta,
    origin: string
  ): Promise<void> {
    return Promise.resolve();
  }

  public async setRealtimeData(
    pastContext: string | undefined,
    pastEmailId: string | undefined,
    currentContext: string | undefined
  ): Promise<void> {
    return Promise.resolve();
  }

  public reply(
    previousMessage: string,
    contextType: ContextType = "text"
  ): Promise<ReplyResponse | null> {
    return Promise.resolve(null);
  }
}
