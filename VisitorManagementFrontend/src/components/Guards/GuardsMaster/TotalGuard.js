import React, { useEffect, useState } from "react";
// import NavPage from "../../Navbar/NavBar";
import { TotalGuard, DeactiveGuards } from '../../../api/index';
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Home from '../../Home'
import {AiFillEdit} from 'react-icons/ai'

// import Homefooter from "../../footer/footer";

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


const columns = [
  {
    name: "Location",
    selector: "locationname",
    sortable: true
  },
  {
    name: "Guard Name",
    selector: "Guardname",
    sortable: true
  },


  {
    name: "Phone no",
    selector: "Phoneno",
    sortable: true
  },
  {
    name: "Vendor Name",
    selector: "Vendorname",
    sortable: true
  },
  {
    name: "Vendor Id",
    selector: "vendorid",
    sortable: true
  },
  {
    name: "Shift",
    selector: "Shift",
    sortable: true
  },
  {
    name: 'Status',
    sortable: true,
    selector: 'null',
    cell: (row) => [
      <div className='droplist'>
        <select style={{ width: "100%", background: "rgb(86, 86, 92)", borderRadius: "2px", border: "none", color: "white" }} onChange={async (e) => {
          const status = e.target.value;
          await DeactiveGuards(row.ID, status)
          window.location.href = 'TotalGuards'
        }
        }>
          <option value={row.Status} hidden> {row.Status}</option>
          <option value='Active'>Active</option>
          <option value='Deactive' >Deactive</option>
        </select>
      </div>
    ]
  }, {
    name: "Actions",
    sortable: false,
    selector: 'null',
    cell: (row) => [
        <a title='Edit Asset' href="/EditGuard">
            <p onClick={() => sessionStorage.setItem('getGuard', `${row.ID}`)} >
                <AiFillEdit style={{ fontSize: "20px", marginBottom: "-13px" }} />
            </p></a>
    ]
}


];


const TotalGuards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const totalposts = async () => {
      const result = await TotalGuard()
      setData(result)
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
      
        <div className="container mt-5">
          <div className="d-flex justify-content-between h-25">
            <h2 className="text-dark mt-5">TotalGuards</h2>
            <div className="d-flex ">
            <button type="button" style={{ float: "right" }} onClick={() => { window.location.href = "./InsertGuard" }} class="btn btn-dark h mt-5 ">Add Guard</button>
            <button type="button" style={{ float: "right" }} onClick={() => { window.location.href = "./guardshistory" }} class="btn btn text-primary h mt-5 ml-3">Guard History</button>
            </div>
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
      {/* <Homefooter /> */}
    </>
  )
}

export default TotalGuards