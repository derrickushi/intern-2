import { useState } from 'react'
import Head from 'next/head'
import Button from '../../frontend/components/Button'
import Image from '../../frontend/components/Image'
import QuantityPicker from '../../frontend/components/QuantityPicker'
import { getInventory } from '../../backend/utils/inventoryService'
import { slugify } from '../../backend/utils/helpers'
import CartLink from '../../frontend/components/CartLink'
import { SiteContext, ContextProviderComponent } from '../../frontend/context/mainContext'
import DENOMINATION from '../../backend/utils/currencyProvider'

const ItemView = (props) => {
  const [numberOfitems, updateNumberOfItems] = useState(1)
  const { product } = props
  const { price, images, title, description, year, condition, details } = product
  const { context: { addToCart } } = props

  function addItemToCart(product) {
    product["quantity"] = numberOfitems
    addToCart(product)
  }

  function increment() {
    updateNumberOfItems(numberOfitems + 1)
  }

  function decrement() {
    if (numberOfitems === 1) return
    updateNumberOfItems(numberOfitems - 1)
  }

  return (
    <>
      <CartLink />
      <Head>
        <title>Timeless Treasures - {title}</title>
        <meta name="description" content={`Timeless Treasures - ${title}`} />
        <meta property="og:title" content={`Timeless Treasures - ${title}`} key="title" />
      </Head>
      <div className="
        sm:py-12
        md:flex-row
        py-4 w-full flex flex-1 flex-col my-0 mx-auto
      ">
        <div className="w-full md:w-1/2 h-120 flex flex-1 bg-light hover:bg-light-200">
          <div className="py-16 p10 flex flex-1 justify-center items-center">
            <Image src={images[0]} alt={title} className="max-h-full" />
          </div>
        </div>
        <div className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2">
          <h1 className="
           sm:mt-0 mt-2 text-5xl font-light leading-large
          ">{title}</h1>
          <h2 className="text-2xl tracking-wide sm:py-8 py-6">{DENOMINATION}{price}</h2>
          <p className="text-gray-600 leading-7">{description}</p>

          <div className="my-4">
            {year && <p><span className="font-bold">Year:</span> {year}</p>}
            {condition && <p><span className="font-bold">Condition:</span> {condition}</p>}
          </div>

          {details && Object.keys(details).length > 0 && (
            <div className="my-4">
              <h3 className="font-bold mb-2">Details:</h3>
              <ul className="list-disc pl-5">
                {Object.entries(details).map(([key, value]) => (
                  <li key={key} className="capitalize">
                    <span className="font-semibold">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="my-6">
            <QuantityPicker
              increment={increment}
              decrement={decrement}
              numberOfitems={numberOfitems}
            />
          </div>
          <Button
            full
            title="Add to Cart"
            onClick={() => addItemToCart(product)}
          />
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const inventory = await getInventory()
  const paths = inventory.map(item => {
    return { params: { name: slugify(item.title) } }
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const name = params.name.replace(/-/g, " ")
  const inventory = await getInventory()
  const product = inventory.find(item => slugify(item.title) === slugify(name))

  return {
    props: {
      product,
    }
  }
}

function ItemViewWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          context => <ItemView {...props} context={context} />
        }
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default ItemViewWithContext