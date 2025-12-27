import Head from 'next/head'
import ListItem from '../../frontend/components/ListItem'
import { titleIfy, slugify } from '../../backend/utils/helpers'
import fetchCategories from '../../backend/utils/categoryProvider'
import inventoryForCategory from '../../backend/utils/inventoryForCategory'
import CartLink from '../../frontend/components/CartLink'

const Category = (props) => {
  const { inventory, title } = props
  return (
    <>
      <CartLink />
      <Head>
        <title>Next.js Store - {title}</title>
        <meta name="description" content={`Next.js Store - ${title}`} />
        <meta property="og:title" content={`Next.js Store - ${title}`} key="title" />
      </Head>
      <div className="flex flex-col items-center">
        <div className="max-w-fw flex flex-col w-full">
          <div className="pt-4 sm:pt-10 pb-8">
            <h1 className="text-5xl font-light">{titleIfy(title)}</h1>
          </div>

          <div>
            <div className="flex flex-1 flex-wrap flex-row">
              {
                inventory.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      link={`/product/${slugify(item.title)}`}
                      title={item.title}
                      price={item.price}
                      imageSrc={item.images[0]}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const categories = await fetchCategories()
  const paths = categories.map(category => {
    return { params: { name: slugify(category) } }
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const category = titleIfy(params.name)
  const inventory = await inventoryForCategory(category)
  return {
    props: {
      inventory,
      title: category
    }
  }
}

export default Category