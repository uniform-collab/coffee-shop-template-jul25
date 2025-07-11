import { BlockValue, ComponentInstance } from '@uniformdev/canvas';
import { MappedAsset, UniformContentEntry, WithUniformContentEntrySystemParams } from '@/types';

const emptyObject = {} as const;

export const mapCanvasParameters = <T extends { id?: string } = { [key: string]: unknown }>(
  parameters: ComponentInstance['parameters'],
  id?: string
): T => {
  if (!parameters) return emptyObject as T;
  const data = Object.keys(parameters).reduce((acc: Record<string, unknown>, key) => {
    const parameter = parameters[key];

    if (parameter.type === '$block') {
      acc[key] = (parameter.value as BlockValue).map(block => ({
        ...mapUniformContentFields(block.fields),
        type: block.type,
        id: block._id,
      }));
      return acc;
    }

    if (parameter.type === 'asset' && Array.isArray(parameter.value)) {
      acc[key] = parameter.value.map(asset => mapUniformContentFields<MappedAsset>(asset.fields));
      return acc;
    }

    if (parameter.type === 'contentReference') {
      if (Array.isArray(parameter.value)) {
        acc[key] = parameter.value.map(reference => mapUniformContentEntryFields(reference.entry));
      } else {
        acc[key] = mapUniformContentEntryFields((parameter.value as { entry: UniformContentEntry }).entry);
      }
      return acc;
    }

    acc[key] = parameter.value;
    return acc;
  }, {}) as T;

  return id ? { ...data, id } : data;
};

export const mapUniformContentEntryFields = <T extends Record<string, unknown>>(
  entry: UniformContentEntry
): WithUniformContentEntrySystemParams<T> => {
  if (!entry) return {} as WithUniformContentEntrySystemParams<T>;
  const entryFields = mapCanvasParameters<T>(entry.fields);

  return {
    slug: entry._slug as string,
    id: entry._id,
    contentType: entry.type,
    ...entryFields,
  };
};

export const mapUniformContentFields = <T extends { id?: string } = { [key: string]: unknown }>(
  fields: UniformContentEntry['fields']
) => {
  return mapCanvasParameters<T>(fields);
};
