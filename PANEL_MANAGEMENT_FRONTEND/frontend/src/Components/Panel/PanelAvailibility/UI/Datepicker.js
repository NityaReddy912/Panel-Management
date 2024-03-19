import './Datepicker.css'

function Datepicker(props){
  const handleDatePicker=(e)=>{
   props.dateHandler(e.target.value)
  }
        return (
            <>
            <div className={`col-md-1 ${props.bootclasslabel}`}>
              <div className="form-group">
                <label className="fw-bolder  " htmlFor={props.for}>
                  {props.label}
                </label>
              </div>
            </div>           
                
                    <div className={`col-md-4 ${props.bootclassinput}`}>
                        <input  onChange={handleDatePicker} value={props.value}
                        min= {props.min}
                        className="form-control" type="date" placeholder={props.placeholder}  required/>
                    </div>
                    
                    </>
        )
    }
     

 
export default Datepicker;
