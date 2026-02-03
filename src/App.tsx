import { useState, useMemo } from 'react'
import { sections, getFlatSlides, getSlideIndex } from './data/slides'
import { SlideCard } from './components/SlideCard'
import { SlideModal } from './components/SlideModal'

function App() {
  // 現在選択中のスライドインデックス（nullの場合はモーダル非表示）
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // フラット化したスライド一覧（メモ化）
  const flatSlides = useMemo(() => getFlatSlides(), [])

  const openModal = (slideId: number) => {
    const index = getSlideIndex(slideId)
    if (index !== -1) {
      setSelectedIndex(index)
    }
  }

  const closeModal = () => setSelectedIndex(null)

  const goToPrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < flatSlides.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* ヘッダー */}
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          プレゼンテーションビューアー
        </h1>

        {/* セクションごとに表示 */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="rounded-xl bg-white p-6 shadow-sm">
              {/* セクションヘッダー */}
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: section.color }}
                />
                <h2 className="text-xl font-bold text-gray-700">
                  {section.name}
                </h2>
                <span className="text-sm text-gray-400">
                  ({section.slides.length}枚)
                </span>
              </div>

              {/* スライドグリッド */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.slides.map((slide) => (
                  <SlideCard
                    key={slide.id}
                    slide={slide}
                    color={section.color}
                    onClick={() => openModal(slide.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* モーダル */}
      {selectedIndex !== null && (
        <SlideModal
          slides={flatSlides}
          currentIndex={selectedIndex}
          onClose={closeModal}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </div>
  )
}

export default App
