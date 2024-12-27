import { amplifyClient } from "./amplify-utils";

export async function generateRecipe({ userInput }: { userInput: string }) {
  const response = await amplifyClient.queries.askBedrock({
    userInput: userInput,  // Updated to send userInput directly
  });

  const res = JSON.parse(response.data?.body!);
  const content = res.content[0].text;
  return content || "";
}
