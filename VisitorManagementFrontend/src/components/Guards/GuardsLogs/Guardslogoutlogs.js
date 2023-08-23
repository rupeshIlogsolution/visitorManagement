import React, { useEffect, useState } from "react";
import { GetguardmasterLogin, UpdateGuard } from '../../../api/index';
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Home from '../../Home'


const customStyles = {
  title: {
    style: {
      fontColor: 'red',
      fontWeight: '900',
    }
  },
  rows: {
    style: {
      minHeight: '35px'
    }
  },
  headCells: {
    style: {
      fontSize: '15px',
      fontWeight: '500',
      background: 'rgb(15, 15, 36)',
      color: 'white',
    },
  },
  cells: {
    style: {
      fontSize: '15px',
      background: 'rgb(237, 237, 237)',
      borderBottom: "1px solid silver",
    },
  },
};


const GuardsLogOut = () => {
  const [data, setData] = useState([]);
  const [sno, setSno] = useState()

  const columns = [
    {
      name: "Location",
      sortable: true,
      cell: (row) => [
        <p id={`location${row.ID}`} >{row.locationname} {row.whid} </p>
      ]
    },
    {
      name: "Guard Name",
      selector: "Guardname",
      sortable: true,
      cell: (row) => [
        <p id={`guardname${row.ID}`} >{row.guardname}</p>
      ]
    },
    {
      name: "Guard ID",
      selector: "Guardid",
      sortable: true,
      cell: (row) => [
        <p id={`guardId${row.ID}`} >{row.Guardid}</p>
      ]
    },
    {
      name: "Logout Date",
      sortable: false,
      selector: "null",
      cell: (row) => [
        <div className='droplist'>
          <input style={{ width: "100%", background: "rgb(176, 176, 176)", borderRadius: "2px", border: "none" }} id={`date${row.ID}`} type="date" />
        </div>
      ]
    },
    {
      name: "Logout Time",
      sortable: false,
      selector: "null",
      cell: (row) => [
        <div className='droplist'>
          <input style={{ width: "100%", background: "rgb(176, 176, 176)", borderRadius: "2px", border: "none" }} type="time" id={`time${row.ID}`} onChange={() => setSno(row.ID)} />
        </div>
      ]
    },
    {
      name: "Status",
      selector: "Status",
      sortable: true,
      // cell: (row) => [
      //   <p id={`guardname${row.ID}`} >{row.Guardname}</p>
      // ]
    },

    // {
    //   name: 'Status',
    //   sortable: true,
    //   selector: 'null',
    //   cell: (row) => [
    //     <div className='droplist'>
    //       <select id={`status${row.ID}`} onChange={async (e) => {
    //         const status = e.target.value;
    //       //   window.location.href = 'TotalGuards'
    //       // alert(row.ID)
    //       }
    //       }>
    //         <option value={row.Status} hidden> {row.Status}</option>
    //         <option value='Login'>Login</option>
    //         <option value='Logout' >Logout</option>
    //       </select>
    //     </div>
    //   ]
    // },

    {
      name: "Action",
      sortable: false,
      selector: "null",
      cell: (row) => [<button className="editbtn btn btn-secondary" onClick={handleClick}>Logout</button>]
    }
  ];

  const handleClick = async (e) => {
    const date = document.getElementById(`date${sno}`).value
    const time = document.getElementById(`time${sno}`).value
    const status = 'Logout'
    const locationname = document.getElementById(`location${sno}`).innerHTML
    var [locationName, locationId] = locationname.split(" ")
    const Guardname = document.getElementById(`guardname${sno}`).innerHTML
    const guardid = document.getElementById(`guardId${sno}`).innerHTML

    const InsertGuardLogs = await UpdateGuard(locationId, Guardname, date, time, status, guardid, localStorage.getItem('inputPassword'), locationName)
    if (InsertGuardLogs) {
      alert("Guard Logout")
      window.location.reload();
    } else {
      alert('Invalid Entry')
    }
  }



  useEffect(() => {
    const totalposts = async () => {
      const warehouse_id = localStorage.getItem('warehouseId')
      const result = await GetguardmasterLogin(warehouse_id)

      setData(result)
      for (var i = 0; i <= result.length - 1; i++) {
        document.getElementById(`date${result[i].ID}`).value = result[i].date
      }
    };
    totalposts()
  }, [])


  const tableData = {
    columns, data
  };

  return (
    <>
      <div className="Total_Glogs">
        <Home />
        <div className="container mt-5 pt-3">
          <h2 className="mt-5 d-flex ">Guards Logout</h2>
          <div className="DataTable">
            <DataTableExtensions {...tableData} >
              <Datatable
                columns={columns}
                data={data}
                pagination
                customStyles={customStyles}
              />
            </DataTableExtensions>
          </div>
        </div>
        <br />
      </div>
    </>
  )
}

export default GuardsLogOut