import Link from 'next/link'
import { useState } from 'react'
import { slugify } from '../../backend/utils/helpers'

export default function CategoryDropdown({ categories }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative inline-block text-left mr-4 z-10"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    Categories
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        {categories.map((category, index) => (
                            <Link href={`/category/${slugify(category)}`} key={index}>
                                <a
                                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id={`menu-item-${index}`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </a>
                            </Link>
                        ))}
                        <Link href="/categories">
                            <a
                                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 font-bold border-t border-gray-100"
                                role="menuitem"
                            >
                                View All
                            </a>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
