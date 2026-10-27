import styles from './Input.module.css'

function Input({type, text, name, placeholder, handleOnChange, value, required, min, step, pattern, title}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder}
                required={required}
                min={min}
                step={step} 
                pattern={pattern}
                title={title}
                onChange={handleOnChange} 
                value={value}
            />
        </div>
    )
}

export default Input