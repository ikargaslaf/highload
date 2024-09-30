import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    userId: string

    @ApiProperty()
    @IsNumber()
    amount: number
}
