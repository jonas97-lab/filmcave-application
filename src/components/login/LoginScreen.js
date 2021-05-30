import React, { useRef } from 'react';
import 'components/login/LoginScreen.css';
import { auth } from '../../firebase';

function LoginScreen() {
	const register = (e) => {
		e.preventDefault();

		auth
			.createUserWithEmailAndPassword(
				emailRef.current.value,
				passwordRef.current.value
			)
			.then((authUser) => {
				console.log(authUser);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const signIn = (e) => {
		e.preventDefault();

		auth
			.signInWithEmailAndPassword(
				emailRef.current.value,
				passwordRef.current.value
			)
			.then((authUser) => {
				console.log(authUser);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	return (
		<form className='form'>
			<div className='form__background'>
				<div className='form__wrapper'>
					<div className='form__content'>
						<h3 className='form__title'>
							Log in to your <br />
							<span className='span'>FilmCave</span> account
						</h3>
						<input
							className='form__input--email'
							ref={emailRef}
							placeholder='Email address'
							type='email'
						/>
						<input
							className='form__input--password'
							ref={passwordRef}
							placeholder='Password'
							type='password'
						/>
						<p className='form__tagline'>
							New to FilmCave? <span onClick={register}>Sign Up now!</span>
						</p>
						<div className='form__buttons'>
							<button className='form__button' onClick={signIn}>
								Log In
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

export default LoginScreen;
