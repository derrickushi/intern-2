import React from 'react'

const initialState = {
  name: '', brand: '', price: '', categories: '', imagePath: '', description: '', currentInventory: '', colors: '', sizes: ''
}

class AddInventory extends React.Component {
  state = initialState
  clearForm = () => {
    this.setState(() => (initialState))
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  addItem = async () => {
    const { name, brand, price, categories, imagePath, description, currentInventory, colors, sizes } = this.state;

    if (!name || !price || !description || !currentInventory) {
      alert('Please fill in all required fields: name, price, description, and stock');
      return;
    }

    if (!categories) {
      alert('Please select a category');
      return;
    }

    // Build details object with only string values
    const details = {};
    if (brand) details.brand = brand;
    if (colors) details.colors = colors;  // Store as comma-separated string
    if (sizes) details.sizes = sizes;      // Store as comma-separated string

    // Map form fields to API fields
    const item = {
      title: name,  // API expects 'title' not 'name'
      description,
      price: parseFloat(price),
      category: categories,  // API expects 'category' (singular)
      currentInventory: parseInt(currentInventory),
      images: imagePath ? [imagePath] : ['/products/placeholder.png'],
      details: details
    }

    console.log('Sending item:', item);

    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })

      if (response.ok) {
        alert('Item added successfully!')
        this.clearForm()
      } else {
        const data = await response.json()
        alert('Error adding item: ' + (data.message || 'Unknown error'))
      }
    } catch (err) {
      console.error('Error adding item:', err)
      alert('Error adding item: ' + err.message)
    }
  }
  render() {
    const {
      name, brand, price, categories, image, description, currentInventory
    } = this.state
    return (
      <div>
        <h3 className="text-3xl">Add Item</h3>
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-144">
            <form className="bg-white shadow-xs rounded px-4 sm:px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Item name
                </label>
                <input
                  onChange={this.onChange}
                  value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Item name" name="name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Item price
                </label>
                <input
                  onChange={this.onChange}
                  value={price} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Item price" name="price" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Item Description
                </label>
                <input
                  onChange={this.onChange}
                  value={description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Item Description" name="description" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagePath">
                  Item image path
                </label>
                <input
                  onChange={this.onChange}
                  value={this.state.imagePath}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="imagePath"
                  type="text"
                  placeholder="/products/other/oil_lamp.webp"
                  name="imagePath"
                />
                <p className="text-xs text-gray-500 mt-1">Example: /products/other/oil_lamp.webp</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentInventory">
                  In stock
                </label>
                <input
                  onChange={this.onChange}
                  value={currentInventory} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="currentInventory" placeholder="Items in stock" name="currentInventory" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categories">
                  Item categories
                </label>
                <input
                  onChange={this.onChange}
                  value={categories} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="categories" placeholder="Comma separated list of item categories" name="categories" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                  Item brand
                </label>
                <input
                  onChange={this.onChange}
                  value={brand} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="brand" placeholder="Item brand" name="brand" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colors">
                  Colors
                </label>
                <input
                  onChange={this.onChange}
                  value={this.state.colors} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="colors" placeholder="Comma separated list of colors" name="colors" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sizes">
                  Sizes
                </label>
                <input
                  onChange={this.onChange}
                  value={this.state.sizes} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="sizes" placeholder="Comma separated list of sizes" name="sizes" />
              </div>
              <div className="flex items-center justify-between mt-4">
                <button onClick={this.addItem} className="bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Add Item
                </button>
                <a onClick={this.clearForm} className="inline-block align-baseline font-bold text-sm" href="#">
                  Clear Form
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AddInventory