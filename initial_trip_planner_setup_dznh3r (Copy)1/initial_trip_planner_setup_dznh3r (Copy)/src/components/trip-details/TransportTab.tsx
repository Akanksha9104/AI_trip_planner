import { useState } from "react";

type TransportTabProps = {
  trip: any;
};

type TransportItem = {
  id: string;
  type: string;
  from: string;
  to: string;
  date: string;
  time: string;
  cost: number;
  notes: string;
};

export function TransportTab({ trip }: TransportTabProps) {
  const [transportItems, setTransportItems] = useState<TransportItem[]>([
    {
      id: "1",
      type: "Flight",
      from: "Home",
      to: trip.destination,
      date: trip.startDate,
      time: "10:00 AM",
      cost: Math.round(trip.budget * 0.2),
      notes: "Round-trip flight"
    },
    {
      id: "2",
      type: "Taxi",
      from: `${trip.destination} Airport`,
      to: "Hotel",
      date: trip.startDate,
      time: "2:00 PM",
      cost: 50,
      notes: "Airport transfer"
    },
    {
      id: "3",
      type: "Flight",
      from: trip.destination,
      to: "Home",
      date: trip.endDate,
      time: "3:00 PM",
      cost: 0, // Included in the first flight cost
      notes: "Return flight"
    }
  ]);

  const [newTransport, setNewTransport] = useState<Omit<TransportItem, "id">>({
    type: "",
    from: "",
    to: "",
    date: "",
    time: "",
    cost: 0,
    notes: ""
  });

  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddTransport = () => {
    const newItem: TransportItem = {
      ...newTransport,
      id: Date.now().toString()
    };

    setTransportItems([...transportItems, newItem]);
    setNewTransport({
      type: "",
      from: "",
      to: "",
      date: "",
      time: "",
      cost: 0,
      notes: ""
    });
    setIsAddingNew(false);
  };

  const handleRemoveTransport = (id: string) => {
    setTransportItems(transportItems.filter(item => item.id !== id));
  };

  const totalTransportCost = transportItems.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.96-.68l1.65-3.97A1 1 0 0014.64 4H3z" />
          </svg>
          Transportation
        </h3>
        <div className="text-gray-300">
          <span className="font-medium">Total Cost:</span> ${totalTransportCost}
        </div>
      </div>

      <div className="space-y-4">
        {transportItems.map((item) => (
          <div key={item.id} className="bg-gray-700 p-4 rounded-lg border border-gray-700 flex justify-between">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium text-blue-400 mr-2">{item.type}</span>
                <span className="text-gray-300">
                  {item.from} → {item.to}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                {new Date(item.date).toLocaleDateString()} at {item.time}
              </div>
              {item.notes && <div className="text-sm text-gray-400">{item.notes}</div>}
              <div className="text-sm font-medium text-gray-300">${item.cost}</div>
              <div className="mt-2">
                {item.type.toLowerCase() === "flight" && (
                  <div className="flex space-x-2">
                    <a href="https://www.expedia.com/Flights" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                      </svg>
                      Expedia
                    </a>
                    <a href="https://www.kayak.com/flights" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Kayak
                    </a>
                  </div>
                )}
                {item.type.toLowerCase() === "train" && (
                  <div className="flex space-x-2">
                    <a href="https://www.irctc.co.in/nget/train-search" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                      </svg>
                      IRCTC
                    </a>
                    <a href="https://www.makemytrip.com/railways/" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      MakeMyTrip
                    </a>
                  </div>
                )}
                {item.type.toLowerCase() === "taxi" && (
                  <div className="flex space-x-2">
                    <a href="https://www.uber.com/" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.96-.68l1.65-3.97A1 1 0 0014.64 4H3z" />
                      </svg>
                      Uber
                    </a>
                    <a href="https://www.olacabs.com/" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Ola
                    </a>
                  </div>
                )}
                {item.type.toLowerCase() === "bus" && (
                  <div className="flex space-x-2">
                    <a href="https://www.redbus.in/" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.96-.68l1.65-3.97A1 1 0 0014.64 4H3z" />
                      </svg>
                      RedBus
                    </a>
                    <a href="https://www.makemytrip.com/bus-tickets/" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      MakeMyTrip
                    </a>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => handleRemoveTransport(item.id)}
              className="text-gray-500 hover:text-red-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {isAddingNew ? (
        <div className="bg-gray-700 p-4 rounded-lg border border-gray-700">
          <h4 className="font-medium text-white mb-4">Add New Transportation</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
              <input
                type="text"
                value={newTransport.type}
                onChange={(e) => setNewTransport({...newTransport, type: e.target.value})}
                className="input-field"
                placeholder="Flight, Train, Bus, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Cost ($)</label>
              <input
                type="number"
                value={newTransport.cost}
                onChange={(e) => setNewTransport({...newTransport, cost: Number(e.target.value)})}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">From</label>
              <input
                type="text"
                value={newTransport.from}
                onChange={(e) => setNewTransport({...newTransport, from: e.target.value})}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">To</label>
              <input
                type="text"
                value={newTransport.to}
                onChange={(e) => setNewTransport({...newTransport, to: e.target.value})}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
              <input
                type="date"
                value={newTransport.date}
                onChange={(e) => setNewTransport({...newTransport, date: e.target.value})}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
              <input
                type="text"
                value={newTransport.time}
                onChange={(e) => setNewTransport({...newTransport, time: e.target.value})}
                className="input-field"
                placeholder="e.g., 10:00 AM"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
            <textarea
              value={newTransport.notes}
              onChange={(e) => setNewTransport({...newTransport, notes: e.target.value})}
              className="input-field"
              rows={2}
            ></textarea>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleAddTransport}
              className="button"
            >
              Add Transportation
            </button>
            <button
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center text-blue-400 hover:text-blue-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Transportation
        </button>
      )}
    </div>
  );
}
