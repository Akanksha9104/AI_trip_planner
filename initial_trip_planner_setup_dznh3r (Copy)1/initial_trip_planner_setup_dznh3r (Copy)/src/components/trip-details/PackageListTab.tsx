import { useState } from "react";

type PackageListTabProps = {
  trip: any;
};

type PackingItem = {
  id: string;
  name: string;
  category: string;
  isPacked: boolean;
  quantity: number;
};

export function PackageListTab({ trip }: PackageListTabProps) {
  // Convert the existing packing list to our new format with IDs and categories
  const categorizeItem = (item: string): string => {
    const lowerItem = item.toLowerCase();
    if (lowerItem.includes("clothes") || lowerItem.includes("shirt") || lowerItem.includes("pants") || lowerItem.includes("jacket") || lowerItem.includes("shoes")) {
      return "Clothing";
    } else if (lowerItem.includes("toothbrush") || lowerItem.includes("soap") || lowerItem.includes("shampoo") || lowerItem.includes("toiletries")) {
      return "Toiletries";
    } else if (lowerItem.includes("passport") || lowerItem.includes("id") || lowerItem.includes("ticket") || lowerItem.includes("document")) {
      return "Documents";
    } else if (lowerItem.includes("phone") || lowerItem.includes("camera") || lowerItem.includes("charger") || lowerItem.includes("adapter")) {
      return "Electronics";
    } else if (lowerItem.includes("medicine") || lowerItem.includes("pill") || lowerItem.includes("first aid")) {
      return "Health";
    } else {
      return "Miscellaneous";
    }
  };

  const initialPackingItems: PackingItem[] = trip.packingList 
    ? trip.packingList.map((item: string, index: number) => ({
        id: `item-${index}`,
        name: item,
        category: categorizeItem(item),
        isPacked: false,
        quantity: 1
      }))
    : [];

  const [packingItems, setPackingItems] = useState<PackingItem[]>(initialPackingItems);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Miscellaneous",
    quantity: 1
  });
  const [filter, setFilter] = useState<string>("all");

  const handleAddItem = () => {
    if (!newItem.name) return;
    
    const item: PackingItem = {
      id: Date.now().toString(),
      name: newItem.name,
      category: newItem.category,
      isPacked: false,
      quantity: newItem.quantity
    };
    
    setPackingItems([...packingItems, item]);
    setNewItem({
      name: "",
      category: "Miscellaneous",
      quantity: 1
    });
  };

  const handleToggleItem = (id: string) => {
    setPackingItems(
      packingItems.map(item => 
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setPackingItems(packingItems.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setPackingItems(
      packingItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Get all unique categories
  const categories = ["all", ...new Set(packingItems.map(item => item.category))];
  
  // Filter items based on selected filter
  const filteredItems = filter === "all" 
    ? packingItems 
    : packingItems.filter(item => item.category === filter);
  
  // Group items by category for display
  const itemsByCategory: Record<string, PackingItem[]> = {};
  
  filteredItems.forEach(item => {
    if (!itemsByCategory[item.category]) {
      itemsByCategory[item.category] = [];
    }
    itemsByCategory[item.category].push(item);
  });

  // Calculate progress
  const packedItems = packingItems.filter(item => item.isPacked).length;
  const totalItems = packingItems.length;
  const progressPercentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  if (!trip.packingList || trip.packingList.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-700 rounded-lg border border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <p className="text-gray-400">No packing list available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
          </svg>
          Packing List
        </h3>
        <div className="text-sm text-gray-300">
          {packedItems} of {totalItems} items packed
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-gray-700 p-4 rounded-lg border border-gray-700">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Packing Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2.5">
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Add new item form */}
      <div className="bg-gray-700 p-4 rounded-lg border border-gray-700">
        <h4 className="font-medium text-white mb-3">Add Item</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div className="md:col-span-2">
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              className="input-field"
              placeholder="Item name"
            />
          </div>
          <div>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              className="input-field"
            >
              <option value="Clothing">Clothing</option>
              <option value="Toiletries">Toiletries</option>
              <option value="Documents">Documents</option>
              <option value="Electronics">Electronics</option>
              <option value="Health">Health</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-24">
            <label className="block text-xs font-medium text-gray-400 mb-1">Quantity</label>
            <input
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({...newItem, quantity: Math.max(1, parseInt(e.target.value))})}
              className="input-field"
              min="1"
            />
          </div>
          <button
            onClick={handleAddItem}
            className="button mt-5"
          >
            Add to List
          </button>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-3 py-1 text-sm rounded-full ${
              filter === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category === "all" ? "All Items" : category}
          </button>
        ))}
      </div>

      {/* Packing list */}
      <div className="space-y-6">
        {Object.entries(itemsByCategory).map(([category, items]) => (
          <div key={category}>
            <h4 className="font-medium text-gray-300 mb-2">{category}</h4>
            <div className="space-y-2">
              {items.map(item => (
                <div 
                  key={item.id} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    item.isPacked ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-800'
                  }`}
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => handleToggleItem(item.id)}
                      className={`w-5 h-5 rounded border mr-3 flex-shrink-0 ${
                        item.isPacked 
                          ? 'bg-blue-500 border-blue-500 flex items-center justify-center' 
                          : 'border-gray-600 bg-gray-700'
                      }`}
                    >
                      {item.isPacked && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <div className={item.isPacked ? 'line-through text-gray-500' : 'text-gray-200'}>
                      {item.name}
                      {item.quantity > 1 && <span className="text-gray-400 text-sm ml-1">({item.quantity})</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-400 hover:text-gray-300 w-6 h-6 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <span className="text-gray-400 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-gray-300 w-6 h-6 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-500 hover:text-red-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
