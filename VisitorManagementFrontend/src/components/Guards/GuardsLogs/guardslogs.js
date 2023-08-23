import React, { useEffect, useState } from "react";
import { GetguardmasterLogout, InsertGuardLogin } from '../../../api/index';
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
      background: 'rgb(237, 237, 237)	',
      borderBottom: "1px solid silver",
    },
  },
};

const GuardsLogs = () => {
  const [data, setData] = useState([]);
  const [sno, setSno] = useState()

  const columns = [
    {
      name: "Location",
      selector: "Location",
      sortable: true,
      cell: (row) => [
        <p id={`location${row.ID}`} >{row.locationname}, {row.Location}</p>
      ]
    },
    {
      name: "Guard Name",
      selector: "Guardname",
      sortable: true,
      cell: (row) => [
        <p id={`guardname${row.ID}`} >{row.Guardname}</p>
      ]
    },
    {
      name: "Guard ID",
      selector: "Guardid",
      sortable: true,
      cell: (row) => [
        <div className='droplist'>
          <p style={{ width: "100%" }} id={`guardId${row.ID}`} >{row.Guardid}</p>
        </div>
      ]
    },

    {
      name: "Login Date",
      sortable: false,
      selector: "null",
      cell: (row) => [
        <div className='droplist'>
          <input style={{ width: "100%", background: "rgb(176, 176, 176)", borderRadius: "2px", border: "none" }} id={`date${row.ID}`} type="date" />
        </div>
      ]
    },
    {
      name: "Login Time",
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
      selector: "Guard_status",
      sortable: true,

    },
    {
      name: "Action",
      sortable: false,
      selector: "null",
      cell: (row) => [<button id={`submitBtn${row.ID}`} className="editbtn btn btn-secondary" style={{ boxSize: "", boxShadow: "1px 1px 1px 1px #252525", border: "none", fontSize: "13px" }} onClick={handleClick}>Login</button>
      ]
    }
  ];

  const handleClick = async (e) => {
    document.getElementById(`submitBtn${sno}`).disabled = true

    const date = document.getElementById(`date${sno}`).value
    const time = document.getElementById(`time${sno}`).value
    const status = 'Login'
    const locationname = document.getElementById(`location${sno}`).innerHTML
    var [locationName, locationId] = locationname.split(", ")
    const Guardname = document.getElementById(`guardname${sno}`).innerHTML
    const guardid = document.getElementById(`guardId${sno}`).innerHTML

    const InsertGuardLogs = await InsertGuardLogin(locationId, Guardname, date, time, status, guardid, localStorage.getItem('userId'), locationName)
    if (InsertGuardLogs) {
      alert("Guard Login")
      window.location.reload();
    } else {
      alert('Something went Wrong')
    }

  }



  useEffect(() => {
    const totalposts = async () => {
      const warehouse_id = localStorage.getItem('warehouseId')
      const result = await GetguardmasterLogout(warehouse_id)
      setData(result)

      setTimeout(() => {
        for (var i = 0; i <= result.length - 1; i++) {
          var myDate = new Date();
          var day = myDate.getDate();
          var month = myDate.getMonth() + 1;
          var year = myDate.getFullYear();
          if (month < 10) month = "0" + month;
          if (day < 10) day = "0" + day;
          document.getElementById(`date${result[i].ID}`).value = year + "-" + month + "-" + day;
        }
      }, 1000)
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
        <div className="container mt-5 ">
          <div className="d-flex justify-content-between h-25">
            <h2 className="text-dark mt-5">Guards Login</h2>
          </div>
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

export default GuardsLogs