export function request(ctx) {
  const { userInput = "" } = ctx.args;

  const document = `User input: ${userInput}`;

  return {
    // Update the resource path to match your predefined flow endpoint
    resourcePath: `/v1/flows/FOB0K1V68X/invoke`,  // Modify with your actual flow endpoint
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
  if (result.flowCompletionEvent?.completionReason === 'SUCCESS') {
    return {
      body: result.flowOutputEvent?.content?.document ?? 'Flow invocation succeeded but no document returned.',
    };
  } else {
    return {
      body: `The flow invocation completed due to the following reason: ${result.flowCompletionEvent?.completionReason}`,
    };
  }
}
