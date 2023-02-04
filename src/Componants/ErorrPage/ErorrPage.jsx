import React from 'react'
import { Link } from 'react-router-dom'
// import errorpage from "./ErrorPage_3.css"
import page from "./errorPage.css"


export default function ErorrPage() {
  return (
<div id="notfound">
		<div class="notfound">
			<div className="notfound-404">
				<h1 className='text-light'>4<span><i className="fas fa-ghost"></i></span>4</h1>
			</div>
			<h2>Oops! Page Not Be Found</h2>
			<p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
			<Link to='/home'>Back to homepage</Link>
		</div>
	</div>
  )
}

