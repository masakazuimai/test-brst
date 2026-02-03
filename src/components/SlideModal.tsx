import { useEffect, useCallback, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { FlatSlide } from '../data/slides'

type SlideModalProps = {
  slides: FlatSlide[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

// YouTube URLかどうか判定
function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com')
}

// base パスを取得
const basePath = import.meta.env.BASE_URL

// 拡大表示用のモーダルコンポーネント
export function SlideModal({
  slides,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: SlideModalProps) {
  const currentSlide = slides[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === slides.length - 1

  // モーダル開閉アニメーション用
  const [isVisible, setIsVisible] = useState(false)
  // スライド移動アニメーション用
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // モーダル表示時のフェードインアニメーション
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true))
  }, [])

  // 閉じるときのアニメーション
  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(onClose, 200)
  }, [onClose])

  // スライド移動（アニメーション付き）
  const handlePrev = useCallback(() => {
    if (isFirst || isAnimating) return
    setIsAnimating(true)
    setSlideDirection('right')
    setTimeout(() => {
      onPrev()
      setSlideDirection(null)
      setIsAnimating(false)
    }, 150)
  }, [isFirst, isAnimating, onPrev])

  const handleNext = useCallback(() => {
    if (isLast || isAnimating) return
    setIsAnimating(true)
    setSlideDirection('left')
    setTimeout(() => {
      onNext()
      setSlideDirection(null)
      setIsAnimating(false)
    }, 150)
  }, [isLast, isAnimating, onNext])

  // キーボード操作のハンドラー
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    },
    [handleClose, handlePrev, handleNext]
  )

  // キーボードイベントの登録
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // スライドのトランスフォームスタイル
  const getSlideTransform = () => {
    if (slideDirection === 'left') return 'translateX(-30px)'
    if (slideDirection === 'right') return 'translateX(30px)'
    return 'translateX(0)'
  }

  // メディアタイプの判定
  const hasVideo = Boolean(currentSlide.videoUrl)
  const hasImage = Boolean(currentSlide.imageUrl)
  const isYouTube = hasVideo && isYouTubeUrl(currentSlide.videoUrl!)
  const isLocalVideo = hasVideo && !isYouTube

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4
        transition-opacity duration-200
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleClose}
    >
      {/* スライドコンテナ - クリックでモーダルを閉じない */}
      <div
        className={`
          relative w-full max-w-4xl
          transition-all duration-200
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute -right-2 -top-12 rounded-full p-2 text-white/70 transition-colors hover:text-white"
          aria-label="閉じる"
        >
          <X size={28} />
        </button>

        {/* スライド本体 */}
        <div
          style={{
            transform: getSlideTransform(),
            opacity: slideDirection ? 0.7 : 1,
          }}
          className="
            aspect-video w-full overflow-hidden rounded-xl shadow-2xl
            flex flex-col
            transition-all duration-150 ease-out
          "
        >
          {isYouTube ? (
            // YouTube動画
            <iframe
              src={currentSlide.videoUrl}
              title={currentSlide.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : isLocalVideo ? (
            // ローカル動画
            <video
              key={currentSlide.id}
              src={`${basePath}${currentSlide.videoUrl}`}
              className="h-full w-full object-cover"
              controls
              autoPlay
              muted
            />
          ) : hasImage ? (
            // 画像
            <img
              src={`${basePath}${currentSlide.imageUrl}`}
              alt={currentSlide.title}
              className="h-full w-full object-cover"
            />
          ) : (
            // 通常のテキストスライド
            <>
              {/* タイトル部分 */}
              <div
                style={{ backgroundColor: currentSlide.color }}
                className="shrink-0 px-8 py-4 md:px-12 md:py-6"
              >
                <h2 className="text-2xl font-bold text-gray-700 md:text-4xl">
                  {currentSlide.title}
                </h2>
              </div>
              {/* 本文部分 */}
              <div
                style={{ backgroundColor: `color-mix(in srgb, ${currentSlide.color} 15%, white)` }}
                className="flex-1 px-8 py-6 md:px-12 md:py-8"
              >
                <p className="text-lg text-gray-600 md:text-xl">
                  {currentSlide.content}
                </p>
              </div>
            </>
          )}
        </div>

        {/* 左矢印ボタン */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={isFirst}
          className={`
            absolute left-0 top-1/2 -translate-x-12 -translate-y-1/2
            rounded-full bg-white/20 p-3 text-white
            transition-all duration-200
            ${isFirst ? 'cursor-not-allowed opacity-30' : 'hover:bg-white/30'}
          `}
          aria-label="前のスライド"
        >
          <ChevronLeft size={24} />
        </button>

        {/* 右矢印ボタン */}
        <button
          type="button"
          onClick={handleNext}
          disabled={isLast}
          className={`
            absolute right-0 top-1/2 -translate-y-1/2 translate-x-12
            rounded-full bg-white/20 p-3 text-white
            transition-all duration-200
            ${isLast ? 'cursor-not-allowed opacity-30' : 'hover:bg-white/30'}
          `}
          aria-label="次のスライド"
        >
          <ChevronRight size={24} />
        </button>

        {/* ページインジケーター（ドット） */}
        <div className="mt-6 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`
                h-2 rounded-full transition-all duration-200
                ${index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'}
              `}
            />
          ))}
        </div>

        {/* ページ番号 */}
        <div className="mt-2 text-center text-sm text-white/60">
          {currentIndex + 1} / {slides.length}
        </div>
      </div>
    </div>
  )
}
