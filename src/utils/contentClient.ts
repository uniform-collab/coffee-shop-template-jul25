import { ContentClient } from '@uniformdev/canvas';

const contentClient = new ContentClient({
  apiKey: process.env.UNIFORM_API_KEY,
  apiHost: process.env.UNIFORM_CLI_BASE_URL,
  projectId: process.env.UNIFORM_PROJECT_ID,
  edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL,
});

export default contentClient;
