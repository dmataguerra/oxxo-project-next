'use client';
import { Manager, Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
interface SelectManagerProps {
    managers : Manager[],
    locations: Location[],
    defaultManager? : string,
}
export default function SelectManager({ managers, locations , defaultManager = undefined} : SelectManagerProps) {
    const disabledKeys = locations
        .map((location: Location) => {
            if (location.manager?.managerId !== defaultManager) return location.manager?.managerId?.toString();
            return undefined;
        })
        .filter((managerId) => managerId !== undefined) as string[];

    return (
        <Select defaultSelectedKeys={defaultManager !== undefined ? [defaultManager] : []} name="manager" label="Manager" disabledKeys={disabledKeys}>
            {
                managers.map((manager: Manager) => {
                    return (
                        <SelectItem key={manager.managerId.toString()}>
                            {manager.managerFullName}
                        </SelectItem>
                    )
                })
            }
        </Select>
    )
}