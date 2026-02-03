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

// フロントエンド学習ロードマップ
export const sections: Section[] = [
  {
    id: 1,
    name: 'Step 1: Web基礎',
    color: '#a8c4c9', // ティール（青系）
    slides: [
      { id: 101, title: 'HTML', content: 'Webページの構造を定義するマークアップ言語。セマンティックHTMLを意識しよう。' },
      { id: 102, title: 'CSS', content: 'スタイリングの基本。Flexbox、Gridをマスターすれば大抵のレイアウトは組める。' },
      { id: 103, title: 'JavaScript基礎', content: '変数、関数、配列、オブジェクト、DOM操作。ここが全ての土台になる。' },
    ],
  },
  {
    id: 2,
    name: 'Step 2: JavaScript深掘り',
    color: '#a8c9c0', // ミントグリーン
    slides: [
      { id: 201, title: 'ES6+構文', content: 'アロー関数、分割代入、スプレッド構文、テンプレートリテラル。モダンJSの必須知識。' },
      { id: 202, title: '非同期処理', content: 'Promise、async/await。API通信には必須。コールバック地獄を避けよう。' },
      { id: 203, title: 'モジュール', content: 'import/exportでコードを分割。保守性の高いコードを書く第一歩。' },
    ],
  },
  {
    id: 3,
    name: 'Step 3: React入門',
    color: '#c9bcd4', // ラベンダー
    slides: [
      { id: 301, title: 'コンポーネント', content: 'UIを再利用可能な部品に分割。関数コンポーネントが主流。' },
      { id: 302, title: 'JSX', content: 'JavaScript内でHTMLライクな記法。最初は違和感あるけどすぐ慣れる。' },
      { id: 303, title: 'Props', content: '親から子へデータを渡す仕組み。コンポーネント間の通信の基本。' },
      { id: 304, title: 'useState', content: '状態管理の基本Hook。ボタンクリックでカウントアップから始めよう。' },
    ],
  },
  {
    id: 4,
    name: 'Step 4: React実践',
    color: '#d4c0c9', // モーブ
    slides: [
      { id: 401, title: 'useEffect', content: '副作用を扱うHook。API通信、イベントリスナー登録などに使う。' },
      { id: 402, title: 'カスタムHook', content: 'ロジックの再利用。useXxxという命名規則で自作Hookを作ろう。' },
      { id: 403, title: 'React Router', content: 'SPAでのページ遷移。URLに応じてコンポーネントを切り替える。' },
    ],
  },
  {
    id: 5,
    name: 'Step 5: 開発環境',
    color: '#d4b8bc', // ローズピンク
    slides: [
      { id: 501, title: 'TypeScript', content: '型があるとバグが減る。最初は面倒でも、規模が大きくなると必須。' },
      { id: 502, title: 'Vite', content: '高速な開発サーバーとビルドツール。Create React Appより断然速い。' },
      { id: 503, title: 'Git/GitHub', content: 'バージョン管理は必須スキル。ブランチ、プルリクの流れを覚えよう。' },
    ],
  },
  {
    id: 6,
    name: 'Step 6: 次のステップ',
    color: '#dbb0a8', // コーラルピンク
    slides: [
      { id: 601, title: 'Tailwind CSS', content: 'ユーティリティファーストのCSSフレームワーク。慣れると爆速でスタイリングできる。' },
      { id: 602, title: 'Next.js', content: 'Reactのフレームワーク。SSR、API Routes、ファイルベースルーティング。' },
      { id: 603, title: '実際に作る', content: 'チュートリアルを卒業して、自分のアイデアを形にしよう。それが一番の学習。' },
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
