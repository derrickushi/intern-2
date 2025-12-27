import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaSearch } from 'react-icons/fa'

export default function Search() {
    const [query, setQuery] = useState('')
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full max-w-sm mr-4">
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute right-0 top-0 mt-2 mr-3 text-gray-600 hover:text-blue-500"
                >
                    <FaSearch />
                </button>
            </div>
        </form>
    )
}
