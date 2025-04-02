"use client"

export default function StandingCard({ driver }: { driver: IDriverStanding }) {
  return (
    <div className="flex items-center justify-between p-4 shadow-md bg-gray-100 rounded-xl">
      <div className="flex items-center gap-4">
        {/* Position Badge */}
        <span className="text-lg font-bold px-3 py-2 bg-red-600 text-white rounded-full w-10 h-10 flex justify-center items-center">
          {driver.position}
        </span>
        
        {/* Driver Info */}
        <div className="flex items-center gap-3">
          <img
            src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2025Drivers/${driver.name}`}
            alt={driver.name}
            className="h-16 w-16 rounded-full border-2 border-gray-300 shadow-sm"
          />
          <div >
            <h2 className="text-lg font-semibold">{driver.name}</h2>
            <p className="text-gray-500 text-sm">
              {driver.nationality} - <span className="font-medium">{driver.team}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Points Display */}
      <span className="text-xl font-bold text-gray-700 whitespace-nowrap">{driver.points} <span className="text-sm font-normal">pt</span></span>
    </div>
  )
}
