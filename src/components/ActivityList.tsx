import { useMemo, Dispatch} from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activity-reducer"


type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({activities, dispatch} : ActivityListProps) {

    const categoryName = useMemo(()=>
    (category: Activity["category"])=>categories.map(cat => cat.id === category ? cat.name : ""),[activities])

    const isEmptyActivities = useMemo(()=> activities.length === 0 ,[activities])

  return (
    <>
      <h2 className=" text-4xl font-bold text-slate-600 text-center">Comida Y Actividades</h2>
      {isEmptyActivities ? <p className=" text-center my-5">No hay actividades</p> :
      activities.map(acivity => (
        <div key={acivity.id} className=" px-5 py-10 bg-white flex justify-between shadow ">
            <div className=" space-y-2 relative">
                <p className={` absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${acivity.category === 1 ? "bg-sky-500" : "bg-orange-500"}`}>
                    {categoryName(acivity.category)}
                </p>
                <p className=" text-2xl font-bold pt-5">
                    {acivity.name}
                </p>
                <p className={`font-black text-4xl ${acivity.category === 1 ? " text-sky-500" : "text-orange-500"} `}>
                    {acivity.calories}{""} <span>Calorias</span>
                </p>
            </div>
            <div className=" flex gap-5 items-center">
              <button
              onClick={()=>dispatch({type: "save-activeId", payload:{id:acivity.id}})}>
                <PencilSquareIcon className=" h-8 w-8 text-gray-800"/>
              </button>
              <button
              onClick={()=>dispatch({type: "delete-activity", payload:{id:acivity.id}})}>
                <XCircleIcon className=" h-8 w-8 text-red-500"/>
              </button>
            </div>
        </div>
      ))}
    </>
  )
}