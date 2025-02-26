// https://v0.dev/chat/PW7RbMctgbv
// PROMPT: create a rating component like amazon. only the star icons. it get rating as number and show stars based on it. it should cover all floating point numbers like 4.2, 4.5, 4.8

import React from 'react'
import { Star } from 'lucide-react'

/**
 * A rating component that displays a series of 5 stars, with the option
 * to specify a partial star rating with a floating point number.
 *
 * @param {Object} props
 * @prop {number} [rating=0] - The rating to display, from 0 to 5
 * @prop {number} [size=6] - The size of the stars, in pixels
 * @returns {React.ReactElement} A React element representing the rating
 *
 * @example
 * <Rating rating={4.5} />
 */
export default function Rating({
  rating = 0,
  size = 6,
}: {
  rating: number
  size?: number
}) {
  const fullStars = Math.floor(rating)
  const partialStar = rating % 1
  const emptyStars = 5 - Math.ceil(rating)

  return (
    <div
      className='flex items-center'
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`w-${size} h-${size} fill-primary text-primary`}
        />
      ))}
      {partialStar > 0 && (
        <div className='relative'>
          <Star className={`w-${size} h-${size} text-primary`} />
          <div
            className='absolute top-0 left-0 overflow-hidden'
            style={{ width: `${partialStar * 100}%` }}
          >
            <Star className='w-6 h-6 fill-primary text-primary' />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={`w-${size} h-${size}  text-primary`}
        />
      ))}
    </div>
  )
}
