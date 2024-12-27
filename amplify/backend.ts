import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

const backend = defineBackend({
  data,
});

// Update this URL to the predefined flow's endpoint
const predefinedFlowUrl = "https://bedrock-runtime.us-east-1.amazonaws.com"; // Modify if necessary

const bedrockDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "bedrockDS",
  predefinedFlowUrl,
  {
    authorizationConfig: {
      signingRegion: "us-east-1",  // Ensure this matches your predefined flow region
      signingServiceName: "bedrock",  // Adjust if the service name differs for the flow
    },
  }
);

// Update the Policy Statement to match the predefined flow's requirements
bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [
      "arn:aws:bedrock:us-east-1:796973475993:flow/FOB0K1V68X",
    ],
    actions: ["bedrock:InvokeFlow"],  // Ensure this action is correct for invoking the flow
  })
);
