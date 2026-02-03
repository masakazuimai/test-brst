import { useState, useMemo } from 'react'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import { sections, getFlatSlides, getSlideIndex } from './data/slides'
import { SlideCard } from './components/SlideCard'
import { SlideModal } from './components/SlideModal'

function App() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
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
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-cyan-50 to-amber-50">
      {/* ヒーローセクション */}
      <header className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 px-4 py-16 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute -bottom-10 right-10 h-60 w-60 rounded-full bg-yellow-300/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-2 text-sm font-medium tracking-widest uppercase text-cyan-100">
            Welcome to
          </p>
          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
            Paradise Beach
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-cyan-100 md:text-xl">
            青い海と白い砂浜が広がる楽園。<br className="hidden md:block" />
            心癒される特別な時間をお過ごしください。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <span className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <MapPin size={16} /> 沖縄県
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <Clock size={16} /> 9:00 - 18:00
            </span>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.id}>
              {/* セクションヘッダー */}
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="h-1 w-12 rounded-full"
                  style={{ backgroundColor: section.color }}
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  {section.name}
                </h2>
              </div>

              {/* スライドグリッド */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {section.slides.map((slide) => (
                  <SlideCard
                    key={slide.id}
                    slide={slide}
                    color={section.color}
                    onClick={() => openModal(slide.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 px-4 py-12 text-gray-300">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Paradise Beach</h3>
              <p className="text-sm leading-relaxed">
                美しい自然と温かいおもてなしで、<br />
                皆様のお越しをお待ちしております。
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">お問い合わせ</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone size={14} /> 098-XXX-XXXX
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} /> info@paradise-beach.example
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={14} /> 沖縄県○○市△△町1-2-3
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">営業時間</h3>
              <ul className="space-y-2 text-sm">
                <li>営業時間: 9:00 - 18:00</li>
                <li>定休日: 年中無休</li>
                <li className="text-xs text-gray-400">※天候により変更の場合あり</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            © 2025 Paradise Beach. All rights reserved.
          </div>
        </div>
      </footer>

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
