import { HomeCard } from '@/components/shared/home/home-card'
import { HomeCarousel } from '@/components/shared/home/home-carousel'
import data from '@/lib/data'
import {
  getAllCategories,
  getProductsByTag,
  getProductsForCard,
} from '@/lib/actions/product.actions'
import { toSlug } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import ProductSlider from '@/components/shared/product/product-slider'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'

/**
 * The homepage of the e-commerce website.
 *
 * It fetches a list of 4 categories, 4 new arrival products, 4 best seller products, and 4 featured products.
 *
 * It renders a carousel with the carousels data from the database.
 *
 * It renders a HomeCard component with a list of cards, each containing a title, a list of items, and an optional link.
 *
 * The first card displays the categories to explore with a link to the search page.
 * The second card displays the new arrivals with a link to the search page with the tag 'new-arrival'.
 * The third card displays the best sellers with a link to the search page with the tag 'best-seller'.
 * The fourth card displays the featured products with a link to the search page with the tag 'featured'.
 *
 * @returns A JSX element representing the homepage.
 */
export default async function HomePage() {
  const categories = (await getAllCategories()).slice(0, 4)
  const newArrivals = await getProductsForCard({
    tag: 'new-arrival',
    limit: 4,
  })
  const featureds = await getProductsForCard({
    tag: 'featured',
    limit: 4,
  })
  const bestSellers = await getProductsForCard({
    tag: 'best-seller',
    limit: 4,
  })
  const cards = [
    {
      title: 'Categories to explore',
      link: {
        text: 'See More',
        href: '/search',
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: 'Explore New Arrivals',
      items: newArrivals,
      link: {
        text: 'View All',
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: 'Discover Best Sellers',
      items: bestSellers,
      link: {
        text: 'View All',
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: 'Featured Products',
      items: featureds,
      link: {
        text: 'Shop Now',
        href: '/search?tag=new-arrival',
      },
    },
  ]

  const todaysDeals = await getProductsByTag({ tag: 'todays-deal' })
  const bestSellingProducts = await getProductsByTag({ tag: 'best-seller' })

  return (
    <>
      <HomeCarousel items={data.carousels} />
      <div className='md:p-4 md:space-y-4 bg-border'>
        <HomeCard cards={cards} />
        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider title={"Today's Deals"} products={todaysDeals} />
          </CardContent>
        </Card>
        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider
              title='Best Selling Products'
              products={bestSellingProducts}
              hideDetails
            />
          </CardContent>
        </Card>
      </div>
      <div className='p-4 bg-background'>
        <BrowsingHistoryList />
      </div>
    </>
  )
}
