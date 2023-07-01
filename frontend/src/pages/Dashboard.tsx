import React, { useEffect } from "react"
import Fetcher from "../utils/fetcher"
import { SESSION_ROUTE } from "../utils/endpoint"

const Dashboard: React.FC = () => {
	useEffect(() => {
		Fetcher.get(SESSION_ROUTE).withLocalStorageToken()
			.fetchResult()
			.then((data: any) => {
				console.log(data)
			})
	}, [])

	return (
		<div className="w-full flex flex-col items-center">
			Hello world
		</div>
	)
}

export default Dashboard
