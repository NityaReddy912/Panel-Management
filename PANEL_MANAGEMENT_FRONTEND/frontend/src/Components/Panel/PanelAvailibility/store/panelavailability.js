import { createSlice } from '@reduxjs/toolkit'
const initialState = {  sendRequest: false, page: 1,totalPages:0, dataList: [], selectedFromDate:new Date().toISOString().split('T')[0], selectedToDate:'', selectedPanelId:"", selectedPanelName:"", selectedEmail:"", availability:"", role:"", interviewType:"", notSubmit:false, notValidate:false, roledropdownList:[], inttypedropdownList:[], availstatdropdownList:[] }

const panavailSlice = createSlice({
    name: 'panavailform',
    initialState: initialState,
    reducers: {
        changeFromDate(state, action) {
            state.selectedFromDate=action.payload
        },
        changeToDate(state, action) {
            state.selectedToDate=action.payload
        },
        changePanelId(state, action){
            state.selectedPanelId=action.payload;
        },
        changePanelName(state, action){
            state.selectedPanelName=action.payload;
        },
        changeEmail(state, action){
            state.selectedEmail=action.payload;
        },
        changeAvailability(state, action){
            state.availability=action.payload;
        },
        changeRole(state, action){
            state.role=action.payload;
        },
        changeInterviewType(state, action){
            state.interviewType=action.payload;
        },
        changeNotSubmit(state, action){
            state.notSubmit=action.payload;
        },
        changeNotValidate(state, action){
            state.notValidate=action.payload;
        },
        getRoleDropdown(state, action){
            state.roledropdownList=action.payload;
        },
        getIntTypeDropdown(state, action){
            state.inttypedropdownList=action.payload;
        },
        getAvailStatDropdown(state, action){
            state.availstatdropdownList=action.payload;
        },
        sendRequestt(state){
            state.sendRequest=!state.sendRequest
        },
        finalData(state, action){
            state.dataList=action.payload
        },
        setTotalPages(state, action){
            state.totalPages=action.payload
        },
        changePage(state, action) {
            state.page=action.payload
        },
        changestatus(state,action){

            state.dataList[action.payload.index].is_active=action.payload.value

        },
        changeavailstatus(state,action){

            state.dataList[action.payload.index].availability_status

            =action.payload.value

        }
    }
})


export const panavailActions = panavailSlice.actions;
export default panavailSlice.reducer;