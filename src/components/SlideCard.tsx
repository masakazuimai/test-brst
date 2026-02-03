import { Play, Image as ImageIcon } from 'lucide-react'
import type { Slide } from '../data/slides'

type SlideCardProps = {
  slide: Slide
  color: string
  onClick: () => void
}

// YouTube URLから動画IDを抽出
function getYouTubeId(url: string): string | null {
  const match = url.match(/embed\/([^?]+)/)
  return match ? match[1] : null
}

// YouTube URLかどうか判定
function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com')
}

// base パスを取得
const basePath = import.meta.env.BASE_URL

// サムネイル表示用のスライドカードコンポーネント
export function SlideCard({ slide, color, onClick }: SlideCardProps) {
  const getVideoThumbnail = () => {
    if (!slide.videoUrl) return null
    if (isYouTubeUrl(slide.videoUrl)) {
      const videoId = getYouTubeId(slide.videoUrl)
      return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null
    }
    return null
  }

  const thumbnailUrl = getVideoThumbnail()
  const hasVideo = Boolean(slide.videoUrl)
  const hasImage = Boolean(slide.imageUrl)
  const isLocalVideo = hasVideo && !isYouTubeUrl(slide.videoUrl!)

  // メディアがあるカード（動画・画像）
  if (hasImage || isLocalVideo || thumbnailUrl) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="
          group relative aspect-[4/3] w-full overflow-hidden rounded-2xl
          bg-white shadow-lg
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-cyan-400/50
        "
      >
        {/* 背景メディア */}
        {hasImage ? (
          <img
            src={`${basePath}${slide.imageUrl}`}
            alt={slide.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : isLocalVideo ? (
          <video
            src={`${basePath}${slide.videoUrl}`}
            className="h-full w-full object-cover"
            muted
            preload="metadata"
          />
        ) : (
          <img
            src={thumbnailUrl!}
            alt={slide.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* 再生/画像アイコン */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/90 p-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
            {hasVideo ? (
              <Play size={28} className="text-gray-800" fill="currentColor" />
            ) : (
              <ImageIcon size={28} className="text-gray-800" />
            )}
          </div>
        </div>

        {/* テキストオーバーレイ */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-left text-white">
          <h4 className="text-lg font-bold drop-shadow-lg">
            {slide.title}
          </h4>
          <p className="mt-1 line-clamp-2 text-sm text-white/90 drop-shadow">
            {slide.content}
          </p>
        </div>

        {/* カラーアクセント */}
        <div
          className="absolute left-0 top-0 h-1 w-full"
          style={{ backgroundColor: color }}
        />
      </button>
    )
  }

  // テキストのみのカード
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group relative aspect-[4/3] w-full overflow-hidden rounded-2xl
        bg-white shadow-lg
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-cyan-400/50
      "
    >
      {/* カラーアクセント上部 */}
      <div
        className="h-2 w-full"
        style={{ backgroundColor: color }}
      />

      {/* コンテンツ */}
      <div className="flex h-[calc(100%-0.5rem)] flex-col p-5">
        <h4 className="text-lg font-bold text-gray-800">
          {slide.title}
        </h4>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
          {slide.content}
        </p>
        <div className="mt-4 flex items-center justify-end">
          <span
            className="rounded-full px-3 py-1 text-xs font-medium text-white"
            style={{ backgroundColor: color }}
          >
            詳しく見る
          </span>
        </div>
      </div>
    </button>
  )
}
