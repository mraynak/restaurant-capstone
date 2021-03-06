import React, {useState} from "react"
import { finishReservation } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert"
import image_table from "../images/image_table.jpeg"
import image_table_bar from "../images/image_table_bar.jpeg"

function Tables({tables, loadDashboard}) {

    //sets error state varibale
    const [error, setError] = useState(null)

    //button click handler for finishing a reservation
    async function completeRes(event) {
        event.preventDefault()
        const abortController = new AbortController()

        //confrimation window
        if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
            await finishReservation(event.target.id, abortController.signal)
            .catch(setError)

            loadDashboard()
        }
    }
    const list = tables.map((table) => {
        const table_id = table.table_id
        return (
            <div className="card m-2 p-3" style={{"width": "18rem"}} key={table_id}>
                <img className="card-img-top" src={!table.table_name.toLowerCase().includes("bar") ? image_table : image_table_bar} alt="Not responsive"/>
                <div className="card-body">
                    <h5 className="card-title">Table Name: {table.table_name}</h5>
                    <p className="card-subtitle">Capacity: {table.capacity}</p>
                    {table.reservation_id && <p className='card-subtitle mt-1'>Reservation ID: {table.reservation_id}</p>}
                    <p data-table-id-status={table.table_id} className="mt-1 card-subtitle">Availability: <span className={table.reservation_id ? "text-danger" : "text-success"}>{table.reservation_id ? "occupied" : "free" }</span></p>
                </div>
                <button id={table.table_id} className="btn btn-primary m-3" data-table-id-finish={table.table_id} onClick={completeRes}>Finish</button>
            </div>
        )
    })
    return (

        <>
            <div>
                <ErrorAlert error={error} />
            </div>
            {list}
        </>
    )
}

export default Tables