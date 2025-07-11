import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@uniformdev/csk-components/components/canvas';
import { Container } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';

export enum ContentAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type SectionParameters = ContainerParameters & {
  contentAlignment?: ContentAlignment;
  contentBackgroundColor?: string;
  contentSpacing?: ContainerParameters['spacing'];
};
enum SectionSlots {
  SectionContent = 'sectionContent',
  SectionMedia = 'sectionMedia',
  SectionCTA = 'sectionCTA',
}

type FeaturedSectionProps = ComponentProps<SectionParameters, SectionSlots>;

const FeaturedSection: FC<FeaturedSectionProps> = ({
  contentAlignment,
  slots,
  component,
  context,
  backgroundColor,
  contentBackgroundColor,
  contentSpacing,
  spacing,
  border,
  fluidContent,
  height,
}) => {
  const sectionContent = <UniformSlot data={component} context={context} slot={slots.sectionContent} />;
  const sectionCTA = <UniformSlot data={component} context={context} slot={slots.sectionCTA} />;
  const sectionMedia = <UniformSlot data={component} context={context} slot={slots.sectionMedia} />;

  const textAlignment = cn('text-center', {
    'text-start': contentAlignment === ContentAlignment.Left,
    'text-end': contentAlignment === ContentAlignment.Right,
  });
  const buttonAlignment = cn('justify-center', {
    '!justify-start': contentAlignment === ContentAlignment.Left,
    '!justify-end': contentAlignment === ContentAlignment.Right,
  });

  return (
    <Container className="relative" {...{ backgroundColor, spacing, border, fluidContent, height }}>
      <div className="absolute left-0 top-0 size-full overflow-hidden">{sectionMedia}</div>
      <Container className="relative min-h-full w-full">
        <Container
          className="absolute -top-28 right-0 flex w-full flex-col gap-8 md:w-3/5"
          backgroundColor={contentBackgroundColor}
          spacing={contentSpacing}
        >
          <div className={cn('flex flex-col gap-4', textAlignment)}>{sectionContent}</div>
          <div className={cn('flex flex-wrap gap-2', buttonAlignment)}>{sectionCTA}</div>
        </Container>
      </Container>
    </Container>
  );
};

export default FeaturedSection;
