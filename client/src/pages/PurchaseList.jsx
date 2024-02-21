import { SortableTable } from "../components/SortableTable"
import { SideTopBar } from "../components/SideTopBar"

export default function PurchaseList() {
	return (
		<>	
			<div className="h-screen z-0 flex">
				<SideTopBar />
				<div className="flex-auto p-4 shadow-md bg-gray-50">
					<SortableTable />
				</div>
			</div>
		</>
	)
}
