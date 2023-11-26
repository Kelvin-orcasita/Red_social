import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../firebase/google/register.js";
import { Dropdowns } from './Dropdowns';
import { SearchHome } from "./SearchHome.jsx";

export function Navbar() {
	const [hiddenBurger, setHiddenBurger] = useState('hidden')
	let location = useLocation();
	let navigate = useNavigate();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

	useEffect(() => {
		setHiddenBurger('hidden')
	}, []);

	function handleCloseBurger() {
		if (hiddenBurger == 'hidden') {
			setHiddenBurger('hidden-none')
		}
		if (hiddenBurger == 'hidden-none') {
			setHiddenBurger('hidden')
		}
	}

	const handleLogout = () => {
		const auth = getAuth();
		signOut(auth).then(() => {
			navigate('/')
			localStorage.removeItem('user')
			window.location.reload(true);
		}).catch((error) => {
			console.log(error);
		});
	}

	return (
		<>
			<nav className="relative px-4 py-6 flex justify-between items-center bg-slate-950">
				<Link className="text-3xl font-bold leading-none text-white" to='/'>Logo</Link>
				
				<div className="lg:hidden">
					<a onClick={handleCloseBurger} className="navbar-burger flex items-center text-blue-600 p-3">
						<svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<title>Mobile menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
						</svg>
					</a>

				</div>

				
				<ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
					
					{
						user!== null?
							<>
								
							{
								location.pathname!=='/createpost' &&
								<Link className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" to='/createpost'>Create Post</Link>
							}
						
								<li><Link className={`text-sm font-semibol ${location.pathname=='/favorities' ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600 rounded`} to='/favorities'>Favorities</Link></li>
								<li className="text-gray-300">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
									</svg>
								</li>
								<li><Link className={`text-sm font-semibol ${location.pathname=='/' ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600 rounded`} to='/'>Home</Link></li>
								<li className="text-gray-300">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
									</svg>
								</li>
								<li><Link className={`text-sm font-semibol ${location.pathname=='/account' ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600 rounded`} to='/account'>Account</Link></li>
								<li className="text-gray-300"></li>

								
							</>
							:
							<></>
					}


				</ul>

				{
					user==null &&
					<div>
						<Link className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" to='/login'>Sign In</Link>
						<Link className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" to='/register'>Sign up</Link>
					</div>
						
				}
				{
					user!==undefined && user!==null &&
					<Dropdowns />
				}
			</nav>
				

			{/* menu burger	 */}
			<div className={`navbar-menu relative z-50 lg:hidden ${hiddenBurger}`}>
				<div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
				<nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
					<div className="flex items-center mb-8">
						<Link className="mr-auto text-3xl font-bold leading-none" to='/'>
							Logo
						</Link>
						<a onClick={handleCloseBurger} className="navbar-close">
							<svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
							</svg>
						</a>
					</div>
					<div>
						<ul>
							{
								user!== null ?
									<>
									{
										location.pathname!=='/createpost' &&
									<li className="mb-1">
										<Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to='/createpost'>Create Post</Link>
										<hr />
									</li>
									}
									<li className="mb-1">
										<Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to='/favorities'> Favorities</Link>
									</li>
									<li className="mb-1">
										<Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to='/'>Home</Link>
									</li>

										<li className="mb-1">
											<Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to='/account'>Account</Link>
										</li>
									
									</>
									:
									<></>
							}
						</ul>
					</div>
					<div className="mt-auto">
						<div className="pt-6">

							{
								user==null ?
									<div className="flex justify-center items-center gap-10">
										<Link className="lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6  bg-blue-100 hover:bg-blue-600 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" to='/login'>Sign In</Link>
										<Link className="lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" to='/register'>Sign up</Link>
									</div>
									:
									<div>
										{
											user !== null ?
												<div className="flex items-center gap-3">
													<Link to='/account'>
														<img className="w-10 h-10 rounded-full" src={user.photoURL == null ? '/public/icons/perfilBlack.png' : user.photoURL} />
													</Link>
													{
														user.displayName !== null ?
															<label htmlFor="imgProfile" className="text-sm leading-5">{user.displayName}</label>
															:
															<p className="text-sm leading-5">User{user.metadata.createdAt}</p>
													}

												</div>
												:
												<div>
													<img className="w-10 h-10 rounded-full" src={user.photoURL == null ? '/public/icons/perfilBlack.png' : user.photoURL} />
												</div>
										}

										<div className="flex justify-center mt-6 ">
											<button onClick={() => { handleLogout() }} className=" lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">logOut</button>
										</div>
									</div>
							}
						</div>
					</div>
				</nav>
			</div>
		</>
	)
}