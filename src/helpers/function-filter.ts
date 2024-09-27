import { FilterOperetorEnum, OperetorEnum } from "src/app/enum/operetor.enum"
import { Between, ILike, IsNull, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not } from "typeorm";


const fnSetValueCondition = async (operator: string, value: any) => {
    let lastValue = null
    if (operator === OperetorEnum.Equal) {
        lastValue = value  // =
    } else if (operator === OperetorEnum.NotEqual) {
        lastValue = Not(value)  // !=
    } else if (operator === OperetorEnum.MoreThan) {
        lastValue = MoreThan(value)   // >
    } else if (operator === OperetorEnum.LessThan) {
        lastValue = LessThan(value)   // <
    } else if (operator === OperetorEnum.MoreThanOrEqual) {
        lastValue = MoreThanOrEqual(value)   // >=   
    } else if (operator === OperetorEnum.LessThanOrEqual) {
        lastValue = LessThanOrEqual(value)   // >=   
    } else if (operator === OperetorEnum.ILike) {
        lastValue = ILike(value)   // like  
    } else if (operator === OperetorEnum.IsNull) {
        lastValue = IsNull()   // is null  
    } else if (operator === OperetorEnum.IsNotNull) {
        lastValue = Not(IsNull())   // is not null
    } else if (operator === OperetorEnum.Between) {
        lastValue = Between(value[0], value[1])   // between  
    }
    return lastValue
}

export const filterFunction = async (body: any) => {
    let conditionValue: any = {}
    const relationValue = body?.relation?.reduce((acc: object, key: string) => {
        acc[key] = true;
        return acc;
      }, {} );
    // const 
    const sortingValue = body?.sorting?.reduce((acc: object, key: any) => {
        acc[key.field] = key.pattern;
        return acc;
      }, {} );

    if (body.filterOperator == FilterOperetorEnum.And) {
        for (let i = 0; i < body.filter.length; i++) {
            const operator = body.filter[i].operator;
            const field = body.filter[i].field;
            const value = body.filter[i].value;
            const lastValue = await fnSetValueCondition(operator, value)
            // ----------------------------------------------- set value to conditionValue ---------------------------------------------- //
            if (field.includes("_")) {
                const [entity, column] = field.split("_")
                conditionValue = { ...conditionValue, [entity]: { ...conditionValue[entity], [column]: lastValue } }
            } else {
                conditionValue = { ...conditionValue, [field]: lastValue }
            }
        }
    }
    // ------------------------------------------------------------------------------------------ //
    else if (body.filterOperator == FilterOperetorEnum.Or) {
        for (let i = 0; i < body.filter.length; i++) {
            const operator = body.filter[i].operator;
            const field = body.filter[i].field;
            const value = body.filter[i].value;
            const lastValue = await fnSetValueCondition(operator, value)
            // ----------------------------------------------- set value to conditionValue ---------------------------------------------- //

            if (field.includes("_")) {
                const [entity, column] = field.split("_")
                const indexByKey = conditionValue.findIndex((item: any) => entity in item)  // เช็คว่ามีชื่อคีย์ ตรงกับ entitiy อยู่หรือไม่

                if (indexByKey !== -1) {   // มีชื่อคีย์ ตรงกับ entitiy อยู่
                    conditionValue[indexByKey][entity] = [
                        ...conditionValue[indexByKey][entity],
                        { [column]: lastValue }
                    ]
                } else {
                    conditionValue = [
                        ...conditionValue,
                        { [entity]: [{ [column]: lastValue }] }
                    ]
                }
            } else {
                conditionValue = [...conditionValue, { [field]: lastValue }]
            }
        }
    }
    return { 
                conditionValue,  
                relationValue: relationValue || {}, 
                sortingValue: sortingValue || {}}
}