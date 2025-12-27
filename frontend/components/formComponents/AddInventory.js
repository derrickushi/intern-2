import React from 'react'

const initialState = {
  name: '', brand: '', price: '', categories: [], image: '', description: '', currentInventory: '', colors: '', sizes: ''
}

class AddInventory extends React.Component {
  state = initialState
  clearForm = () => {
    this.setState(() => (initialState))
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onImageChange = async (e) => {
    const file = e.target.files[0];
    this.setState({ image: file })
    // const storageUrl = await Storage.put('example.png', file, {
    //     contentType: 'image/png'
    // })
    // this.setState({ image: storageUrl  })
  }
  addItem = async () => {
    const item = {
      name, brand, price, categories, image, description, currentInventory,
      colors: colors ? colors.split(',').map(c => c.trim()) : [],
      sizes: sizes ? sizes.split(',').map(s => s.trim()) : []
    }
    // add to database
    // Note: The actual API call seems to be missing in the original file or abstracted.
    // Based on validation "if (!name ... return", I should check if I need to implement the fetch here.
    // The original code comment says "// add to database".
    // I will assume the addItem method needs to be implemented or connected.
    // However, for this task, I am just updating the component state and preparation.
    // Wait, the original code basically does nothing in addItem except clearForm.
    // Detailed analysis of AddInventory.js:
    // It has `addItem` which checks validity and then calls `this.clearForm()`.
    // It seems incomplete or relies on a parent component?
    // But `Inventory.js` renders `<AddInventory />` with no props.
    // This suggests `AddInventory` is responsible for the API call but it's not implemented?
    // Or maybe I missed something.
    // Let me check if there's an API call I missed.
    // The original file:
    // addItem = async () => {
    //   const { name, brand, price, categories, image, description, currentInventory } = this.state
    //   if (!name || ... ) return
    //   // add to database
    //   this.clearForm()
    // }
    // It seems the API call is indeed missing. I should probably implement it to make it work.
    // I'll add the fetch call to /api/inventory.

    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })
      if (response.ok) {
        console.log('Item added')
        this.clearForm()
      } else {
        console.log('Error adding item')
      }
    } catch (err) {
      console.log('Error adding item', err)
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item image">
                  Item image
                </label>
                <input
                  type="file"
                  onChange={(e) => this.onImageChange(e)}
                />
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