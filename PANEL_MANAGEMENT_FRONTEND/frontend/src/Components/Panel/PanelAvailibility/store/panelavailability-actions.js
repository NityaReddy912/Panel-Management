import { panavailActions } from "./panelavailability"

export const fetchFormData=(selectedFromDate, selectedToDate, selectedPanelId, selectedPanelName, selectedEmail, availability, role, interviewType, page)=>{
  console.log('hi '+selectedFromDate)

    return async(dispatch)=>{
        const getDataList = async () => {
          
            
                const dataListResponse = await fetch(
                  `http://localhost:8000/panelavail?fromDate=${selectedFromDate}&toDate=${selectedToDate}&panelId=${selectedPanelId}&panelName=${selectedPanelName}&email=${selectedEmail}&availabilityStatus=${availability}&role=${role}&interviewType=${interviewType}&page=${page}`
                );

                if (dataListResponse.status === 500) {
                    throw new Error('could not fetch cart data!');
                 }
                 console.log('data fetched')
                const panelListData =
                  await dataListResponse.json();
                  console.log(panelListData)
                  return panelListData
          };
      
        try{
           const panelData=await getDataList();
            dispatch(panavailActions.finalData(panelData.data))
            dispatch(panavailActions.changePage(1));
            dispatch(panavailActions.setTotalPages(panelData.totalItems));
        }catch(e){
            console.log(e);  
        }
    }
}

export const fetchRoleDropdowmItems=()=>{
  

  return async(dispatch)=>{
    const getDataList = async () => {

    
          const dataListResponse = await fetch(
            `http://localhost:8000/panelavail/getrolesdrop`
          );

          
            if (dataListResponse.status === 500) {
               throw new Error('could not fetch cart data!');
            }
            const panelListData =
            await dataListResponse.json();
            return panelListData   
    }
    
      try{
         const panelListData=await getDataList();
         dispatch(panavailActions.getRoleDropdown(panelListData.data));
      }catch(e){
          console.log(e);  
      }
  }
}

export const fetchIntTypeDropdowmItems=()=>{
  

  return async(dispatch)=>{
    const getDataList = async () => {

    
          const dataListResponse = await fetch(
            `http://localhost:8000/panelavail/getinttypedrop`
          );

          
            if (dataListResponse.status === 500) {
               throw new Error('could not fetch cart data!');
            }
            const panelListData =
            await dataListResponse.json();
            return panelListData   
    }
    
      try{
         const panelListData=await getDataList();
         dispatch(panavailActions.getIntTypeDropdown(panelListData.data));
      }catch(e){
          console.log(e);  
      }
  }
}

export const fetchAvailStatDropdowmItems=()=>{
  

  return async(dispatch)=>{
    const getDataList = async () => {

    
          const dataListResponse = await fetch(
            `http://localhost:8000/panelavail/getavailstatdrop`
          );

          
            if (dataListResponse.status === 500) {
               throw new Error('could not fetch cart data!');
            }
            const panelListData =
            await dataListResponse.json();
            return panelListData   
    }
    
      try{
         const panelListData=await getDataList();
         dispatch(panavailActions.getAvailStatDropdown(panelListData.data));
      }catch(e){
          console.log(e);  
      }
  }
}