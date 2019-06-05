import PointApi from "./../src/main";
import {
  suggestions,
  testResponse,
  mockfeedback,
  mockSuggestions,
  mockSetContext,
  mockReplies,
  replies
} from "../__mocks__/socket-mock";
const { suggestionsResponse } = testResponse;
const emailAddress = "aiansiti@college.harvard.edu";
const apiKey = "authcode1234";
jest.mock(
  "socket.io-client",
  () => require.requireActual("../__mocks__/socket-mock").default
);
process.env.REACT_APP_BASE_URI = "localhost:5000";
const api = new PointApi(emailAddress, apiKey);
const apiSession = api.initAutocompleteSession();

test("Inits PointApi object correctly", () => {
  expect(api.emailAddress).toEqual(emailAddress);
});

describe("Query suggestions", () => {
  test("Returns results correctly", async () => {
    const seedText = "hello123";
    const result = await apiSession.autocomplete(seedText);
    expect(result.suggestions).toHaveLength(3);
    expect(mockSuggestions.mock.calls[0][0]).toHaveProperty(
      "seedText",
      seedText
    );
  });
  test("Bad responses", async () => {
    suggestionsResponse.suggestions = [];
    expect(await apiSession.autocomplete("hello")).toBeNull();
    suggestionsResponse.suggestions = null;
    expect(await apiSession.autocomplete("hello")).toBeNull();
    delete testResponse.suggestionsResponse;
    expect(await apiSession.autocomplete("hello")).toBeNull();
  });
});

test("Chosen suggestions tracking", async () => {
  await expect(
    apiSession.feedback("", suggestions[0].suggestion, "positive")
  ).resolves.toBeUndefined();
  expect(mockfeedback).toBeCalled();
  await expect(
    apiSession.feedback("", suggestions[0].suggestion, "positive")
  ).rejects.toThrow();
  await expect(
    apiSession.feedback("", suggestions[0].suggestion, "positive")
  ).rejects.toThrow();
});

test("Set Gmail Context", async () => {
  await apiSession.setContext("hello", "gmail");
  expect(mockSetContext).toBeCalled();
});

test("Gets replies", async () => {
  const result = await apiSession.reply("hello", "text");
  expect(result.replies[0].suggestions).toHaveLength(3);
  expect(mockReplies).toBeCalled();
});
