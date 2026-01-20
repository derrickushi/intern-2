import React from 'react'
import AddInventory from './formComponents/AddInventory'
import ViewInventory from './ViewInventory'

class Inventory extends React.Component {
  state = {
    viewState: 'view'
  }
  toggleViewState(viewState) {
    this.setState(() => ({ viewState }))
  }
  render() {
    return (
      <div>
        <div className="flex my-6">
          <p role="button" className="mr-4 cursor-pointer hover:text-primary" onClick={() => this.toggleViewState('view')}>View Inventory</p>
          <p role="button" className="cursor-pointer hover:text-primary" onClick={() => this.toggleViewState('add')}>Add Item</p>
        </div>
        {
          this.state.viewState === 'view' ? (
            <ViewInventory />
          ) : (<AddInventory />)
        }

      </div>
    )
  }
}

export default Inventory