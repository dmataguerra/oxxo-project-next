'use client';
import { Manager, Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
interface SelectManagerProps {
    managers : Manager[],
    locations: Location[],
    defaultManager? : string,
}
export default function SelectManager({ managers, locations , defaultManager = undefined} : SelectManagerProps) {
    const disabledKeys = locations.map((location : Location)=> {
        return location.manager?.managerId
    }).filter((managerId) => managerId !== undefined)
    return (
        <Select defaultSelectedKeys={defaultManager !== undefined ? [defaultManager] : []} name="manager" label="Manager" disabledKeys = {disabledKeys}>
            {
                managers.map((manager: Manager) => {
                    return (<SelectItem key={manager.managerId}>
                        {manager.managerFullName}
                    </SelectItem>
                    )
                })
            }
        </Select>
    )
}