import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy){
    
}