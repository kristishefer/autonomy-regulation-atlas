import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  KNOWLEDGE_CONCEPTS,
  getKnowledgeConceptBySlug,
} from "@/app/explore/learning-data";
import { ConceptUnit } from "@/app/learn/LearningComponents";

export function generateStaticParams() {
  return KNOWLEDGE_CONCEPTS.map((concept) => ({ slug: concept.slug }));
}

export async function generateMetadata({ params }: PageProps<"/learn/safety-standards/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const concept = getKnowledgeConceptBySlug(slug);
  if (!concept) return {};
  return {
    title: `${concept.title} | Atlas Learning`,
    description: concept.plainEnglish,
  };
}

export default async function LearningUnitPage({ params }: PageProps<"/learn/safety-standards/[slug]">) {
  const { slug } = await params;
  const concept = getKnowledgeConceptBySlug(slug);
  if (!concept) notFound();
  return <ConceptUnit concept={concept} />;
}
