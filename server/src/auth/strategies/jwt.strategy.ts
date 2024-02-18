import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey: "pozihfkdsfjkc",
        });
    }

    validate(payload: any){
        // console.log("Inside JWT Strategy Validate")
        // console.log(payload._doc);
        return payload._doc; // // bach ireje3 ghir les infos dyl l'user bla les metadata lakhrin
    }
}