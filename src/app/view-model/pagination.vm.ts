import { IsNumber } from "class-validator"

export class PaginationInterface {
    page: number
    limit: number
    totalItems: number
}
export class PaginationData {
    @IsNumber()
    page: number

    @IsNumber()
    limit: number

    @IsNumber()
    totalPages: number

    @IsNumber()
    totalItems: number

    static convertToData(pagination: PaginationInterface): PaginationData {
        const result : PaginationData = {
            page: pagination.page,
            limit: pagination.limit,
            totalPages: Math.ceil(pagination.totalItems / (pagination.limit || 1)),
            totalItems: pagination.totalItems,
        }
        return result
    }
}

export class PaginationVm {
    data: any
    paginationData: PaginationData
    static convertToVm( data:any, paginationItem: PaginationInterface ){
        const response = {
            data: data,
            paginationData: PaginationData.convertToData(paginationItem)
        }
        return response
    }
}