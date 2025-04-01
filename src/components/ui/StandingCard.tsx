"use client"

export default function StandingCard({ driver }: { driver: IDriverStanding }) {
  return (
    <div className="bg-white shadow-sm rounded-sm p-4 mb-4 w-full flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-lg font-bold mr-4 rounded-full border-2 w-8 h-8 flex justify-center items-center text-sm">{driver.position}</span>
        <div>
          <h2 className="text-xl font-semibold">{driver.name}</h2>
          <p className="text-gray-500 text-sm">{driver.nationality} - {driver.team}</p>
        </div>
      </div>
      <span className="text-lg font-bold">{driver.points} pts</span>
    </div>
  )
}
