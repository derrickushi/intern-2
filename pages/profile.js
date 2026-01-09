import { useState, useEffect } from 'react'
import { useAuth } from '../frontend/context/authContext'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Profile() {
    const { user, isAuthenticated, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login')
        }
    }, [loading, isAuthenticated, router])

    if (loading || !isAuthenticated) {
        return <div className="text-center py-10">Loading...</div>
    }

    return (
        <>
            <Head>
                <title>User Profile - Next.js Store</title>
            </Head>
            <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-8">My Profile</h1>

                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            User Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                            Personal details and application.
                        </p>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700">
                        <dl>
                            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{user.name || 'User'}</dd>
                            </div>
                            <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{user.email || 'email@example.com'}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    )
}
