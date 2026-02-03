// スライドデータの型定義
export type Slide = {
  id: number
  title: string
  content: string
  videoUrl?: string // 動画URL（YouTube埋め込み or ローカルmp4）
  imageUrl?: string // 画像URL（オプション）
}

// セクション（小見出し）の型定義
export type Section = {
  id: number
  name: string
  color: string // 背景色（hexコード）
  slides: Slide[]
}

// 観光デジタルパンフレット
export const sections: Section[] = [
  {
    id: 1,
    name: '絶景ムービー',
    color: '#7eb8c9', // 海の青
    slides: [
      { id: 101, title: '青い海と白い砂浜', content: '透明度抜群の美しいビーチ。シュノーケリングやダイビングに最適です。', videoUrl: '/videos/74939_1280x720.mp4' },
      { id: 102, title: '夕日に染まる水平線', content: '一日の終わりを彩る絶景。時間を忘れて眺めていたくなる瞬間。', videoUrl: '/videos/146422_1280x720.mp4' },
      { id: 103, title: '波の音に包まれて', content: '心地よい波音をBGMに、日常を忘れるひとときを。', videoUrl: '/videos/178081_1280x720.mp4' },
    ],
  },
  {
    id: 2,
    name: 'フォトスポット',
    color: '#c9a87e', // 砂浜のベージュ
    slides: [
      { id: 201, title: '朝焼けのビーチ', content: '早起きした人だけが見られる特別な景色。静寂と美しさに満ちた時間。', imageUrl: '/images/gabriel-ramos-BzxXl0U7zPs-unsplash.jpg' },
      { id: 202, title: 'ヤシの木と青空', content: 'SNS映え間違いなしのフォトスポット。南国ムード満点の一枚を。', imageUrl: '/images/datingscout-iuhx63NQZ1Y-unsplash.jpg' },
      { id: 203, title: '夕暮れのシルエット', content: '一日のクライマックス。ロマンチックな時間をお過ごしください。', imageUrl: '/images/samuel-scrimshaw-ugg5bBw2NBY-unsplash.jpg' },
    ],
  },
  {
    id: 3,
    name: 'アクセス',
    color: '#8bc9a8', // 自然の緑
    slides: [
      { id: 301, title: '空港から', content: '最寄り空港から車で約30分。レンタカーまたはシャトルバスをご利用ください。' },
      { id: 302, title: '駐車場', content: '無料駐車場完備（100台収容）。繁忙期は早めのお越しをおすすめします。' },
    ],
  },
  {
    id: 4,
    name: 'グルメ & お土産',
    color: '#c99e8b', // 珊瑚色
    slides: [
      { id: 401, title: '海鮮料理', content: '獲れたての新鮮な魚介を使った絶品料理。地元の味をご堪能ください。' },
      { id: 402, title: 'トロピカルドリンク', content: 'マンゴー、パッションフルーツなど南国フルーツを使ったドリンク。' },
      { id: 403, title: 'お土産ショップ', content: '地元の特産品やオリジナルグッズを取り揃えています。' },
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
