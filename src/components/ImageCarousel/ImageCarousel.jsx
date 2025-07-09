import React from 'react'
import BackButton from '../BackButton/BackButton'
import Sidebar from '../Sidebar/Sidebar'
import './ImageCarousel.css'
import { useSEO } from '../../utils/useSEO'

const data = [
  {
    id: 1,
    src: 'https://picsum.photos/800/600?random=1',
    alt: 'Nature landscape',
    title: 'Beautiful Mountain Vista',
    description: 'A breathtaking view of snow-capped mountains at sunset',
  },
  {
    id: 2,
    src: 'https://picsum.photos/800/600?random=2',
    alt: 'Ocean waves',
    title: 'Ocean Paradise',
    description: 'Crystal clear waters meeting pristine sandy beaches',
  },
  {
    id: 3,
    src: 'https://picsum.photos/800/600?random=3',
    alt: 'Forest path',
    title: 'Mystic Forest',
    description: 'A winding path through ancient woodland',
  },
  {
    id: 4,
    src: 'https://picsum.photos/800/600?random=4',
    alt: 'City skyline',
    title: 'Urban Lights',
    description: 'Modern city skyline illuminated at night',
  },
  {
    id: 5,
    src: 'https://picsum.photos/800/600?random=5',
    alt: 'Desert landscape',
    title: 'Desert Dunes',
    description: 'Golden sand dunes stretching to the horizon',
  },
  {
    id: 6,
    src: 'https://picsum.photos/800/600?random=6',
    alt: 'Waterfall',
    title: 'Cascading Falls',
    description: 'Powerful waterfall in tropical rainforest',
  },
]

const ImageCarousel = () => {
  useSEO('/carousel')
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAutoPlay, setIsAutoPlay] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [copySuccess, setCopySuccess] = React.useState('')
  const configText = JSON.stringify(data, null, 2)

  const nextImage = () => {
    setImageLoaded(false)
    setCurrentIndex((prev) => (prev + 1) % data.length)
  }

  const prevImage = () => {
    setImageLoaded(false)
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length)
  }

  const goToImage = (index) => {
    setImageLoaded(false)
    setCurrentIndex(index)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }

  // Auto-play functionality
  React.useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(nextImage, 3000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlay, currentIndex])

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        prevImage()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        nextImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const currentImage = data[currentIndex]

  const handleCopy = () => {
    navigator.clipboard.writeText(configText).then(() => {
      setCopySuccess('Copied!')
      setTimeout(() => setCopySuccess(''), 2000)
    })
  }

  return (
    <section className='carousel__container'>
      <Sidebar>
        <BackButton />

        <div className='carousel__panel carousel__panel--info'>
          <h2 className='carousel__panel-title'>Current Image</h2>
          <div className='carousel__panel-content'>
            <h3 className='carousel__image-title'>{currentImage.title}</h3>
            <p className='carousel__image-description'>
              {currentImage.description}
            </p>
            <div className='carousel__image-meta'>
              <span className='carousel__image-counter'>
                {currentIndex + 1} of {data.length}
              </span>
            </div>
            <button
              onClick={toggleAutoPlay}
              className={`carousel__auto-play ${
                isAutoPlay ? 'carousel__auto-play--active' : ''
              }`}
            >
              {isAutoPlay ? '⏸️ Pause' : '▶️ Auto Play'}
            </button>
          </div>
        </div>

        <div className='carousel__panel carousel__panel--thumbnails'>
          <h2 className='carousel__panel-title'>Thumbnails</h2>
          <div className='carousel__thumbnails'>
            {data.map((image, index) => (
              <button
                key={image.id}
                className={`carousel__thumbnail ${
                  index === currentIndex ? 'carousel__thumbnail--active' : ''
                }`}
                onClick={() => goToImage(index)}
              >
                <img
                  src={`https://picsum.photos/60/45?random=${image.id}`}
                  alt={image.alt}
                  className='carousel__thumbnail-image'
                />
                <span className='carousel__thumbnail-number'>{index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <div className='carousel__panel carousel__panel--rules'>
          <h2 className='carousel__panel-title'>Rules</h2>
          <ul className='carousel__panel-list'>
            <li className='carousel__panel-item'>
              Navigate with arrow buttons or keys
            </li>
            <li className='carousel__panel-item'>Click thumbnails to jump</li>
            <li className='carousel__panel-item'>Smooth transitions</li>
          </ul>
        </div>

        <div className='carousel__panel carousel__panel--hints'>
          <h2 className='carousel__panel-title'>Hints</h2>
          <ul className='carousel__panel-list'>
            <li className='carousel__panel-item'>
              <strong>Image Container:</strong> Use{' '}
              <code>object-fit: cover</code>
              to maintain aspect ratio. Container size: 800×600px on desktop.
            </li>
            <li className='carousel__panel-item'>
              <strong>Navigation:</strong> Arrow buttons should be 48×48px
              circles. Use smooth hover effects with{' '}
              <code>transform: scale(1.1)</code>.
            </li>
            <li className='carousel__panel-item'>
              <strong>Thumbnails:</strong> Size 60×45px with 2px border. Active
              thumbnail has darker border and shadow.
            </li>
            <li className='carousel__panel-item'>
              <strong>Keyboard Navigation:</strong> Use arrow keys for
              navigation and spacebar to toggle auto-play. Add event listeners
              properly.
            </li>
            <li className='carousel__panel-item'>
              <span className='carousel__color carousel__color--111' /> #111
              (buttons)
            </li>
            <li className='carousel__panel-item'>
              <span className='carousel__color carousel__color--333' /> #333
              (hover)
            </li>
            <li className='carousel__panel-item'>
              <span className='carousel__color carousel__color--f5f5f5' />{' '}
              #f5f5f5 (sidebar)
            </li>
            <li className='carousel__panel-item'>
              <span className='carousel__color carousel__color--fafafa' />{' '}
              #fafafa (main bg)
            </li>
            <li className='carousel__panel-item'>
              <span className='carousel__color carousel__color--ccc' /> #ccc
              (inactive dots)
            </li>
          </ul>
        </div>

        <div className='carousel__panel carousel__panel--hints'>
          <h2 className='carousel__panel-title'>Sample Data</h2>
          <pre className='tree-view__config-box'>{configText}</pre>
          <button
            className='carousel__copy-button'
            onClick={handleCopy}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#222')
            }
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#444')}
            aria-label='Copy config JSON to clipboard'
          >
            Copy
          </button>
          {copySuccess && (
            <div className='tree-view__copy-success-text'>{copySuccess}</div>
          )}
        </div>
      </Sidebar>

      <div className='carousel__main'>
        <h1 className='carousel__title'>Image Carousel</h1>

        <div className='carousel__viewer'>
          <button
            onClick={prevImage}
            className='carousel__nav-button carousel__nav-button--prev'
            aria-label='Previous image'
          >
            &#8249;
          </button>

          <div className='carousel__image-container'>
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className={`carousel__image ${
                imageLoaded ? 'carousel__image--loaded' : ''
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            <div className='carousel__image-overlay'>
              <h3 className='carousel__overlay-title'>{currentImage.title}</h3>
            </div>
          </div>

          <button
            onClick={nextImage}
            className='carousel__nav-button carousel__nav-button--next'
            aria-label='Next image'
          >
            &#8250;
          </button>
        </div>

        <div className='carousel__indicators'>
          {data.map((_, index) => (
            <button
              key={index}
              className={`carousel__indicator ${
                index === currentIndex ? 'carousel__indicator--active' : ''
              }`}
              onClick={() => goToImage(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImageCarousel
