import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { Article, ContentType, WithUniformContentEntrySystemParams } from '@/types';

export type ArticleCardProps = WithUniformContentEntrySystemParams<Article> & {
  contentType: ContentType.Article;
  textColor?: string;
  border?: string;
};

const ArticleResultCard: FC<ArticleCardProps> = ({
  title,
  thumbnail,
  shortDescription,
  author,
  textColor,
  slug,
  border,
}) => {
  const asset = thumbnail?.[0];

  if (!asset) return null;

  return (
    <Link
      href={`/articles/${slug}`}
      className={cn('flex flex-col gap-y-4 p-4 hover:scale-[1.02] hover:shadow-md transition-all duration-300', {
        [`text-${textColor}`]: textColor,
        border,
      })}
    >
      <Image
        className="aspect-video object-cover"
        src={asset.url}
        alt={title}
        width={asset.width}
        height={asset.height}
      />
      <div className="flex flex-col gap-y-4">
        <p className="text-2xl font-bold">{title}</p>
        {shortDescription && <p className="text-base">{shortDescription}</p>}
        {author && <p className="text-base">by {author.name}</p>}
        <Button className="mt-auto border border-button-secondary bg-button-secondary px-6 py-3 text-sm uppercase text-text-primary hover:bg-button-primary hover:text-text-secondary">
          Read Article
        </Button>
      </div>
    </Link>
  );
};

export default ArticleResultCard;
