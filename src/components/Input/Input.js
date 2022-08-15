import { ErrorMessage } from 'formik';
import s from './Input.module.scss';

const Msg = ({ children }) => <p className={s.errorMsg}>{children}</p>;

function Input({ label, id, name, type = 'text', ...rest }) {
	return (
		<div className={s.formGroup}>
			{label && <label htmlFor={id || name}>{label}</label>}

			{type === 'textarea' ? (
				<textarea id={id || name} name={name} {...rest}></textarea>
			) : (
				<input type={type} id={id || name} name={name} {...rest} />
			)}

			<ErrorMessage component={Msg} name={name} />
		</div>
	);
}

export default Input;