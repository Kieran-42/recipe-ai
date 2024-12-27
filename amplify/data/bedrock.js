export function request(ctx) {
  const { userInput = "" } = ctx.args;

  const document = `User input: ${userInput}`;

  return {
    // Update the resource path to match your predefined flow endpoint
    resourcePath: "/v1/flows/FOB0K1V68X/invoke",  // Replace with your actual flow endpoint
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        flowIdentifier: "FOB0K1V68X",  // Replace with your flow identifier
        flowAliasIdentifier: "GN7Q1PBLU6",  // Replace with your flow alias identifier
        inputs: [
          {
            content: {
              document: document
            },
            nodeName: 'FlowInputNode',
            nodeOutputName: 'document'
          },
        ],
      },
    },
  };
}

export function response(ctx) {
  const result = JSON.parse(ctx.result.body);
  console.log("Flow response:", result); // Log the flow response for debugging

  if (result.flowCompletionEvent?.completionReason === 'SUCCESS') {
    // Return everything in the flowOutputEvent array
    return {
      body: JSON.stringify(result.flowOutputEvent),
    };
  } else {
    // Output everything received if the flow is not completed
    return {
      body: JSON.stringify(result),
    };
  }
}
