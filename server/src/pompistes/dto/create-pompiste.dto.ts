import { IsOptional } from "class-validator";

export class CreatePompisteDto {
 
  readonly username: string;
  readonly matriculeRH: string;
  readonly CIN:string;
  readonly password: string;
  readonly phone?: string;
  



  @IsOptional()
  readonly image?: File;

  @IsOptional()
  readonly email: string;


}
  