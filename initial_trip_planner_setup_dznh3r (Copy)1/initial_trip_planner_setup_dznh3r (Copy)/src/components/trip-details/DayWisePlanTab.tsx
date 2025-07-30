import { useState } from "react";

type DayWisePlanTabProps = {
  trip: any;
};

type Activity = {
  id: string;
  name: string;
  time: string;
  location: string;
  notes: string;
};

type DayPlan = {
  day: number;
  activities: Activity[];
  meals: string[];
  accommodations: string;
};

export function DayWisePlanTab({ trip }: DayWisePlanTabProps) {
  // Convert the existing itinerary to our new format with activity IDs
  const initialDayPlans: DayPlan[] = trip.itinerary
    ? trip.itinerary.map((day: any) => ({
        day: day.day,
        meals: day.meals,
        accommodations: day.accommodations,
        activities: day.activities.map((activity: string, index: number) => ({
          id: `day${day.day}-activity${index}`,
          name: activity,
          time: "",
          location: "",
          notes: ""
        }))
      }))
    : [];

  const [dayPlans, setDayPlans] = useState<DayPlan[]>(initialDayPlans);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [newActivity, setNewActivity] = useState<Omit<Activity, "id">>({
    name: "",
    time: "",
    location: "",
    notes: ""
  });

  const handleAddActivity = (dayIndex: number) => {
    if (!newActivity.name) return;

    const updatedPlans = [...dayPlans];
    const day = updatedPlans[dayIndex];

    updatedPlans[dayIndex] = {
      ...day,
      activities: [
        ...day.activities,
        {
          ...newActivity,
          id: `day${day.day}-activity${day.activities.length}`
        }
      ]
    };

    setDayPlans(updatedPlans);
    setNewActivity({
      name: "",
      time: "",
      location: "",
      notes: ""
    });
  };

  const handleRemoveActivity = (dayIndex: number, activityId: string) => {
    const updatedPlans = [...dayPlans];
    const day = updatedPlans[dayIndex];

    updatedPlans[dayIndex] = {
      ...day,
      activities: day.activities.filter(activity => activity.id !== activityId)
    };

    setDayPlans(updatedPlans);
  };

  if (!trip.itinerary || trip.itinerary.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-700 rounded-lg border border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-400">No itinerary available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        Day-wise Plan
      </h3>

      <div className="space-y-6">
        {dayPlans.map((day, dayIndex) => (
          <div key={day.day} className="bg-gray-700 p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-lg text-blue-400">Day {day.day}</h4>
              <button
                onClick={() => setEditingDay(editingDay === dayIndex ? null : dayIndex)}
                className="text-sm text-gray-400 hover:text-blue-400"
              >
                {editingDay === dayIndex ? "Done" : "Edit"}
              </button>
            </div>

            <div className="space-y-4">
              {/* Activities */}
              <div>
                <h5 className="font-medium text-sm text-gray-200 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Activities
                </h5>
                <div className="space-y-2">
                  {day.activities.map((activity) => (
                    <div key={activity.id} className="flex justify-between items-start bg-gray-800 p-2 rounded">
                      <div>
                        <div className="text-gray-200">{activity.name}</div>
                        {activity.time && (
                          <div className="text-xs text-gray-400">Time: {activity.time}</div>
                        )}
                        {activity.location && (
                          <div className="text-xs text-gray-400">Location: {activity.location}</div>
                        )}
                        {activity.notes && (
                          <div className="text-xs text-gray-400 mt-1">{activity.notes}</div>
                        )}
                      </div>
                      {editingDay === dayIndex && (
                        <button
                          onClick={() => handleRemoveActivity(dayIndex, activity.id)}
                          className="text-gray-500 hover:text-red-400"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals */}
              <div>
                <h5 className="font-medium text-sm text-gray-200 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Meals
                </h5>
                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                  {day.meals.map((meal, i) => (
                    <li key={i}>{meal}</li>
                  ))}
                </ul>
              </div>

              {/* Accommodation */}
              <div>
                <h5 className="font-medium text-sm text-gray-200 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Accommodation
                </h5>
                <p className="text-sm text-gray-300">{day.accommodations}</p>
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
              </div>

              {/* Add new activity form */}
              {editingDay === dayIndex && (
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <h5 className="font-medium text-sm text-gray-200 mb-2">Add New Activity</h5>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <input
                        type="text"
                        value={newActivity.name}
                        onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                        className="input-field text-sm"
                        placeholder="Activity name"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={newActivity.time}
                        onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                        className="input-field text-sm"
                        placeholder="Time (e.g., 10:00 AM)"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={newActivity.location}
                      onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                      className="input-field text-sm"
                      placeholder="Location"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      value={newActivity.notes}
                      onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
                      className="input-field text-sm"
                      placeholder="Notes"
                      rows={2}
                    ></textarea>
                  </div>
                  <button
                    onClick={() => handleAddActivity(dayIndex)}
                    className="button text-sm py-1"
                  >
                    Add Activity
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
