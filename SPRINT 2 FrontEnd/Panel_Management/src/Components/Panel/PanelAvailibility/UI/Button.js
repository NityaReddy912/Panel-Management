const Button=(props)=>{
    return(
        <button type={props.type} onClick={props.click} className={`btn btn-primary ${props.customClass}`} style={props.styleName}>{props.children}</button>
    )
}
export default Button