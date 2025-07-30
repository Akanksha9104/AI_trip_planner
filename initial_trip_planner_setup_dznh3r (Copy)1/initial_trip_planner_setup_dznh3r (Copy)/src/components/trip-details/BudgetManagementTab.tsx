import { useState } from "react";

type BudgetManagementTabProps = {
  trip: any;
};

type ExpenseCategory = "accommodation" | "food" | "activities" | "transport" | "shopping" | "other";

type Expense = {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
};

export function BudgetManagementTab({ trip }: BudgetManagementTabProps) {
  // Generate some sample expenses based on the trip
  const generateSampleExpenses = (): Expense[] => {
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    const tripDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    const sampleExpenses: Expense[] = [];

    // Accommodation expense (40% of budget)
    const accommodationCost = Math.round(trip.budget * 0.4);
    sampleExpenses.push({
      id: "1",
      category: "accommodation",
      description: `Hotel in ${trip.destination}`,
      amount: accommodationCost,
      date: trip.startDate
    });

    // Transport expense (20% of budget)
    const transportCost = Math.round(trip.budget * 0.2);
    sampleExpenses.push({
      id: "2",
      category: "transport",
      description: "Flights",
      amount: transportCost,
      date: trip.startDate
    });

    // Food expenses (20% of budget, spread across days)
    const foodBudget = Math.round(trip.budget * 0.2);
    const dailyFoodBudget = Math.round(foodBudget / tripDuration);

    for (let i = 0; i < tripDuration; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      sampleExpenses.push({
        id: `food-${i}`,
        category: "food",
        description: `Meals for day ${i + 1}`,
        amount: dailyFoodBudget,
        date: currentDate.toISOString().split('T')[0]
      });
    }

    // Activities (10% of budget)
    const activitiesBudget = Math.round(trip.budget * 0.1);
    sampleExpenses.push({
      id: "activities-1",
      category: "activities",
      description: `Tours and activities in ${trip.destination}`,
      amount: activitiesBudget,
      date: new Date(startDate.getTime() + 86400000).toISOString().split('T')[0] // Day 2
    });

    // Shopping (5% of budget)
    const shoppingBudget = Math.round(trip.budget * 0.05);
    sampleExpenses.push({
      id: "shopping-1",
      category: "shopping",
      description: "Souvenirs",
      amount: shoppingBudget,
      date: new Date(endDate.getTime() - 86400000).toISOString().split('T')[0] // Last day
    });

    // Other (5% of budget)
    const otherBudget = Math.round(trip.budget * 0.05);
    sampleExpenses.push({
      id: "other-1",
      category: "other",
      description: "Miscellaneous expenses",
      amount: otherBudget,
      date: trip.startDate
    });

    return sampleExpenses;
  };

  const [expenses, setExpenses] = useState<Expense[]>(generateSampleExpenses());
  const [newExpense, setNewExpense] = useState<Omit<Expense, "id">>({
    category: "food",
    description: "",
    amount: 0,
    date: new Date().toISOString().split('T')[0]
  });
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  const handleAddExpense = () => {
    if (!newExpense.description || newExpense.amount <= 0) return;

    const expense: Expense = {
      ...newExpense,
      id: Date.now().toString()
    };

    setExpenses([...expenses, expense]);
    setNewExpense({
      category: "food",
      description: "",
      amount: 0,
      date: new Date().toISOString().split('T')[0]
    });
    setIsAddingExpense(false);
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Calculate totals
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = trip.budget - totalSpent;
  const budgetPercentage = Math.round((totalSpent / trip.budget) * 100);

  // Group expenses by category
  const expensesByCategory: Record<ExpenseCategory, number> = {
    accommodation: 0,
    food: 0,
    activities: 0,
    transport: 0,
    shopping: 0,
    other: 0
  };

  expenses.forEach(expense => {
    expensesByCategory[expense.category] += expense.amount;
  });

  // Get category icon
  const getCategoryIcon = (category: ExpenseCategory) => {
    switch (category) {
      case "accommodation":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        );
      case "food":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        );
      case "activities":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case "transport":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.96-.68l1.65-3.97A1 1 0 0014.64 4H3z" />
          </svg>
        );
      case "shopping":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        Budget Management
      </h3>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg border border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Total Budget</h4>
          <p className="text-2xl font-semibold text-white">${trip.budget}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg border border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Spent</h4>
          <p className="text-2xl font-semibold text-white">${totalSpent}</p>
          <div className="mt-2 bg-gray-800 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${budgetPercentage > 90 ? 'bg-red-500' : budgetPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">{budgetPercentage}% of budget</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg border border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Remaining</h4>
          <p className={`text-2xl font-semibold ${remainingBudget < 0 ? 'text-red-400' : 'text-green-400'}`}>
            ${remainingBudget}
          </p>
        </div>
      </div>

      {/* Expenses by Category */}
      <div className="bg-gray-700 p-4 rounded-lg border border-gray-700">
        <h4 className="font-medium text-white mb-4">Expenses by Category</h4>
        <div className="space-y-3">
          {Object.entries(expensesByCategory).map(([category, amount]) => {
            if (amount === 0) return null;
            const percentage = Math.round((amount / totalSpent) * 100);
            return (
              <div key={category}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="mr-2 text-blue-400">
                      {getCategoryIcon(category as ExpenseCategory)}
                    </span>
                    <span className="capitalize">{category}</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    ${amount} <span className="text-gray-500 text-xs">({percentage}%)</span>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-blue-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expense List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-white">Expense List</h4>
          <button
            onClick={() => setIsAddingExpense(!isAddingExpense)}
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            {isAddingExpense ? "Cancel" : "Add Expense"}
          </button>
        </div>

        {isAddingExpense && (
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-700 mb-4">
            <h5 className="font-medium text-sm text-gray-300 mb-3">New Expense</h5>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Category</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value as ExpenseCategory})}
                  className="input-field"
                >
                  <option value="accommodation">Accommodation</option>
                  <option value="food">Food</option>
                  <option value="activities">Activities</option>
                  <option value="transport">Transport</option>
                  <option value="shopping">Shopping</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Amount ($)</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
                  className="input-field"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                className="input-field"
                placeholder="What did you spend on?"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-400 mb-1">Date</label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                className="input-field"
              />
            </div>
            <button
              onClick={handleAddExpense}
              className="button"
            >
              Add Expense
            </button>
          </div>
        )}

        <div className="space-y-2">
          {expenses.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No expenses recorded yet.</p>
          ) : (
            expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((expense) => (
              <div key={expense.id} className="bg-gray-800 p-3 rounded-lg flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-gray-700 p-1.5 rounded-md text-blue-400 mr-3">
                      {getCategoryIcon(expense.category)}
                    </div>
                    <div>
                      <p className="text-gray-200">{expense.description}</p>
                      <p className="text-xs text-gray-400">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-200 mr-3">${expense.amount}</span>
                    <button
                      onClick={() => handleRemoveExpense(expense.id)}
                      className="text-gray-500 hover:text-red-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Booking links based on expense category */}
                {expense.category === "accommodation" && (
                  <div className="mt-2 flex space-x-2">
                    <a href="https://www.booking.com/" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      Booking.com
                    </a>
                    <a href="https://www.airbnb.com/" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      Airbnb
                    </a>
                    <a href="https://www.makemytrip.com/hotels/" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      MakeMyTrip
                    </a>
                  </div>
                )}

                {/* Transport booking links */}
                {expense.category === "transport" && (
                  <div className="mt-2 flex space-x-2">
                    <a href="https://www.makemytrip.com/flights/" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                      </svg>
                      MakeMyTrip
                    </a>
                    <a href="https://www.irctc.co.in/nget/train-search" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                      </svg>
                      IRCTC
                    </a>
                    <a href="https://www.redbus.in/" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.96-.68l1.65-3.97A1 1 0 0014.64 4H3z" />
                      </svg>
                      RedBus
                    </a>
                  </div>
                )}

                {/* Activities booking links */}
                {expense.category === "activities" && (
                  <div className="mt-2 flex space-x-2">
                    <a href="https://www.viator.com/" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      Viator
                    </a>
                    <a href="https://www.getyourguide.com/" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      GetYourGuide
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
