// スライドデータの型定義
export type Slide = {
  id: number
  title: string
  content: string
}

// セクション（小見出し）の型定義
export type Section = {
  id: number
  name: string
  color: string // 背景色（hexコード）
  slides: Slide[]
}

// サンプルデータ（ライトグレイッシュトーン：青系→ピンク系グラデーション）
export const sections: Section[] = [
  {
    id: 1,
    name: 'プロジェクト概要',
    color: '#a8c4c9', // ティール（青系）
    slides: [
      { id: 101, title: 'はじめに', content: '本プロジェクトの目的と背景について説明します。' },
      { id: 102, title: 'ビジョン', content: 'ユーザー中心のプロダクト開発を目指します。' },
      { id: 103, title: 'スコープ', content: 'MVP機能の定義と優先順位付け。' },
    ],
  },
  {
    id: 2,
    name: '目標と課題',
    color: '#a8c9c0', // ミントグリーン
    slides: [
      { id: 201, title: '目標設定', content: 'KPI: DAU 10,000、継続率 40%を目指します。' },
      { id: 202, title: '現状の課題', content: 'レガシーシステムの技術的負債が蓄積。' },
    ],
  },
  {
    id: 3,
    name: '技術スタック',
    color: '#c9bcd4', // ラベンダー
    slides: [
      { id: 301, title: 'フロントエンド', content: 'React、TypeScript、Tailwind CSSを採用。' },
      { id: 302, title: 'バックエンド', content: 'Node.js + Express、PostgreSQLで構築。' },
      { id: 303, title: 'インフラ', content: 'AWS上でコンテナベースのデプロイ。' },
      { id: 304, title: 'CI/CD', content: 'GitHub ActionsとArgo CDで自動化。' },
    ],
  },
  {
    id: 4,
    name: 'タイムライン',
    color: '#d4c0c9', // モーブ
    slides: [
      { id: 401, title: 'フェーズ1：設計', content: '要件定義、UI/UXデザイン、アーキテクチャ設計。' },
      { id: 402, title: 'フェーズ2：実装', content: 'コア機能の開発とユニットテスト。' },
      { id: 403, title: 'フェーズ3：テスト', content: '統合テスト、UAT、パフォーマンステスト。' },
    ],
  },
  {
    id: 5,
    name: 'チーム構成',
    color: '#d4b8bc', // ローズピンク
    slides: [
      { id: 501, title: 'メンバー', content: 'フロントエンド2名、バックエンド2名、デザイナー1名。' },
      { id: 502, title: '役割分担', content: 'スクラム体制でスプリントを回します。' },
    ],
  },
  {
    id: 6,
    name: 'まとめ',
    color: '#dbb0a8', // コーラルピンク
    slides: [
      { id: 601, title: '結論', content: '本プロジェクトで価値あるプロダクトを届けます。' },
      { id: 602, title: 'Q&A', content: 'ご清聴ありがとうございました。質問をお受けします。' },
    ],
  },
]

// 全スライドをフラット化（モーダル用）
export type FlatSlide = Slide & { sectionId: number; color: string }

export function getFlatSlides(): FlatSlide[] {
  return sections.flatMap((section) =>
    section.slides.map((slide) => ({
      ...slide,
      sectionId: section.id,
      color: section.color,
    }))
  )
}

// スライドIDからフラットインデックスを取得
export function getSlideIndex(slideId: number): number {
  const flatSlides = getFlatSlides()
  return flatSlides.findIndex((s) => s.id === slideId)
}
