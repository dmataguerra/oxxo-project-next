import {Card, CardHeader, CardBody, Divider} from "@nextui-org/react"
import {Product} from "@/entities"

type ProductWithoutProvider = Omit<Product, 'provider'>; 

export default function ProductCard ({product} : {product : ProductWithoutProvider}) {
    return (
        <Card className="w-full max-w-xs shadow-md hover:shadow-lg hover:scale-105 transition-all">
            <CardHeader className="px-4 py-3">
                <div className="text-sm font-medium">{product.productName}</div>
            </CardHeader>
            <Divider />
            <CardBody className="px-4 py-3 text-sm">
                <p className="text-xs">Nombre del producto: <span className="font-bold">{product.productName}</span></p>
                <p className="mt-2 text-xs">Precio del producto: <span className="font-bold">{product.price}</span></p>
            </CardBody>
        </Card>
    )
}