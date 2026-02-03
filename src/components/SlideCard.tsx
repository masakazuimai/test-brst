import type { Slide } from '../data/slides'

type SlideCardProps = {
  slide: Slide
  color: string
  onClick: () => void
}

// サムネイル表示用のスライドカードコンポーネント
export function SlideCard({ slide, color, onClick }: SlideCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        aspect-video w-full overflow-hidden rounded-lg
        flex flex-col text-left shadow-md
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-gray-400/50
      "
    >
      {/* タイトル部分 */}
      <div
        style={{ backgroundColor: color }}
        className="shrink-0 px-4 py-2"
      >
        <h4 className="text-sm font-bold text-gray-700 md:text-base">
          {slide.title}
        </h4>
      </div>
      {/* 本文部分 */}
      <div
        style={{ backgroundColor: `color-mix(in srgb, ${color} 20%, white)` }}
        className="flex-1 px-4 py-3"
      >
        <p className="line-clamp-3 text-xs text-gray-600 md:text-sm">
          {slide.content}
        </p>
      </div>
    </button>
  )
}
