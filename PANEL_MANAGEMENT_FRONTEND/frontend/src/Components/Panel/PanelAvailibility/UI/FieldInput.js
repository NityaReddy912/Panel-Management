function FieldInput(props){

  const handleFieldInput=(e)=>{
    props.fieldInput(e.target.value)
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
                <input onChange={handleFieldInput} value= {props.value}
                className="form-control" type="text" placeholder={props.placeholder} required />
                </div>

</>
)
}

export default FieldInput;