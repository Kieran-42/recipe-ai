import { amplifyClient } from "./amplify-utils";

export async function generateRecipe({ userInput }: { userInput: string }) {
  const response = await amplifyClient.queries.askBedrock({
    userInput: userInput,  // Updated to send userInput directly
  });

  let content = "";

  try {
    const res = JSON.parse(response.data?.body!);
    content = res.content[0].text;
  } catch (e) {
    content = response.data?.body || "Error: Received an invalid response format";
  }

  return content;
}
