import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    validate(payload: any){
        console.log("Inside JWT Strategy Validate")
        console.log(payload);
        return payload;
    }
}