import React from 'react'

const simple = () => {
  const leaveTrendData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  }
  return (
    <div>



<div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Monthly Leave Requests
            </h2>
            <Bar
              data={{
                labels: leaveTrendData.labels,
                datasets: [
                  {
                    label: "Leave Requests",
                    data: leaveTrendData.datasets[0].data,
                    backgroundColor: "#2196f3",
                  },
                ],
              }}
            />
          </div>
    </div>
  )
}

export default simple