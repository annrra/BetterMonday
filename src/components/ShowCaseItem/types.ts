export type FileNode = {
  file: string | null;
  filePath: string | null;
  fileSize?: number;
  guid?: string;
  altText?: string | null;
  title?: string | null;
  uri?: string | null;
}

export type Category = {
  name: string;
  slug: string;
}

export type ShowcaseItem = {
  nextShowcaseItemHeading?: string | null;
  nextShowcaseItemSubheading?: string | null;
  nextShowcaseItemDescription?: string | null;
  nextShowcaseItemTag01?: string | null;
  nextShowcaseItemTag02?: string | null;
  nextShowcaseItemTag03?: string | null;
  nextShowcaseItemTag04?: string | null;
  nextShowcaseItemTag05?: string | null;
  nextShowcaseItemLinktext?: string | null;
  nextShowcaseItemLinkurl?: string | null;
  nextShowcaseItemBonusHeading?: string | null;
  nextShowcaseItemBonusInfo?: string | null;

  nextShowcaseItemFeaturedImage?: { node: FileNode } | null;
  nextShowcaseItemIconFigure?: { node: FileNode } | null;
  nextShowcaseItemMedia01?: { node: FileNode } | null;
  nextShowcaseItemMedia02?: { node: FileNode } | null;
  nextShowcaseItemMedia03?: { node: FileNode } | null;
  nextShowcaseItemMedia04?: { node: FileNode } | null;
  nextShowcaseItemMedia05?: { node: FileNode } | null;
  nextShowcaseItemMedia06?: { node: FileNode } | null;
  nextShowcaseItemMedia07?: { node: FileNode } | null;
  nextShowcaseItemMedia08?: { node: FileNode } | null;
  nextShowcaseItemCaption01?: string | null;
  nextShowcaseItemCaption02?: string | null;
  nextShowcaseItemCaption03?: string | null;
}

export type FeaturedImage = {
  node: FileNode | null;
}

export type ShowCasePost = {
  guid: string;
  id: string;
  title: string;
  slug: string;
  status: string;
  uri: string;
  content?: string | null;
  excerpt?: string | null;
  categories: { nodes: Category[] };
  featuredImage?: FeaturedImage | null;
  nextshowcaseitem?: ShowcaseItem | null;
}

export type ShowCaseItemResponse = {
  post?: ShowCasePost | null;
}
