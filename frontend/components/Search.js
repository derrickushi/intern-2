import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import { slugify } from '../../backend/utils/helpers'

export default function Search() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const searchRef = useRef(null)
    const router = useRouter()

    useEffect(() => {
        // Close search results when clicking outside
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim().length === 0) {
                setResults([])
                setShowResults(false)
                return
            }

            setIsLoading(true)
            try {
                const res = await fetch(`/api/inventory?q=${encodeURIComponent(query)}`)
                const data = await res.json()
                if (data.success) {
                    setResults(data.products)
                    setShowResults(true)
                }
            } catch (error) {
                console.error('Search error:', error)
            } finally {
                setIsLoading(false)
            }
        }

        const timeoutId = setTimeout(fetchResults, 300)
        return () => clearTimeout(timeoutId)
    }, [query])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) {
            setShowResults(false)
            router.push(`/search?q=${encodeURIComponent(query)}`)
        }
    }

    return (
        <div ref={searchRef} className="relative w-full max-w-sm mr-4 z-50">
            <form onSubmit={handleSubmit} className="flex items-center w-full">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query.trim().length > 0 && setShowResults(true)}
                    />
                    <button
                        type="submit"
                        className="absolute right-0 top-0 mt-2 mr-3 text-gray-600 hover:text-blue-500"
                    >
                        <FaSearch />
                    </button>
                </div>
            </form>

            {showResults && (
                <div className="absolute w-full mt-2 bg-white rounded-md shadow-lg overflow-hidden border border-gray-200 max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500">Loading...</div>
                    ) : results.length > 0 ? (
                        <div className="py-2">
                            {results.map((product) => (
                                <Link key={product._id} href={`/product/${slugify(product.title)}`}>
                                    <a
                                        className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                                        onClick={() => setShowResults(false)}
                                    >
                                        <div className="flex items-center">
                                            {product.images && product.images[0] && (
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.title}
                                                    className="w-10 h-10 object-cover rounded mr-3"
                                                />
                                            )}
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{product.title}</p>
                                                <p className="text-xs text-gray-500">{product.category}</p>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-gray-500">No products found</div>
                    )}
                </div>
            )}
        </div>
    )
}
