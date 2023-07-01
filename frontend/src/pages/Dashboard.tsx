import React, { useEffect, useState } from "react"
import Fetcher from "../utils/fetcher"
import { SESSION_ROUTE } from "../utils/endpoint"
import TravelSessionCard from "../components/TravelSessionCard"

const useTravelSession = () => {
	const [session, setSessions]: any = useState([])

	const addSession = (session_meta: any) => {
		setSessions([session_meta, ...session])
	}

	const loadSession = (all: any) => {
		setSessions(all)
	}

	return [session, addSession, loadSession]
}

const Dashboard: React.FC = () => {
	const [session, addSession, loadSession] = useTravelSession()

	useEffect(() => {
		Fetcher.get(SESSION_ROUTE).withLocalStorageToken()
			.fetchResult()
			.then((data: any) => {
				loadSession(data.allSessions)
				console.log(data.allSessions)
			})
	}, [])

	return (
		<div className="w-full flex justify-center">
			<div className="w-[80%] max-w-[1000px] flex flex-col">
				<h1 className="text-3xl">Travelling Sessions</h1>
				<hr className="h-0 border border-slate-300" />

				<div className="w-full grid gap-4 mt-8">
					{session.map((x: any) => {
						return <TravelSessionCard key={x.id} session_meta={x} />
					})}
				</div>
			</div>
		</div>
	)
}

export default Dashboard
