import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getSectionMetas, getAllSectionMarkdowns } from '@/lib/content'
import { PageClient } from '@/components/PageClient'
import { SectionBlock } from '@/components/SectionBlock'
import type { Lang } from '@/types'

const SUPPORTED_LANGS = ['ko', 'en'] as const

export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam as (typeof SUPPORTED_LANGS)[number]

  if (lang === 'en') {
    return {
      title: 'CC101 — Claude Code Beginner Guide',
      description:
        'The easiest guide to get started with Claude Code — from installation to CLAUDE.md, MCP, Skills, and Hooks',
      openGraph: {
        title: 'CC101 — Claude Code Beginner Guide',
        description:
          'The easiest guide to get started with Claude Code — from installation to CLAUDE.md, MCP, Skills, and Hooks',
        images: [{ url: 'https://cc101.axwith.com/og.png' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'CC101 — Claude Code Beginner Guide',
        description:
          'The easiest guide to get started with Claude Code — from installation to CLAUDE.md, MCP, Skills, and Hooks',
        images: ['https://cc101.axwith.com/og.png'],
      },
    }
  }

  return {
    title: 'CC101 — Claude Code 한국어 입문 가이드',
    description:
      'Claude Code 설치부터 CLAUDE.md, MCP, Skills, Hooks까지 — 공식 문서 기반으로 쉽게 정리한 한국어 입문 가이드',
    openGraph: {
      title: 'CC101 — Claude Code 한국어 입문 가이드',
      description:
        'Claude Code 설치부터 CLAUDE.md, MCP, Skills, Hooks까지 — 공식 문서 기반으로 쉽게 정리한 한국어 입문 가이드',
      images: [{ url: 'https://cc101.axwith.com/og.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'CC101 — Claude Code 한국어 입문 가이드',
      description:
        'Claude Code 설치부터 CLAUDE.md, MCP, Skills, Hooks까지 — 공식 문서 기반으로 쉽게 정리한 한국어 입문 가이드',
      images: ['https://cc101.axwith.com/og.png'],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { lang: langParam } = await params

  if (!SUPPORTED_LANGS.includes(langParam as (typeof SUPPORTED_LANGS)[number])) {
    notFound()
  }

  const lang = langParam as Lang

  const sections = getSectionMetas()
  const sectionContents = getAllSectionMarkdowns(lang)

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PageClient lang={lang} sections={sections}>
        {sectionContents.map(({ meta, markdown }) => {
          const title = lang === 'ko' ? meta.title_ko : meta.title_en
          const description = lang === 'ko' ? meta.description_ko : meta.description_en
          const badge = lang === 'ko' ? meta.badge : (meta.badge_en ?? meta.badge)

          return (
            <SectionBlock
              key={meta.id}
              id={meta.id}
              order={meta.order}
              tier={meta.tier}
              title={title}
              description={description}
              badge={badge}
              lang={lang}
            >
              <MDXRemote
                source={markdown}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </SectionBlock>
          )
        })}
      </PageClient>
    </Suspense>
  )
}
