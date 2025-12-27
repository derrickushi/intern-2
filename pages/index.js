import Head from 'next/head'
import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '../frontend/components'
import { titleIfy, slugify } from '../backend/utils/helpers'
import { fetchInventory } from '../backend/utils/inventoryProvider'
import CartLink from '../frontend/components/CartLink'

const Home = ({ inventoryData = [], categories: categoryData = [] }) => {
  const inventory = inventoryData.slice(0, 4);
  const categories = categoryData.slice(0, 2);

  // Safety check - if no inventory loaded yet, show loading
  if (!inventory || inventory.length < 4 || categories.length < 2) {
    return (
      <>
        <CartLink />
        <div className="w-full flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Loading products...</h2>
            <p className="text-gray-600">Please wait while we fetch the latest inventory</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <CartLink />
      <div className="w-full">
        <Head>
          <title>Timeless Treasures</title>
          <meta name="description" content="Authentic antiques, newspapers, coins, and currency." />
          <meta property="og:title" content="Timeless Treasures" key="title" />
        </Head>
        <div className="bg-blue-300
        p-6 pb-10 smpb-6
        flex lg:flex-row flex-col">
          <div className="pt-4 pl-2 sm:pt-12 sm:pl-12 flex flex-col">
            <Tag
              year="Feature"
              category="Antique"
            />
            <Center
              price={inventory[2].price}
              title={inventory[2].title}
              link={`/product/${slugify(inventory[2].title)}`}
            />
            <Footer
              designer="Timeless Treasures"
            />
          </div>
          <div className="flex flex-1 justify-center items-center relative">
            <Showcase
              imageSrc={inventory[2].images[0]}
            />
            <div className="absolute
              w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88
              bg-white z-0 rounded-full" />
          </div>
        </div>
      </div>
      <div className="
        lg:my-8 lg:grid-cols-2
        grid-cols-1
        grid gap-4 my-4 
      ">
        <DisplayMedium
          imageSrc={categories[0].image}
          subtitle={`${categories[0].itemCount} items`}
          title={titleIfy(categories[0].name)}
          link={`/category/${slugify(categories[0].name)}`}
        />
        <DisplayMedium
          imageSrc={categories[1].image}
          subtitle={`${categories[1].itemCount} items`}
          title={titleIfy(categories[1].name)}
          link={`/category/${slugify(categories[1].name)}`}
        />
      </div>
      <div className="pt-10 pb-6 flex flex-col items-center">
        <h2 className="text-4xl mb-3">Trending Now</h2>
        <p className="text-gray-600 text-sm">Find the perfect piece of history to add to your collection.</p>
      </div>
      <div className="my-8 flex flex-col lg:flex-row justify-between">
        <DisplaySmall
          imageSrc={inventory[0].images[0]}
          title={inventory[0].title}
          subtitle={inventory[0].category}
          link={`/product/${slugify(inventory[0].title)}`}
        />

        <DisplaySmall
          imageSrc={inventory[1].images[0]}
          title={inventory[1].title}
          subtitle={inventory[1].category}
          link={`/product/${slugify(inventory[1].title)}`}
        />

        <DisplaySmall
          imageSrc={inventory[2].images[0]}
          title={inventory[2].title}
          subtitle={inventory[2].category}
          link={`/product/${slugify(inventory[2].title)}`}
        />

        <DisplaySmall
          imageSrc={inventory[3].images[0]}
          title={inventory[3].title}
          subtitle={inventory[3].category}
          link={`/product/${slugify(inventory[3].title)}`}
        />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const inventory = await fetchInventory()

  const inventoryCategorized = inventory.reduce((acc, next) => {
    const category = next.category
    const index = acc.findIndex(item => item.name === category)
    if (index !== -1) {
      const item = acc[index]
      item.itemCount = item.itemCount + 1
      acc[index] = item
    } else {
      const item = {
        name: category,
        image: next.images[0],
        itemCount: 1
      }
      acc.push(item)
    }
    return acc
  }, [])

  return {
    props: {
      inventoryData: inventory,
      categories: inventoryCategorized
    }
  }
}

export default Home