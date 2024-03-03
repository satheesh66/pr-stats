"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { RiArrowGoBackFill } from "@remixicon/react";
import { Icon } from "@tremor/react";

export function HeaderComponent({ title, avatarUrl }) {
	const router = useRouter();

	function getBackToDashboard() {
		router.push(`/pr-stats/author/`);
	}
	return (
		<div className="border-b-2 flex items-center h-14 gap-x-4 px-4">
			<Icon
				onClick={getBackToDashboard}
				icon={RiArrowGoBackFill}
				variant="shadow"
				tooltip="go back"
				size="md"
				borderRadius="Roundness"
			/>
			<div className="rounded-full h-10 w-10 border-2">
				<img className="h-full w-full rounded-full" src={avatarUrl} alt="" />
			</div>
			<span className="text-gray-500">{title}</span>
		</div>
	);
}
