import { HttpStatus } from '@nestjs/common';
export class ResponseDataVm {
    data: any
    static convertToVm( data:any){
        const response = {
            statusCode: HttpStatus.OK,
            message: "OK",
            data: data
        }
        return response
    }
}