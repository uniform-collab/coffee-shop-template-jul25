import { PreviewClient } from '@uniformdev/canvas';

const previewClient = new PreviewClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
  apiHost: process.env.UNIFORM_CLI_BASE_URL!,
});

type GetPreviewViewportsResponse = Awaited<ReturnType<typeof previewClient.getPreviewViewports>>;
type PreviewViewportsType = GetPreviewViewportsResponse['previewViewports'];

let previewViewports: PreviewViewportsType = [];

export const getPreviewViewports = async (): Promise<PreviewViewportsType> => {
  if (previewViewports.length === 0) {
    const viewports = await previewClient.getPreviewViewports();
    previewViewports = viewports.previewViewports;
  }
  return previewViewports;
};
