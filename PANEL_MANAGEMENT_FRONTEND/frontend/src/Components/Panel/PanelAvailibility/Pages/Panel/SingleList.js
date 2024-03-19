import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Pencil } from 'react-bootstrap-icons';

import {useDispatch} from 'react-redux'

import {panavailActions} from '../../store/panelavailability'

import {PencilIcon} from '@heroicons/react/24/solid';




function SingleList({ hash, role, index, arr }) {

  const [id, setId] = useState();

  const [check, setCheck] = useState(role?.is_active);

  const [statuss, setStatuss]= useState(role?.availability_status);

  const userData = JSON.parse(window.sessionStorage.getItem('user_data'));

 

  const dispatch = useDispatch()

  useEffect(() => {

    setId(role.panel_availability_id)

    dispatch(panavailActions.changestatus({index:index, value:check}))
    
    setStatuss(role.availability_status)

  }, [role, check]);



 /*  useEffect(()=>{

    if(check){



        setStatuss('PanelWithdrawn')

         // console.log('if entered')

      }else{

          //console.log('else entered')

        setStatuss('Available')

    }


  },[check])  */



  const handleUpdateToggle = async (e) => {

    try {

      const responseToggle = await fetch(

        `http://localhost:8000/panelavail/${id}`,

        {

          method: "PUT",

          headers: {

            "Content-Type": "application/json",

          },

          body:JSON.stringify({ isActive: role.is_active })

        },

      );



      if (responseToggle.status === 200) {

        setCheck(!check);

        const toggle = await responseToggle.json();
        

        //console.log(toggle);

       // console.log(arr[index])

       /*  arr[index].is_active=true

       

        console.log(arr[index]) */

      }



      if (responseToggle.status === 500) {

        alert("Errr");

      }
      

          if(check){



          setStatuss('PanelWithdrawn')
          dispatch(panavailActions.changeavailstatus({index:index, value:'PanelWithdrawn'}))
           // console.log('if entered')

        }else{

            //console.log('else entered')

          setStatuss('Available')
          dispatch(panavailActions.changeavailstatus({index:index, value:'Available'}))
      }



     

    } catch (err) {

      console.error(err);

    }

  };



 // console.log(update);

  return (

    <tr className={!check ? "table-inactive" : ""}>

      <th scope='row'>{hash}</th>

      <td>{role.user_id}</td>

      <td>{role.name}</td>

      <td>{role.email}</td>

      <td>{role.contact}</td>

      <td>{role.role_name}</td>

      <td>{role.type}</td>

      <td>{role.available_date.split('T')[0]}</td>

      <td>{role.start_time} - {role.end_time}</td>

      <td>{statuss}</td>



      <td>

      {userData.role_id === 1003 ? "" : (check && <Link to={ `/UpdatePanel/${role.user_id}/${role.name}/${role.available_date.split("T")[0]}/${role.grade}/${role.
start_time}/${role.end_time}/${statuss}`}>
       <PencilIcon className="singleList__pencilIcon"  />
      </Link>)}
     

        {userData.role_id === 1003 ? "" : <span className='bar' style={{marginLeft:"10px"}}>|</span>}

        <span

          className='form-check form-switch form-switch-md'

          style={{ display: "inline-block",marginLeft:"10px" }}>

          <input

            data-testid='search-check'

            className='form-check-input'

            type='checkbox'

            id='flexSwitchCheckDefault'

            onChange={handleUpdateToggle}

            value={check}

            checked={check}

          />

        </span>

      </td>

    </tr>

  );

}



export default SingleList;