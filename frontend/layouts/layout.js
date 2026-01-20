import Link from 'next/link'
import { useRouter } from 'next/router'
import { slugify } from '../../backend/utils/helpers'
import { navItemLength } from '../../ecommerce.config'
import { useAuth } from '../context/authContext'
import { Search, CategoryDropdown, ThemeToggle } from '../components'

export default function Layout({ children, categories }) {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  if (categories.length > navItemLength) {
    categories = categories.slice(0, navItemLength)
  }

  const showBackButton = router.pathname !== '/' && router.pathname !== '/login';

  return (
    <div>
      <nav>
        <div className="flex justify-center">
          <div className="
            mobile:px-12 sm:flex-row sm:pt-12 sm:pb-6 desktop:px-0
            px-4 pt-8 flex flex-col w-fw
          ">
            <div className="mb-4 sm:mr-16 max-w-48 sm:max-w-none">
              <Link href="/">
                <a aria-label="Home">
                  <img src="/logo.png" alt="logo" width="90" height="28" />
                </a>
              </Link>
            </div>
            <div className="flex flex-wrap mt-1">
              <Link href="/">
                <a aria-label="Home">
                  <p className="
                    sm:mr-8 sm:mb-0
                    mb-4 text-left text-smaller mr-4
                  ">
                    Home
                  </p>
                </a>
              </Link>
              <CategoryDropdown categories={categories} />
              <div className="flex flex-1 justify-end items-center pl-8">
                <ThemeToggle />
                <Search />
                {isAuthenticated && (
                  <Link href="/my-orders">
                    <a aria-label="My Orders" className="ml-4 mr-4">
                      <p className="text-sm text-gray-700 hover:text-blue-500 cursor-pointer font-medium">
                        My Orders
                      </p>
                    </a>
                  </Link>
                )}
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4 ml-4">
                    <Link href="/profile">
                      <a className="text-sm text-gray-700 hover:text-blue-500 cursor-pointer">Hi, {user?.name}</a>
                    </Link>
                    <button
                      onClick={logout}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/login">
                    <a aria-label="Login">
                      <p className="ml-4 sm:mr-8 sm:mb-0 mb-4 text-left text-smaller mr-4 font-medium text-blue-600">
                        Login
                      </p>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="mobile:px-10 px-4 pb-10 flex justify-center">
        <main className="w-fw">
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="mb-4 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center transition-colors duration-200"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          )}
          {children}
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="mt-8 mb-4 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center transition-colors duration-200"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          )}
        </main>
      </div>
      <footer className="flex justify-center">
        <div className="
        sm:flex-row sm:items-center
        flex-col
        flex w-fw px-12 py-8
        desktop:px-0
        border-solid
        border-t border-gray-300">
          <span className="block text-gray-700 text-xs">Copyright © 2025 Next.js Store. All rights reserved.</span>
          <div className="
            sm:justify-end sm:m-0
            flex flex-1 mt-4
          ">
            <Link href="/admin">
              <a aria-label="Admin panel">
                <p className="text-sm font-semibold">Admins</p>
              </a>
            </Link>
          </div>
        </div>
      </footer>

    </div>
  )
}