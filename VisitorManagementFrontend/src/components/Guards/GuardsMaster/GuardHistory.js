import React, { useEffect, useState } from "react";
import { TotalGuardsHistory } from '../../../api/index';
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Home from '../../Home'
import { DatePicker } from "antd";
import Moment from "moment";
import "antd/dist/antd.min.css";
const { RangePicker } = DatePicker;

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
      background:'rgb(15, 15, 36)',
      color:'white',
    },
  },
  cells: {
    style: {
      fontSize: '15px',
      background:'rgb(237, 237, 237)	',
      borderBottom:"1px solid silver",
    },
  },
};

const GuardsHistory = () => {
  const [data, setData] = useState([]);
  const [toogle,setToggle]=useState(true)

  const columns = [
    {
      name: "Location",
        selector: "locationname",
      sortable: true
    },
    {
      name: "Guard Name",
      selector: "guardname",
      sortable: true,
  
    },
    {
      name: "Login Date",
      selector: "LoginDate",
      sortable: true,
  
    },
    {
      name: "Login Time",
      selector: "timeLogin",
      sortable: true,
 
    },

    {
      name: "LogOut Date",
      sortable: false,
      selector: "LogOutDate",
   
    },
    {
      name: "LogOut Time",
      sortable: false,
      selector: "timeLoginout",
    
    },
    {
      name: "Status",
      selector: "Status",
      sortable: true,
  
    },
    {
      name: "Shift",
      selector: "Shift",
      sortable: true,
    }
  ];

  
  useEffect(() => {
    const totalposts = async () => {
      var myDate = new Date();
      var day = myDate.getDate();
      var month = myDate.getMonth() + 1;
      var year = myDate.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
    //   var startDate = year + "-" + month + "-" + "01";
      var endDate = year + "-" + month + "-" + day;
      const result = await TotalGuardsHistory(endDate,endDate)
      setData(result)
    }
    totalposts()
  }, [])

  const setfun = async(e) => {

    console.log(Moment(e[0]).format("YYYY-MM-DD"))
    const val1 = Moment(e[0]).format("YYYY-MM-DD");
    const val2 = Moment(e[1]).format("YYYY-MM-DD");
    // const arry = [val1, val2];
    setToggle(false)

    const response = await TotalGuardsHistory(val1,val2)
    setData(response)
    // if(response){
    //   setLoading(false);
    // }

  }

  const tableData = {
    columns, data
  };

  return (
    <>
      {/* <NavPage /> */}
      <div className="Total_Glogs">
      <Home />

        <div className="container mt-5 p-2" >
          <div className="d-flex justify-content-between mt-5">
          <h2 className="text-dark ">Guards History</h2>
          {
          toogle?<h3 >Today</h3>:null

        }
          <RangePicker
          onChange={setfun} 
          />

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

export default GuardsHistory