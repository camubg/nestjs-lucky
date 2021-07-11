import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class CustomValidationPipe implements PipeTransform {
    
    async transform(value: any, metaData: ArgumentMetadata){

        if(this.isEmpty(value)) {
            throw new BadRequestException(`Validation failed: No payload provided`);
         }
 
        const object = plainToClass(metaData.metatype, value);
 
        const errors = await validate(object);
 
        if (errors.length > 0) {
             throw new BadRequestException(`Validation failed: ${this.formatErrors(errors)}`);
          }
       return value;
    }

    private isEmpty(value:any) {
        if(Object.keys(value).length < 1) {
             return true
          }
        return false
     }

     private formatErrors(errors: any[]){
        return errors.map( error => {
           for (let key in error.constraints) {
               return error.constraints[key]
            }
       }).join(', ');
     }
}
