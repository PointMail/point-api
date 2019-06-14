import PointApi, { ErrorResponse } from "./main";
import PointApiBase from "./pointApiBase";

import AccountApiModule, {
  Account,
  Preferences,
  SearchType,
  Subscription
} from "./ApiModules/account";

import AutocompleteSession, {
  ContextType,
  BaseMeta,
  SuggestionMeta,
  ReplyMeta,
  AutocompleteResponse,
  ReplyResponse
} from "./ApiModules/autocompleteSession";

import CustomSuggestionsApiModule, {
  Blacklist,
  GetResponse as CustomSuggestionsGetResponse,
  Hotkey,
  Suggestion
} from "./ApiModules/customSuggestions";

import Events from "./ApiModules/events";

import InteractionsApiModule, {
  StatusResponse
} from "./ApiModules/interactions";

export default PointApi;
export { PointApiBase };
export { ErrorResponse };
export { AccountApiModule, Account, Preferences, SearchType, Subscription };
export {
  AutocompleteSession,
  ContextType,
  BaseMeta,
  SuggestionMeta,
  ReplyMeta,
  AutocompleteResponse,
  ReplyResponse
};
export { CustomSuggestionsApiModule, Blacklist, CustomSuggestionsGetResponse, Hotkey, Suggestion };
export { Events };
export { InteractionsApiModule, StatusResponse };
export * from "./main";
