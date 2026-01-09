import Head from 'next/head'
import { slugify } from '../backend/utils/helpers'
import { getInventory } from '../backend/utils/inventoryService'
import { DisplaySmall } from '../frontend/components'

export default function Search({ inventory, query }) {
    return (
        <>
            <Head>
                <title>Search Results for "{query}" - Next.js Store</title>
            </Head>
            <div className="pt-10 pb-6 flex flex-col items-center">
                <h2 className="text-4xl mb-3">Search Results</h2>
                <p className="text-gray-600 text-sm">
                    {inventory.length} results found for "{query}"
                </p>
            </div>
            <div className="my-8 flex flex-col lg:flex-row flex-wrap justify-center gap-8">
                {inventory.length > 0 ? (
                    inventory.map((item) => (
                        <DisplaySmall
                            key={item.id || item._id}
                            imageSrc={item.images[0]}
                            title={item.title}
                            subtitle={item.category}
                            link={`/product/${slugify(item.title)}`}
                        />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { q } = context.query
    const inventory = await getInventory(q)

    return {
        props: {
            inventory,
            query: q || ''
        }
    }
}
