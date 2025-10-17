import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Manager } from "@/entities";
import { Card , CardBody, CardHeader , Divider} from "@nextui-org/react";

export default async function CountManagersPage() {
    const response = await fetch(`${API_URL}/managers`, {
        headers: {
            ...authHeaders(),
        },
        next: {
            tags: [`dashboard:managers`]
        }
    })
    const managers: Manager[] = await response.json();
    const countNoStore = managers.filter(
        (manager: Manager) => !manager.location).length;
    
    let max = 0;
    let totalSalary = 0;
    
    managers.forEach((manager: Manager) => {
        if (manager.managerSalary > max) max = manager.managerSalary;
        totalSalary += manager.managerSalary;
    });
    
    const averageSalary = managers.length > 0 ? Math.round(totalSalary / managers.length) : 0;

    return (
        <div className="flex justify-center p-8">
            <div className="w-[50%]">
                <Card className="w-full">
                    <CardHeader className="w-full">
                        <p className="w-full"><b>Estadisticas de Managers</b></p>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <p className="w-full">Hay <b>{managers.length}</b> managers</p>
                        <p className="w-full">Hay <b>{countNoStore}</b> sin tienda</p>
                        <p className="w-full">El salario maximo es <b>${max}</b></p>
                        <p className="w-full">El salario promedio es <b>${averageSalary}</b></p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}