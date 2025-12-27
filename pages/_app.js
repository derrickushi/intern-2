import '../frontend/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '../frontend/layouts/layout'
import fetchCategories from '../backend/utils/categoryProvider'
import { AuthProvider } from '../frontend/context/authContext'
import { ThemeProvider } from '../frontend/context/ThemeContext'
import { ToastContainer } from 'react-toastify'

function Ecommerce({ Component, pageProps, categories }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Layout categories={categories}>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer position="top-right" autoClose={3000} />
      </ThemeProvider>
    </AuthProvider>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce