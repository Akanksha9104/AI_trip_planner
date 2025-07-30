import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useToast } from "../hooks/use-toast";

// Tab components
import { TransportTab } from "./trip-details/TransportTab";
import { DayWisePlanTab } from "./trip-details/DayWisePlanTab";
import { BudgetManagementTab } from "./trip-details/BudgetManagementTab";
import { PackageListTab } from "./trip-details/PackageListTab";

type TripDetailsProps = {
  tripId: Id<"trips">;
  onBack: () => void;
  onDelete?: () => void;
};

type TabType = "transport" | "dayWisePlan" | "budgetManagement" | "packageList";

export function TripDetails({ tripId, onBack, onDelete }: TripDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("dayWisePlan");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const trip = useQuery(api.trips.getTrip, { tripId });
  const deleteTrip = useMutation(api.trips.deleteTrip);
  const { toast } = useToast();

  if (!trip) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">
          <span className="text-blue-400">Trip to</span> {trip.destination}
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-sm text-red-400 hover:text-red-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete Trip
          </button>
          <button
            onClick={onBack}
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to all trips
          </button>
        </div>
      </div>

      <div className="mb-6 bg-gray-700 p-4 rounded-lg border border-gray-700">
        <p className="text-gray-300 mb-2">
          <span className="font-medium text-gray-200">Dates:</span> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-medium text-gray-200">Budget:</span> ${trip.budget}
        </p>
        <p className="text-gray-300">
          <span className="font-medium text-gray-200">Interests:</span> {trip.interests.join(", ")}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === "transport" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-gray-300"}`}
          onClick={() => setActiveTab("transport")}
        >
          Transport
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === "dayWisePlan" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-gray-300"}`}
          onClick={() => setActiveTab("dayWisePlan")}
        >
          Day-wise Plan
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === "budgetManagement" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-gray-300"}`}
          onClick={() => setActiveTab("budgetManagement")}
        >
          Budget Management
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === "packageList" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-gray-300"}`}
          onClick={() => setActiveTab("packageList")}
        >
          Package List
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "transport" && <TransportTab trip={trip} />}
        {activeTab === "dayWisePlan" && <DayWisePlanTab trip={trip} />}
        {activeTab === "budgetManagement" && <BudgetManagementTab trip={trip} />}
        {activeTab === "packageList" && <PackageListTab trip={trip} />}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Delete Trip</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete your trip to <span className="font-semibold text-white">{trip.destination}</span>? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await deleteTrip({ tripId });
                    toast({
                      title: "Trip Deleted",
                      description: "Your trip has been successfully deleted."
                    });
                    setShowDeleteConfirm(false);
                    if (onDelete) {
                      onDelete();
                    } else {
                      onBack();
                    }
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to delete trip. Please try again.",
                      variant: "destructive"
                    });
                    setShowDeleteConfirm(false);
                  }
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
              >
                Delete Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
