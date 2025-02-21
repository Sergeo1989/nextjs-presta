import data from '@/lib/data'
import { connectToDatabase } from '.'
import Product from './models/product.model'
import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(cwd())

/**
 * Seeds the database with initial product data.
 *
 * This async function connects to the MongoDB database using the environment
 * variable `MONGODB_URI`. It deletes all existing product entries and inserts
 * a predefined list of products into the database. Upon successful insertion,
 * it logs a success message and exits the process. In case of an error, it
 * logs the error and throws an exception.
 */

const main = async () => {
  try {
    const { products } = data
    await connectToDatabase(process.env.MONGODB_URI)

    await Product.deleteMany()
    const createdProducts = await Product.insertMany(products)

    console.log({
      createdProducts,
      message: 'Seeded database successfully',
    })
    process.exit(0)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed database')
  }
}

main()
